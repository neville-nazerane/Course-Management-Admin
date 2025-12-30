import { Component, Inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { DialogService } from '../services/dialog-service';
import { CourseSectionDisplay } from '../models/course-section-display';
import { CourseSectionEditorDialog } from './course-section-editor-dialog';
import { SignalUtils } from '../utils/signal-utils';
import { CourseSection } from '../models/course-section';

@Component({
  selector: 'app-course-editor',
  standalone: true,
  templateUrl: './course-teachers-dialog.html',
  imports: [ReactiveFormsModule],
})
export class CourseTeachersDialog implements OnInit {

    protected items = signal<CourseSectionDisplay[]>([]);

    constructor(private dialogRef: MatDialogRef<CourseTeachersDialog>,
                private consumer: ApiConsumer,
                private dialog: DialogService,
                @Inject(MAT_DIALOG_DATA) private courseId: number){
        
    }

    async ngOnInit(): Promise<void> {
        this.items.set(await this.consumer.getCourseSectionsByCourseId(this.courseId))
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

    async add() : Promise<void> {
        var model : CourseSection = {
            courseId: this.courseId
        };
        var id = await this.dialog.openDialogAndWait<CourseSectionEditorDialog, number>(CourseSectionEditorDialog, model);
        var newItem = await this.consumer.getCourseSection(id);
        SignalUtils.push(this.items, newItem);
    }

    close(){
        this.dialogRef.close();
    }

}