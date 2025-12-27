
import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  templateUrl: './teacher-editor-dialog.html',
  imports: [ReactiveFormsModule],
})
export class TeacherEditorDialog {

  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<TeacherEditorDialog>) 
  {
    this.form = new FormGroup({
      title: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dateOfBirth: new FormControl(null),
      hiredOn: new FormControl(new Date().toISOString().split('T')[0])
    });
  }
  
  save() {
    console.log(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
