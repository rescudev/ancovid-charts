import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-chart-prevalencia',
  templateUrl: './chart-prevalencia.component.html',
  styleUrls: ['./chart-prevalencia.component.css']
})
export class ChartPrevalenciaComponent implements OnInit {

  constructor() { }
  onDownloadPDF() {
    alert("PDF saved");
  }

  ngOnInit(): void {
    this.makeChart();
  }

  async makeChart() {
    let sortedArray = await this.httpGet('http://localhost:3000/prevalencia/chart');

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
          backgroundColor:'rgba(0, 51, 153, 0.5)',
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
          backgroundColor:'rgba(204, 0, 204, 0.5)',
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
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
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

  async httpGet(theUrl)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );

      var array = JSON.parse(xmlHttp.responseText);
      return array;
  }


}

