import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { Teacher } from '../models/teacher';
import { MatDialog } from '@angular/material/dialog';
import { TeacherEditorDialog } from '../dialogs/teacher-editor-dialog';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [MatProgressSpinner],
  templateUrl: './teachers.html',
})
export class Teachers implements OnInit {

  private apiConsumer = inject(ApiConsumer);
  private dialog = inject(MatDialog);

  protected isLoading = signal(false);

  protected teachers: Teacher[] = [];

  async ngOnInit(): Promise<void> {

    this.isLoading.set(true);
    this.teachers = await this.apiConsumer.getTeachers();
    this.isLoading.set(false);
  }

  addNew() {
    var d = this.dialog.open(TeacherEditorDialog);
    
  }

}