import { Component, Inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { DialogService } from '../services/dialog-service';
import { CourseSectionDisplay } from '../models/course-section-display';
import { CourseSectionEditorDialog } from './course-section-editor-dialog';
import { SignalUtils } from '../utils/signal-utils';
import { CourseSection } from '../models/course-section';
import { CourseTeachersRequest } from '../models/course-teachers-request';
import { EnrollStudentDialog } from './enroll-student-dialog';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  templateUrl: './course-teachers-dialog.html',
  imports: [ReactiveFormsModule, MatDialogModule],
})
export class CourseTeachersDialog implements OnInit {

    protected items = signal<CourseSectionDisplay[]>([]);

    constructor(private dialogRef: MatDialogRef<CourseTeachersDialog>,
                private consumer: ApiConsumer,
                private dialog: DialogService,
                @Inject(MAT_DIALOG_DATA) private request: CourseTeachersRequest){
        
    }

    async ngOnInit(): Promise<void> {
        if (this.request.courseId)
            this.items.set(await this.consumer.getCourseSectionsByCourseId(this.request.courseId));
        else if (this.request.teacherId)
            this.items.set(await this.consumer.getCourseSectionsByTeacherId(this.request.teacherId));
    }

    async edit(d: CourseSectionDisplay){
        var model : CourseSection = {
            id: d.id,
            courseId: d.courseId,
            teacherId: d.teacherId,
            sectionCode: d.sectionCode
        };
        await this.dialog.openDialogAndWait<CourseSectionEditorDialog, number>(CourseSectionEditorDialog, model);
        var updated = await this.consumer.getCourseSection(d.id);
        SignalUtils.replaceById(this.items, updated);
    }
    
    async delete(d: CourseSectionDisplay): Promise<void> {
        try {
            const id = d.id;
            const confirm = await this.dialog.openConfirm('Are you sure you want to delete ' + d.sectionCode);
            if (confirm){
                await this.consumer.deleteCourseSection(id);
                SignalUtils.removeById(this.items, id);    
            }
        } 
        catch {
            this.dialog.openError("Failed to throw exception");
        }
    }

    async enroll(d: CourseSectionDisplay){
        this.dialog.open(EnrollStudentDialog, d);
    }

    async add() : Promise<void> {
        
        var model : CourseSection = {
            courseId: this.request.courseId,
            teacherId: this.request.teacherId
        }

        var id = await this.dialog.openDialogAndWait<CourseSectionEditorDialog, number>(CourseSectionEditorDialog, model);
        var newItem = await this.consumer.getCourseSection(id);
        SignalUtils.push(this.items, newItem);
    }

    close(){
        this.dialogRef.close();
    }

}