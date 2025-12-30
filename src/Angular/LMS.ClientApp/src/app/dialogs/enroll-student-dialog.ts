import { Component, signal, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ApiConsumer } from '../services/api-consumer';
import { EnrollmentDisplay } from '../models/enrollment-display';
import { Student } from '../models/student';
import { DialogService } from '../services/dialog-service';
import { SignalUtils } from '../utils/signal-utils';
import { CourseSectionDisplay } from '../models/course-section-display';

@Component({
    standalone: true,
    templateUrl: './enroll-student-dialog.html',
    imports: [FormsModule],
})
export class EnrollStudentDialog implements OnInit {

    protected students = signal<Student[]>([]);
    protected enrollments = signal<EnrollmentDisplay[]>([]);
    protected selectedStudentId: number | null = null;

    constructor(
        private dialogRef: MatDialogRef<EnrollStudentDialog>,
        private dialog: DialogService,
        private consumer: ApiConsumer,
        @Inject(MAT_DIALOG_DATA) private data: CourseSectionDisplay
    ) { }

    async ngOnInit(): Promise<void> {
        const [students, enrollments] = await Promise.all([
            this.consumer.getStudents(),
            this.consumer.getCourseEnrollments(this.data.id)
        ]);

        this.students.set(students);
        this.enrollments.set(enrollments);
    }

    async enroll() {
        if (this.selectedStudentId == null) return;

        const newId = await this.consumer.enroll({
            id: 0,
            studentId: this.selectedStudentId,
            courseSectionId: this.data.id,
            enrolledOn: new Date()
        });

        var newItem = await this.consumer.getEnrollment(newId);
        SignalUtils.push(this.enrollments, newItem);

        this.selectedStudentId = null;
    }

    async deleteEnrollment(e: EnrollmentDisplay) {
        const confirm = await this.dialog.openConfirm(
            `Are you sure you want to remove the enrollment of ${e.studentName} for ${e.courseName}`);

        if (confirm) {
            await this.consumer.deleteEnrollment(e.id);
            SignalUtils.removeById(this.enrollments, e.id);
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}
