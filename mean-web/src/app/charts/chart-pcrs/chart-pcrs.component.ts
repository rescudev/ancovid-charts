import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-chart-pcrs',
  templateUrl: './chart-pcrs.component.html',
  styleUrls: ['./chart-pcrs.component.css']
})


export class ChartPcrsComponent implements OnInit {
  myChartPcrs;
  date = new FormControl(new Date());
  minDate: Date;
  maxDate: Date;

  constructor() {
    this.minDate = new Date(2020, 3, 26);
    this.maxDate =  new Date();
  }

  onDownloadPDF() {
    alert("PDF saved");
  }

  changeDate(date) {

    //console.log(event.target.date.value);
    let dia = date.getDate().toString();
    let month = date.getUTCMonth() + 1;
    if(dia < 10){
      dia = '0'+dia;
      if(dia == 1){
        month++;
      }
    }
    if(month < 10){
      month = '0'+month;
    }
    this.myChartPcrs.destroy();
    this.makeChart(dia+'-'+month+'-'+date.getFullYear());
  }

  ngOnInit(): void {
    this.makeChart('30-05-2020');
  }

  async makeChart(date) {
    let aux = date;
    let sortedArray = await this.httpGet('http://localhost:3000/pcr/chart/'+aux);

    sortedArray.CCAAs.shift();
    let TotalSpain = sortedArray.Totales.shift();
    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    for(var key in sortedArray.CCAAs){
      sortedArray.CCAAs[key] = sortedArray.CCAAs[key].replace(/_/g, ' ');
    }
    this.myChartPcrs = new Chart("myChartPcrs", {
      type: 'horizontalBar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels: sortedArray.CCAAs,
        datasets:[{
          label:'Nº Confirmados',
          data: sortedArray.Totales,
          backgroundColor:'#2fc4b2',
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:30,
          hoverBorderColor:'#000',
          fill:false
        }
      ]
      },
      options:{
        title:{
          display:true,
          text:'España - Nº Confirmados Totales por PCR ' + '('+TotalSpain+') a ' + aux,
          fontSize:25
        },
        legend:{
          display:false,
          position:'right',
          labels:{
            fontColor:'#000'
          }
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


    // var Fechas=[], ESPData=[], ANDData=[], ARAData=[], ASTData=[], BALData=[], CANData=[], CNTData=[], CLMData=[], CYLData=[], CATData=[], CEUData=[], VALData=[], EXTData=[]
    // , GALData=[], MADData=[], MELData=[], MURData=[], NAVData=[], PVAData=[], RIOData=[];

    // Fechas = sortedArray['Fechas'];

    // ESPData = sortedArray['ESP'].Total, ANDData = sortedArray['AND'].Total, ARAData = sortedArray['ARA'].Total, ASTData = sortedArray['AST'].Total, BALData = sortedArray['BAL'].Total
    // , CANData = sortedArray['CAN'].Total, CNTData = sortedArray['CNT'].Total, ESPData = sortedArray['ESP'].Total, CLMData = sortedArray['CLM'].Total, CYLData = sortedArray['CYL'].Total
    // , CATData = sortedArray['CAT'].Total, CEUData = sortedArray['CEU'].Total, VALData = sortedArray['VAL'].Total, EXTData = sortedArray['EXT'].Total, GALData = sortedArray['GAL'].Total
    // , MADData = sortedArray['MAD'].Total, MELData = sortedArray['MEL'].Total, MURData = sortedArray['MUR'].Total, NAVData = sortedArray['NAV'].Total, PVAData = sortedArray['PVA'].Total
    // , RIOData = sortedArray['RIO'].Total;

    // let day = Fechas.indexOf('25/05/2020');
    // let data = [ANDData[day], ARAData[day], ASTData[day], BALData[day], CANData[day]]
