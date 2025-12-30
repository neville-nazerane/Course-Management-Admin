import { Component, signal, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ApiConsumer } from '../services/api-consumer';
import { EnrollmentDisplay } from '../models/enrollment-display';
import { Course } from '../models/course';
import { CourseSectionDisplay } from '../models/course-section-display';
import { DialogService } from '../services/dialog-service';
import { SignalUtils } from '../utils/signal-utils';

@Component({
    standalone: true,
    templateUrl: './student-enrollments-dialog.html',
    imports: [FormsModule],
})
export class StudentEnrollmentsDialog implements OnInit {

    protected enrollments = signal<EnrollmentDisplay[]>([]);
    protected courses = signal<Course[]>([]);
    protected sections = signal<CourseSectionDisplay[]>([]);

    protected selectedCourseId: number | null = null;

    constructor(
        private dialogRef: MatDialogRef<StudentEnrollmentsDialog>,
        private dialog: DialogService,
        private consumer: ApiConsumer,
        @Inject(MAT_DIALOG_DATA) private studentId: number
    ) {}

    async ngOnInit(): Promise<void> {
        const [enrollments, courses] = await Promise.all([
            this.consumer.getStudentEnrollments(this.studentId),
            this.consumer.getCourses()
        ]);

        this.enrollments.set(enrollments);
        this.courses.set(courses);
    }

    async onCourseChange() {
        if (this.selectedCourseId == null) {
            this.sections.set([]);
            return;
        }

        this.sections.set(
            await this.consumer.getCourseSectionsByCourseId(this.selectedCourseId)
        );
    }

    async enroll(section: CourseSectionDisplay) {
        const newId = await this.consumer.enroll({
            id: 0,
            studentId: this.studentId,
            courseSectionId: section.id,
            enrolledOn: new Date()
        });

        const newItem = await this.consumer.getEnrollment(newId);
        SignalUtils.push(this.enrollments, newItem);
    }

    async deleteEnrollment(e: EnrollmentDisplay) {
        const confirm = await this.dialog.openConfirm(
            `Remove enrollment for ${e.courseName} (${e.courseSectionCode})?`
        );

        if (confirm) {
            await this.consumer.deleteEnrollment(e.id);
            SignalUtils.removeById(this.enrollments, e.id);
        }
    }

    close() {
        this.dialogRef.close();
    }
}
