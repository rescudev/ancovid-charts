import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';

interface ccaa {
  nombre: string;
  sigla: string;
  pos: number;
}

@Component({
  selector: 'app-chart-ccaas',
  templateUrl: './chart-ccaas.component.html',
  styleUrls: ['./chart-ccaas.component.css']
})
export class ChartCCAAsComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  myChartCCAAs;
  accFirstTime = true;
  selectedValue: string;
  CCAAs: ccaa[] = [
    {nombre: 'Andalucía',sigla: 'AND', pos: 1},
    {nombre: 'Aragón',sigla: 'ARA', pos: 2},
    {nombre: 'Asturias',sigla: 'AST', pos: 3},
    {nombre: 'Baleares',sigla: 'BAL', pos: 4},
    {nombre: 'Canarias',sigla: 'CAN', pos: 5},
    {nombre: 'Cantabria',sigla: 'CNT', pos: 6},
    {nombre: 'Castilla La Mancha',sigla: 'CLM', pos: 7},
    {nombre: 'Castilla y León',sigla: 'CYL', pos: 8},
    {nombre: 'Cataluña',sigla: 'CAT', pos: 9},
    {nombre: 'Ceuta',sigla: 'CEU', pos: 10},
    {nombre: 'C.Valenciana',sigla: 'VAL', pos: 11},
    {nombre: 'Extremadura',sigla: 'EXT', pos: 12},
    {nombre: 'Galicia',sigla: 'GAL', pos: 13},
    {nombre: 'Madrid',sigla: 'MAD', pos: 14},
    {nombre: 'Melilla',sigla: 'MEL', pos: 15},
    {nombre: 'Murcia',sigla: 'MUR', pos: 16},
    {nombre: 'Navarra',sigla: 'NAV', pos: 17},
    {nombre: 'País Vasco',sigla: 'PVA', pos: 18},
    {nombre: 'La Rioja',sigla: 'RIO', pos: 19}
  ];

  ngOnInit() {

    this.dataApi.getHospitalizados().subscribe((arrayHosp) => {

      this.dataApi.getLastDate().subscribe((lastDate) => {

        let ccaas = ['Andalucía','Aragón','Asturias','Baleares','Canarias'];

        let initialHosp=[];
        let initialFall=[];
        let initialUCI=[];

        let indexDay = arrayHosp['Fechas'].indexOf(lastDate['Fecha'].replace(/-/g, '/'));


        for(let i=0; i<5;i++){
          initialHosp[i] = arrayHosp[this.CCAAs[i].sigla].Hospitalizados[indexDay];
          initialFall[i] = arrayHosp[this.CCAAs[i].sigla].Fallecidos[indexDay];
          initialUCI[i] = arrayHosp[this.CCAAs[i].sigla].UCI[indexDay];
        }
        console.log(initialHosp);
        console.log(initialFall);
        console.log(initialUCI);

        this.makeChart(ccaas, initialHosp, initialFall, initialUCI);

      });
    });
  }

  onDownloadPDF() {
    alert("PDF saved");
  }

  changeProvincia(ccaas) {
    if(ccaas.length==1 && this.accFirstTime){
      this.accFirstTime=false;
      this.myChartCCAAs.destroy();
      this.makeChart([], [], [], []);
    }

    this.dataApi.getHospitalizados().subscribe((arrayHosp) => {

      this.dataApi.getLastDate().subscribe((lastDate) => {
        let indexDay = arrayHosp['Fechas'].indexOf(lastDate['Fecha'].replace(/-/g, '/'));

        if(this.myChartCCAAs.data.labels.length < ccaas.length){
          let nuevaCCAA = ccaas.filter(x => !this.myChartCCAAs.data.labels.includes(x));
          console.log(nuevaCCAA);
          let nuevaSIG;
          for(var key in this.CCAAs){
            if(this.CCAAs[key].nombre == nuevaCCAA){
              nuevaSIG = this.CCAAs[key].sigla;
            }
          }
          this.myChartCCAAs.data.datasets[0].data.splice(ccaas.indexOf(nuevaCCAA.toString()), 0, arrayHosp[nuevaSIG].Hospitalizados[indexDay]);
          this.myChartCCAAs.data.datasets[1].data.splice(ccaas.indexOf(nuevaCCAA.toString()), 0, arrayHosp[nuevaSIG].Fallecidos[indexDay]);
          this.myChartCCAAs.data.datasets[2].data.splice(ccaas.indexOf(nuevaCCAA.toString()), 0, arrayHosp[nuevaSIG].UCI[indexDay]);
        }
        this.myChartCCAAs.data.labels = ccaas;
        this.myChartCCAAs.update();

      });
    });
  }

  async makeChart(initialCCAAs, initialHosp, initialFall, initialUCI) {

    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    this.myChartCCAAs = new Chart("myChartCCAAs", {
      type: 'radar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels: initialCCAAs,
        datasets: [{
          label: "Hospitalizados",
          backgroundColor: "rgba(92, 184, 92,0.2)",
          data: initialHosp
        },
        {
          label: "Fallecidos",
          backgroundColor: "rgba(0,0,200,0.3)",
          data: initialFall
        },
        {
          label: "UCI",
          backgroundColor: "rgba(200,0,0,0.4)",
          data: initialUCI
        }]
      },
      options:{
        scale: {
          pointLabels: {
            fontSize: 20
          },
          ticks: {
            beginAtZero: true
          }
        },
        title:{
          display:true,
          text:'Comparativa de CCAAs                     ',
          fontSize:23
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            boxWidth: 20,
            padding: 6,
            fontColor:'#000',
            fontSize: 15
          }
        }
      }
    });
  }

}

