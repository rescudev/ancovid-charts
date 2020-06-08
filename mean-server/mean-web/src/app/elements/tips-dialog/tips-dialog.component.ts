import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-tips-dialog',
  templateUrl: './tips-dialog.component.html',
  styleUrls: ['./tips-dialog.component.css']
})

export class TipsDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(TipsDialogComponentDialog , {
      height: '80%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'tips-content-dialog',
  templateUrl: 'tips-content-dialog.html',
  styleUrls: ['./tips-dialog.component.css']
})
export class TipsDialogComponentDialog {}
