import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { Student } from '../models/student';
import { StudyProgram } from '../models/study-program';
import { FormGroupMappings } from '../models/mappings/form-group-mapping';
import { DialogService } from '../services/dialog-service';
import { FormUtils } from '../utils/form-utils';

@Component({
    selector: 'app-student-editor',
    standalone: true,
    templateUrl: './student-editor-dialog.html',
    imports: [ReactiveFormsModule],
})
export class StudentEditorDialog implements OnInit {

    private isEditing = false;

    protected isLoading = signal(false);
    protected form: FormGroup;
    protected studyPrograms = signal<StudyProgram[]>([]);

    constructor(
        private dialogRef: MatDialogRef<StudentEditorDialog>,
        private consumer: ApiConsumer,
        private dialog: DialogService,
        @Inject(MAT_DIALOG_DATA) data: Student
    ) {
        this.isEditing = data != null;
        this.form = FormGroupMappings.createStudent(data);
    }


    async ngOnInit(): Promise<void> {
        await this.loadStudyPrograms();
    }

    private async loadStudyPrograms() {
        try {
            this.studyPrograms.set(await this.consumer.getStudyPrograms());
        }
        catch {
            await this.dialog.openError('Failed to load study programs');
        }
    }

    async save(): Promise<void> {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;

        try {
            this.isLoading.set(true);

            if (this.isEditing) {
                const res = this.form.value;
                await this.consumer.updateStudent(res);
                this.dialogRef.close(res);
            } else {
                const id = await this.consumer.createStudent(this.form.value);
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
