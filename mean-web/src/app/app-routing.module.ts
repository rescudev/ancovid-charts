import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartPrevalenciaComponent } from './charts/chart-prevalencia/chart-prevalencia.component';

const routes: Routes = [
  {path: 'prevalencia-chart', component: ChartPrevalenciaComponent},
  {path: '**', component: ChartPrevalenciaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
