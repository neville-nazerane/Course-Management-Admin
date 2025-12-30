import { Component, Inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { Course } from '../models/course';
import { FormGroupMappings } from '../models/mappings/form-group-mapping';
import { DialogService } from '../services/dialog-service';
import { FormUtils } from '../utils/form-utils';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  templateUrl: './course-editor-dialog.html',
  imports: [ReactiveFormsModule],
})
export class CourseEditorDialog {

  private isEditing = false;

  protected isLoading = signal(false);
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<CourseEditorDialog>,
              private consumer: ApiConsumer,
              private dialog: DialogService,
              @Inject(MAT_DIALOG_DATA) data: Course
  ) {
    this.isEditing = data != null;
    this.form = FormGroupMappings.createCourse(data);
  }

  async save(): Promise<void> {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    try {
      this.isLoading.set(true);

      if (this.isEditing) {
        const res = this.form.value;
        await this.consumer.updateCourse(res);
        this.dialogRef.close(res);
      } else {
        const id = await this.consumer.createCourse(this.form.value);
        this.dialogRef.close(id);
      }
    }
    catch {
      const action = this.isEditing ? 'update' : 'add';
      await this.dialog.openError(`Failed to ${action}`);
    }
    finally {
      this.isLoading.set(false);
    }
  }

  close() {
    this.dialogRef.close();
  }

  getErrors(control: AbstractControl | null) {
    return FormUtils.getErrors(control);
  }
}
