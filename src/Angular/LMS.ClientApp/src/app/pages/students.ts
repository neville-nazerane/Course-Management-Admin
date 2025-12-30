import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { Student } from '../models/student';
import { StudyProgram } from '../models/study-program';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DialogService } from '../services/dialog-service';
import { MatTableModule } from '@angular/material/table';
import { SignalUtils } from '../utils/signal-utils';
import { StudentEditorDialog } from '../dialogs/student-editor-dialog';
import { StudentEnrollmentsDialog } from '../dialogs/student-enrollments-dialog';

@Component({
  imports: [MatProgressSpinner, MatTableModule],
  templateUrl: './students.html',
})
export class Students implements OnInit {

  private apiConsumer = inject(ApiConsumer);
  private dialog = inject(DialogService);

  protected isLoading = signal(false);
  protected students = signal<Student[]>([]);
  protected studyPrograms = signal<StudyProgram[]>([]);

  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    try {
      const [students, programs] = await Promise.all([
        this.apiConsumer.getStudents(),
        this.apiConsumer.getStudyPrograms()
      ]);

      this.students.set(students);
      this.studyPrograms.set(programs);
    }
    catch {
      await this.dialog.openError('Failed to load students');
    }
    finally {
      this.isLoading.set(false);
    }
  }

  getStudyProgramName(id: number | null): string {
    return this.studyPrograms().find(p => p.id === id)?.name ?? '';
  }

  openEnroll(studentId: number){
    this.dialog.open(StudentEnrollmentsDialog, studentId);
  }

  async addNew() {
    const id = await this.dialog.openDialogAndWait<StudentEditorDialog, number>(StudentEditorDialog);
    if (id) {
      const newItem = await this.apiConsumer.getStudent(id);
      SignalUtils.push(this.students, newItem);
    }
  }

  async update(s: Student) {
    const updated = await this.dialog.openDialogAndWait<StudentEditorDialog, Student>(StudentEditorDialog, s);
    SignalUtils.replaceById(this.students, updated);
  }

  async delete(s: Student) {
    const confirm = await this.dialog.openConfirm('Are you sure you want to delete ' + s.firstName);
    if (confirm) {
      try {
        this.isLoading.set(true);
        await this.apiConsumer.deleteStudent(s.id);
        SignalUtils.removeById(this.students, s.id);
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
