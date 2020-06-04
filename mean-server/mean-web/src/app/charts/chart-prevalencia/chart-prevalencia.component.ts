import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';

@Component({
  selector: 'app-chart-prevalencia',
  templateUrl: './chart-prevalencia.component.html',
  styleUrls: ['./chart-prevalencia.component.css']
})
export class ChartPrevalenciaComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.getApiPrevalencias();
  }

  getApiPrevalencias(){
    let dataSource;
    this.dataApi.getPrevalencia().subscribe((prevalencia) => { this.makeChart(prevalencia) });
    return dataSource;
  }

  onDownloadPDF() {
    alert("PDF saved");
  }

  async makeChart(sortedArray) {

    var ANHospArray = sortedArray["ANHosp"], ALHospArray = sortedArray["ALHosp"], CAHospArray = sortedArray["CAHosp"], COHospArray = sortedArray["COHosp"], GRHospArray = sortedArray["GRHosp"],
    HUHospArray = sortedArray["HUHosp"], JAHospArray = sortedArray["JAHosp"], MAHospArray = sortedArray["MAHosp"], SEHospArray = sortedArray["SEHosp"], Fechas = sortedArray["Fechas"];

    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';

    let myChartPrevalencia = new Chart("myChartPrevalencia", {
      type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:Fechas,
        datasets:[{
          label:'Andalucía',
          data:ANHospArray,
          backgroundColor:'rgba(92, 184, 92, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000'
        },
        {
          label:'Almería',
          data:ALHospArray,
          backgroundColor:'rgba(2, 117, 216, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Cádiz',
          data:CAHospArray,
          backgroundColor:'rgba(255, 255, 0, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Córdoba',
          data:COHospArray,
          backgroundColor:'rgba(207, 117, 0, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Granada',
          data:GRHospArray,
          backgroundColor:'rgba(240, 173, 78, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Huelva',
          data:HUHospArray,
          backgroundColor:'rgba(86, 35, 73, 0.8)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Jaén',
          data:JAHospArray,
          backgroundColor:'rgba(0, 255, 204, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Málaga',
          data:MAHospArray,
          backgroundColor:'rgba(0, 191, 255, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        },
        {
          label:'Sevilla',
          data:SEHospArray,
          backgroundColor:'rgba(217, 83, 79, 0.5)',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000',
          fill:true
        }
      ]
      },
      options:{
        title:{
          display:true,
          text:'Andalucía - Prevalencia - Hospitalizados',
          fontSize: 23,
          padding: 5
        },
        legend:{
          fullWidth:false,
          display:true,
          position:'right',
          //align:'start',
          //TODO CONSEGUIR SEGUN VIEW A RIGHT O LEFT, LOCK SCREEN LANDSCAPE
          labels:{
            fontColor:'#000',
            fontSize: 15
          },

        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }


}

