import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'error-dialog',
  standalone: true,
  templateUrl: './error-dialog.html',
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class ErrorDialog {

  constructor(
    private dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) protected message: string
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
