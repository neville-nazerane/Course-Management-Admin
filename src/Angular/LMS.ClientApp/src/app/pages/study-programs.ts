import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { StudyProgram } from '../models/study-program';
import { StudyProgramEditorDialog } from '../dialogs/study-program-editor-dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DialogService } from '../services/dialog-service';
import { MatTableModule } from '@angular/material/table';
import { SignalUtils } from '../utils/signal-utils';

@Component({
  imports: [MatProgressSpinner, MatTableModule],
  templateUrl: './study-programs.html',
})
export class StudyPrograms implements OnInit {

  private apiConsumer = inject(ApiConsumer);
  private dialog = inject(DialogService);

  protected isLoading = signal(false);
  protected studyPrograms = signal<StudyProgram[]>([]);

  async ngOnInit(): Promise<void> {
    this.isLoading.set(true);
    try {
      this.studyPrograms.set(await this.apiConsumer.getStudyPrograms());
    }
    catch {
      await this.dialog.openError('Failed to get study programs');
    }
    finally {
      this.isLoading.set(false);
    }
  }

  async addNew() {
    const id = await this.dialog.openDialogAndWait<StudyProgramEditorDialog, number>(StudyProgramEditorDialog);
    if (id) {
      const newItem = await this.apiConsumer.getStudyProgram(id);
      SignalUtils.push(this.studyPrograms, newItem);
    }
  }

  async update(sp: StudyProgram) {
    const updated = await this.dialog.openDialogAndWait<StudyProgramEditorDialog, StudyProgram>(StudyProgramEditorDialog, sp);
    SignalUtils.replaceById(this.studyPrograms, updated);
  }

  async delete(sp: StudyProgram) {
    const confirm = await this.dialog.openConfirm('Are you sure you want to delete ' + sp.name);
    if (confirm) {
      try {
        this.isLoading.set(true);
        await this.apiConsumer.deleteStudyProgram(sp.id);
        SignalUtils.removeById(this.studyPrograms, sp.id);
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
