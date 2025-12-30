import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { Course } from '../models/course';
import { CourseEditorDialog } from '../dialogs/course-editor-dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DialogService } from '../services/dialog-service';
import { MatTableModule } from '@angular/material/table';
import { SignalUtils } from '../utils/signal-utils';
import { CourseTeachersDialog } from '../dialogs/course-teachers-dialog';

@Component({
  imports: [MatProgressSpinner, MatTableModule],
  standalone: true,
  templateUrl: './courses.html',
})
export class Courses implements OnInit {

  private apiConsumer = inject(ApiConsumer);
  private dialog = inject(DialogService);

  protected isLoading = signal(false);
  protected courses = signal<Course[]>([]);

  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.courses.set(await this.apiConsumer.getCourses());
    }
    catch {
      await this.dialog.openError('Failed to get courses');
    }
    finally {
      this.isLoading.set(false);
    }
  }

  async addNew() {
    const id = await this.dialog.openDialogAndWait<CourseEditorDialog, number>(CourseEditorDialog);
    if (id) {
      const newItem = await this.apiConsumer.getCourse(id);
      SignalUtils.push(this.courses, newItem);
    }
  }

  async update(c: Course) {
    const updated = await this.dialog.openDialogAndWait<CourseEditorDialog, Course>(CourseEditorDialog, c);
    SignalUtils.replaceById(this.courses, updated);
  }

  openTeachers(courseId: number){
    this.dialog.open(CourseTeachersDialog, courseId);
  }

  async delete(c: Course) {
    const confirm = await this.dialog.openConfirm('Are you sure you want to delete ' + c.name);
    if (confirm) {
      try {
        this.isLoading.set(true);
        await this.apiConsumer.deleteCourse(c.id);
        SignalUtils.removeById(this.courses, c.id);
      }
      catch {
        await this.dialog.openError('Failed to delete item');
      }
      finally {
        this.isLoading.set(false);
      }
    }
  }

}
