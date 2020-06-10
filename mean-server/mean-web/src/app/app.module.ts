import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartPrevalenciaComponent } from './charts/chart-prevalencia/chart-prevalencia.component';
import { ChartPcrsComponent } from './charts/chart-pcrs/chart-pcrs.component';
import { ChartUciComponent } from './charts/chart-uci/chart-uci.component';
import { ChartProvinciasComponent } from './charts/chart-provincias/chart-provincias.component';
import { ChartCCAAsComponent } from './charts/chart-ccaas/chart-ccaas.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

import { DataApiService } from 'src/app/services/data-api.service';
import { SelectProvinciasComponent } from './elements/select-provincias/select-provincias.component';
import { FaqDialogComponent } from './elements/faq-dialog/faq-dialog.component';
import { FaqDialogComponentDialog } from './elements/faq-dialog/faq-dialog.component';
import { TipsDialogComponent } from './elements/tips-dialog/tips-dialog.component';
import { TipsDialogComponentDialog } from './elements/tips-dialog/tips-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChartPrevalenciaComponent,
    ChartPcrsComponent,
    ChartUciComponent,
    ChartProvinciasComponent,
    SelectProvinciasComponent,
    FaqDialogComponent,
    FaqDialogComponentDialog,
    TipsDialogComponent,
    TipsDialogComponentDialog,
    ChartCCAAsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [DataApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
