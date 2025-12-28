
import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { Teacher } from '../models/teacher';
import { DateUtils } from '../utils/date-utils';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  templateUrl: './teacher-editor-dialog.html',
  imports: [ReactiveFormsModule],
})
export class TeacherEditorDialog {

  private consumer = inject(ApiConsumer);
  private isEditing = false;

  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<TeacherEditorDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Teacher
  ) 
  {

    this.isEditing = data != null;

    this.form = new FormGroup({
      id: new FormControl(data?.id ?? 0),
      title: new FormControl(data?.title ?? ''),
      firstName: new FormControl(data?.firstName ?? ''),
      lastName: new FormControl(data?.lastName ?? ''),
      dateOfBirth: new FormControl(DateUtils.toDateInput(data?.dateOfBirth)),
      hiredOn: new FormControl(DateUtils.toDateInput(data?.hiredOn, new Date()))
    });


  }
  
  async save() : Promise<void> {
    if (this.isEditing)
    {
      var res = this.form.value;
      await this.consumer.updateTeacher(res);
      this.dialogRef.close(res);
    }
    else {
      var id = await this.consumer.createTeacher(this.form.value);
      this.dialogRef.close(id);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
