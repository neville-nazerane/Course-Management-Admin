import { Component, Inject, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { StudyProgram } from '../models/study-program';
import { FormGroupMappings } from '../models/mappings/form-group-mapping';
import { DialogService } from '../services/dialog-service';
import { FormUtils } from '../utils/form-utils';

@Component({
  selector: 'app-study-program-editor',
  standalone: true,
  templateUrl: './study-program-editor-dialog.html',
  imports: [ReactiveFormsModule],
})
export class StudyProgramEditorDialog {

  private isEditing = false;

  protected isLoading = signal(false);
  protected form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<StudyProgramEditorDialog>,
    private consumer: ApiConsumer,
    private dialog: DialogService,
    @Inject(MAT_DIALOG_DATA) data: StudyProgram
  ) {
    this.isEditing = data != null;
    this.form = FormGroupMappings.createStudyProgram(data);
  }

  async save(): Promise<void> {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    try {
      this.isLoading.set(true);

      if (this.isEditing) {
        const res = this.form.value;
        await this.consumer.updateStudyProgram(res);
        this.dialogRef.close(res);
      } else {
        const id = await this.consumer.createStudyProgram(this.form.value);
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
