
import { Component, Inject, inject, Injector } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { Teacher } from '../models/teacher';
import { DateUtils } from '../utils/date-utils';
import { FormGroupMappings } from '../models/mappings/form-group-mapping';

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
              @Inject(MAT_DIALOG_DATA) data: Teacher
  ) 
  {
    this.isEditing = data != null;
    this.form = FormGroupMappings.createTeacher(data);
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
