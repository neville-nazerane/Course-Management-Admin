import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { Teacher } from '../models/teacher';
import { TeacherEditorDialog } from '../dialogs/teacher-editor-dialog';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { DialogService } from '../services/dialog-service';

@Component({
  imports: [MatProgressSpinner],
  templateUrl: './teachers.html',
})
export class Teachers implements OnInit {

  private apiConsumer = inject(ApiConsumer);
  private dialog = inject(DialogService);

  protected isLoading = signal(false);

  protected teachers: Teacher[] = [];

  async ngOnInit(): Promise<void> {

    this.isLoading.set(true);
    this.teachers = await this.apiConsumer.getTeachers();
    this.isLoading.set(false);
  }

  async addNew() {
    var id = await this.dialog.openDialogAndWait<TeacherEditorDialog, number>(TeacherEditorDialog);
    if (id){
      var newItem = await this.apiConsumer.getTeacher(id);
      this.teachers.push(newItem);
    }
  }

  async delete(t: Teacher){
    var confirm = await this.dialog.openConfirm("Are you sure you want to delete " + t.firstName);
    console.log(234, confirm);
    if (confirm)
    {
      await this.apiConsumer.deleteTeacher(t.id);
      this.teachers = this.teachers.filter(t => t.id != t.id);
    }
  }

}