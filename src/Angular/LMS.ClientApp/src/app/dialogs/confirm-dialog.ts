import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.html',
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmDialog {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  yes(): void {
    this.dialogRef.close(true);
  }

  no(): void {
    this.dialogRef.close(false);
  }
}
