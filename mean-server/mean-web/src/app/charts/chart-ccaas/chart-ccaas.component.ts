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
  selectedValue: string;
  CCAAs: ccaa[] = [
    {nombre: 'Andalucía',sigla: 'AND', pos: 1},
    {nombre: 'Aragón',sigla: 'ARA', pos: 2},
    {nombre: 'Asturias',sigla: 'AST', pos: 3},
    {nombre: 'Baleares',sigla: 'BAL', pos: 4},
    {nombre: 'Canarias',sigla: 'CAN', pos: 5},
    {nombre: 'Cantabria',sigla: 'CNT', pos: 6},
    {nombre: 'Castilla_La_Mancha',sigla: 'CLM', pos: 7},
    {nombre: 'Castilla_y_León',sigla: 'CYL', pos: 8},
    {nombre: 'Cataluña',sigla: 'CAT', pos: 9},
    {nombre: 'Ceuta',sigla: 'CEU', pos: 10},
    {nombre: 'C._Valenciana',sigla: 'VAL', pos: 11},
    {nombre: 'Extremadura',sigla: 'EXT', pos: 12},
    {nombre: 'Galicia',sigla: 'GAL', pos: 13},
    {nombre: 'Madrid',sigla: 'MAD', pos: 14},
    {nombre: 'Melilla',sigla: 'MEL', pos: 15},
    {nombre: 'Murcia',sigla: 'MUR', pos: 16},
    {nombre: 'Navarra',sigla: 'NAV', pos: 17},
    {nombre: 'País_Vasco',sigla: 'PVA', pos: 18},
    {nombre: 'La_Rioja',sigla: 'RIO', pos: 19}
  ];

  initialValue= this.CCAAs[1].nombre;

  ngOnInit() {
    this.getApiCCAAs();
  }

  getApiCCAAs(){
    let dataSource;
    this.dataApi.getHospitalizados().subscribe((arrayHosp) => { this.makeChart(arrayHosp) });
    return dataSource;
  }

  onDownloadPDF() {
    alert("PDF saved");
  }

  changeProvincia(ccaas) {
    console.log(ccaas);
    // let sigla;
    // for(let i=0; i<this.provincias.length; i++){
    //   if(this.provincias[i].nombre == prov){
    //     sigla = this.provincias[i].sigla;
    //   }
    // }
    // this.dataApi.getUci().subscribe((sortedArray) => {
    //   let dataUci = sortedArray[sigla+"UCI"];
    //   let dataHosp = sortedArray[sigla+"Hosp"];
    for(var key in ccaas){
      ccaas[key] = ccaas[key].replace(/_/g, ' ');
    }
      this.myChartCCAAs.data.labels = ccaas;
    //   this.myChartCCAAs.data.datasets[1].data = dataHosp;
    //   this.myChartCCAAs.options.title.text = prov + ' - Prevalencia - Hospitalizados&UCI';
      this.myChartCCAAs.update();
    // });
  }

  //FUNCION INTRODUCIR PROV STR, DEVOLVER ARRAY PAIR
  async makeChart(arrayHosp) {

    // let selectedProv = Provincias[prov];
    // let HospData = sortedArray[selectedProv.sigla + "Hosp"];
    // let UCIData = sortedArray[selectedProv.sigla + "UCI"];
    // let Fechas = sortedArray["Fechas"];

    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    this.myChartCCAAs = new Chart("myChartCCAAs", {
      type: 'radar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels: [this.CCAAs[0].nombre, this.CCAAs[1].nombre, this.CCAAs[2].nombre, this.CCAAs[3].nombre],
        datasets: [{
          label: "Hospitalizados",
          backgroundColor: "rgba(92, 184, 92,0.2)",
          data: [arrayHosp['AND'].Hospitalizados[10], arrayHosp['ARA'].Hospitalizados[10], arrayHosp['AST'].Hospitalizados[10], arrayHosp['BAL'].Hospitalizados[10]]
        },
        {
          label: "Fallecidos",
          backgroundColor: "rgba(0,0,200,0.3)",
          data: [arrayHosp['AND'].Fallecidos[10], arrayHosp['ARA'].Fallecidos[10], arrayHosp['AST'].Fallecidos[10], arrayHosp['BAL'].Fallecidos[10]]
        },
        {
          label: "UCI",
          backgroundColor: "rgba(200,0,0,0.4)",
          data: [arrayHosp['AND'].UCI[10], arrayHosp['ARA'].UCI[10], arrayHosp['AST'].UCI[10], arrayHosp['BAL'].UCI[10]]
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

