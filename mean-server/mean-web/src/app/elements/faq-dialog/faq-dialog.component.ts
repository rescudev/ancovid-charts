import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-faq-dialog',
  templateUrl: './faq-dialog.component.html',
  styleUrls: ['./faq-dialog.component.css']
})

export class FaqDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(FaqDialogComponentDialog , {
      height: '80%',
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'faq-content-dialog',
  templateUrl: 'faq-content-dialog.html',
  styleUrls: ['./faq-dialog.component.css']
})
export class FaqDialogComponentDialog {}
