import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { Teacher } from '../models/teacher';
import { TeacherEditorDialog } from '../dialogs/teacher-editor-dialog';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { DialogService } from '../services/dialog-service';
import { MatTableModule } from '@angular/material/table';

@Component({
  imports: [MatProgressSpinner, MatTableModule],
  templateUrl: './teachers.html',
})
export class Teachers implements OnInit {

  private apiConsumer = inject(ApiConsumer);
  private dialog = inject(DialogService);

  protected isLoading = signal(false);

  protected teachers = signal<Teacher[]>([])

  async ngOnInit(): Promise<void> {

    this.isLoading.set(true);
    this.teachers.set(await this.apiConsumer.getTeachers());
    this.isLoading.set(false);
  }

  async addNew() {
    var id = await this.dialog.openDialogAndWait<TeacherEditorDialog, number>(TeacherEditorDialog);
    if (id){
      var newItem = await this.apiConsumer.getTeacher(id);
      this.teachers.update(t => [...t, newItem]);
    }
  }

  async update(t: Teacher){
    var updated = await this.dialog.openDialogAndWait<TeacherEditorDialog, Teacher>(TeacherEditorDialog, t);
    this.teachers.update(ts =>  ts.map(i => i.id === updated.id ? updated : i));
  }

  async delete(t: Teacher){
    var confirm = await this.dialog.openConfirm("Are you sure you want to delete " + t.firstName);
    if (confirm)
    {
      await this.apiConsumer.deleteTeacher(t.id);
      this.teachers.update(ts => ts.filter(i => i.id != t.id));
    }
  }

}