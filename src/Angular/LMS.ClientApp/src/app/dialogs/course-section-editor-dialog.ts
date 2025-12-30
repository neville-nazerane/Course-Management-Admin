import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { DialogService } from '../services/dialog-service';
import { FormUtils } from '../utils/form-utils';
import { FormGroupMappings } from '../models/mappings/form-group-mapping';
import { Teacher } from '../models/teacher';
import { Course } from '../models/course';
import { CourseSection } from '../models/course-section';

@Component({
    selector: 'app-course-section-editor',
    standalone: true,
    templateUrl: './course-section-editor-dialog.html',
    imports: [ReactiveFormsModule],
})
export class CourseSectionEditorDialog implements OnInit {

    protected isLoading = signal(false);
    protected form: FormGroup;

    protected teachers = signal<Teacher[]>([]);
    protected courses = signal<Course[]>([]);

    constructor(
        private dialogRef: MatDialogRef<CourseSectionEditorDialog>,
        private consumer: ApiConsumer,
        private dialog: DialogService,
        @Inject(MAT_DIALOG_DATA) private data: CourseSection
    ) {
        this.form = FormGroupMappings.createCourseSection();
    }

    async ngOnInit(): Promise<void> {

        try {

            this.isLoading.set(true);
                
            if (this.data.id){
                var item = await this.consumer.getCourseSection(this.data.id);
                this.data.courseId = item.courseId;
                this.data.teacherId = item.teacherId;
            }

            this.form = FormGroupMappings.createCourseSection(this.data);

            const [teachers, courses] = await Promise.all([
                this.consumer.getTeachers(),
                this.consumer.getCourses()
            ]);

            this.teachers.set(teachers);
            this.courses.set(courses);
        }
        catch {
            await this.dialog.openError('Failed to load data');
        }
        finally {
            this.isLoading.set(false);
        }
    }

    async save(): Promise<void> {
        this.form.markAllAsTouched();
        if (!this.form.valid) return;

        try {
            this.isLoading.set(true);
            const id = await this.consumer.addCourseSection(this.form.value);
            this.dialogRef.close(id);
        }
        catch {
            await this.dialog.openError('Failed to add section');
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
