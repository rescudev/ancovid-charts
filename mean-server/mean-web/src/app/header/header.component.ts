import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {TipsDialogComponentDialog} from 'src/app/elements/tips-dialog/tips-dialog.component'
import {FaqDialogComponentDialog} from 'src/app/elements/faq-dialog/faq-dialog.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {}

  openDialogTips() {
    const dialogRef = this.dialog.open(TipsDialogComponentDialog , {
      height: '80%',
      width: '80%',
    });
  }
  openDialogFaq() {
    const dialogRef = this.dialog.open(FaqDialogComponentDialog , {
      height: '80%',
      width: '80%',
    });
  }
}
