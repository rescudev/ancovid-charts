import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';
import { Provincias } from "src/app/models/provincias.model";

interface Provincia {
  nombre: string;
  sigla: string;
  pos: number;
}

@Component({
  selector: 'app-chart-uci',
  templateUrl: './chart-uci.component.html',
  styleUrls: ['./chart-uci.component.css']
})
export class ChartUciComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  myChartUci;
  selectedValue: string;
  provincias: Provincia[] = [
    {nombre: 'Almería',sigla: 'AL', pos: 0},
    {nombre: 'Cádiz',sigla: 'CA', pos: 1},
    {nombre: 'Córdoba',sigla: 'CO', pos: 2},
    {nombre: 'Granada',sigla: 'GR', pos: 3},
    {nombre: 'Huelva',sigla: 'HU', pos: 4},
    {nombre: 'Jaén',sigla: 'JA', pos: 5},
    {nombre: 'Málaga',sigla: 'MA', pos: 6},
    {nombre: 'Sevilla',sigla: 'SE', pos: 7},
  ];

  initialValue= this.provincias[0].nombre;

  ngOnInit() {
    this.getApiUci();
  }

  getApiUci(){
    let dataSource;
    this.dataApi.getUci().subscribe((uci) => { this.makeChart(uci, this.initialValue) });
    return dataSource;
  }

  onDownloadPDF() {
    alert("PDF saved");
  }

  changeProvincia(prov) {
    let sigla;
    for(let i=0; i<this.provincias.length; i++){
      if(this.provincias[i].nombre == prov){
        sigla = this.provincias[i].sigla;
      }
    }
    this.dataApi.getUci().subscribe((sortedArray) => {
      let dataUci = sortedArray[sigla+"UCI"];
      let dataHosp = sortedArray[sigla+"Hosp"];
      this.myChartUci.data.datasets[0].data = dataUci;
      this.myChartUci.data.datasets[1].data = dataHosp;
      this.myChartUci.options.title.text = prov + ' - Prevalencia - Hospitalizados&UCI';
      this.myChartUci.update();
    });
  }

  //FUNCION INTRODUCIR PROV STR, DEVOLVER ARRAY PAIR
  async makeChart(sortedArray, prov) {

    let selectedProv = Provincias[prov];
    let HospData = sortedArray[selectedProv.sigla + "Hosp"];
    let UCIData = sortedArray[selectedProv.sigla + "UCI"];
    let Fechas = sortedArray["Fechas"];

    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    this.myChartUci = new Chart("myChartUci", {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:Fechas,
        datasets:[{
          label:'UCI',
          data:UCIData,
          backgroundColor:'rgba(39, 170, 128, 0.6)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000'
          },
          {
          label:'Hospitalizados',
          data:HospData,
          backgroundColor:'rgba(50, 255, 106, 0.4)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000'
        }
        ]
      },
      options:{
        title:{
          display:true,
          text:'Almería - Prevalencia - Hospitalizados&UCI',
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
        },
        tooltips: {
          displayColors: true,
          callbacks:{
            mode: 'x',
          },
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true,
            },
            type: 'linear',
          }]
        },
        layout:{
          padding:{
            left:0,
            right:0,
            bottom:0,
            top:0
          }
        }
      }
    });
  }

}

