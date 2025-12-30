import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiConsumer } from '../services/api-consumer';
import { Course } from '../models/course';
import { FormGroupMappings } from '../models/mappings/form-group-mapping';
import { DialogService } from '../services/dialog-service';
import { FormUtils } from '../utils/form-utils';
import { CourseSectionDisplay } from '../models/course-section-display';
import { CourseSectionEditorDialog } from './course-section-editor-dialog';
import { SignalUtils } from '../utils/signal-utils';

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

    async add() : Promise<void> {
        var id = await this.dialog.openDialogAndWait<CourseSectionEditorDialog, number>(CourseSectionEditorDialog);
        var newItem = await this.consumer.getCourseSection(id);
        SignalUtils.push(this.items, newItem);
    }

    close(){
        this.dialogRef.close();
    }

}