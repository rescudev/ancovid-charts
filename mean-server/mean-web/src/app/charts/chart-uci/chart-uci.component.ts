import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';

@Component({
  selector: 'app-chart-uci',
  templateUrl: './chart-uci.component.html',
  styleUrls: ['./chart-uci.component.css']
})
export class ChartUciComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.getApiUci();
  }

  getApiUci(){
    let dataSource;
    this.dataApi.getUci().subscribe((uci) => { this.makeChart(uci) });
    return dataSource;
  }

  onDownloadPDF() {
    alert("PDF saved");
  }
  //FUNCION INTRODUCIR PROV STR, DEVOLVER ARRAY PAIR
  async makeChart(sortedArray) {

    var ANHospArray = sortedArray["ANHosp"], ALHospArray = sortedArray["ALHosp"], CAHospArray = sortedArray["CAHosp"], COHospArray = sortedArray["COHosp"], GRHospArray = sortedArray["GRHosp"],
    HUHospArray = sortedArray["HUHosp"], JAHospArray = sortedArray["JAHosp"], MAHospArray = sortedArray["MAHosp"], SEHospArray = sortedArray["SEHosp"], Fechas = sortedArray["Fechas"];

    var ANUCIArray = sortedArray["SEUCI"];

    // , ALUCIArray = sortedArray["ALUCI"], CAUCIArray = sortedArray["CAUCI"], COUCIArray = sortedArray["COUCI"], GRUCIArray = sortedArray["GRUCI"],
    // HUUCIArray = sortedArray["HUUCI"], JAUCIArray = sortedArray["JAUCI"], MAUCIArray = sortedArray["MAUCI"], SEUCIArray = sortedArray["SEUCI"], Fechas = sortedArray["Fechas"];

    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let myChartUci = new Chart("myChartUci", {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:Fechas,
        datasets:[{
          label:'UCI',
          data:ANUCIArray,
          backgroundColor:'rgba(39, 170, 128, 0.6)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          type:'bar'
          },
          {
          label:'Hospitalizados',
          data:SEHospArray,
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
          text:'Provincia - Prevalencia - Hospitalizados/UCI',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
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
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        }
      }
    });
  }

  sortByProperty(property){
    return function(a,b){
        if(a[property] > b[property])
          return 1;
        else if(a[property] < b[property])
          return -1;

        return 0;
    }
  }

}

