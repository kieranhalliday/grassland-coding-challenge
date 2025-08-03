import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fruit } from '../../models/fruit';

@Component({
  selector: 'app-fruit-dialog',
  templateUrl: './fruit-dialog.html',
  styleUrls: ['./fruit-dialog.scss']
})
export class FruitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FruitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fruit
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }
}