import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { FormControl } from '@angular/forms';
import { DataApiService} from 'src/app/services/data-api.service';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-chart-pcrs',
  templateUrl: './chart-pcrs.component.html',
  styleUrls: ['./chart-pcrs.component.css']
})

export class ChartPcrsComponent implements OnInit {
  myChartPcrs;
  date = new FormControl();
  minDate: Date;
  maxDate: Date;

  constructor(private dataApi: DataApiService) {
    this.minDate = new Date(2020, 3, 26);
    dataApi.getLastDate().subscribe((lastDate) =>
    {
      this.maxDate = lastDate['Date'];
    });
  }

  ngOnInit() {
    this.getApiPcrsLastDate();
  }

  getApiPcrsLastDate(){
    this.dataApi.getLastDate().subscribe((lastDate) => {
      this.dataApi.getPcrs(lastDate['Fecha']).subscribe((sortedPcrs) => { this.makeChart(lastDate['Fecha'], sortedPcrs); });
    });
  }

  getApiPcrsAnyDate(dateSelected){
    this.dataApi.getPcrs(dateSelected).subscribe((sortedPcrs) => {
      this.updateChart(dateSelected, sortedPcrs);
    });
  }

  changeDate(date) {
    let dateFormated = this.formatDate(date);
    this.getApiPcrsAnyDate(dateFormated);
  }

  updateChart(date, sortedPcrs) {
      let TotalSpain = sortedPcrs.Totales.shift();
      for(var key in sortedPcrs.CCAAs){
        sortedPcrs.CCAAs[key] = sortedPcrs.CCAAs[key].replace(/_/g, ' ');
      }
      this.myChartPcrs.data.datasets[0].data = sortedPcrs.Totales;
      this.myChartPcrs.options.title.text = 'España - Nº Confirmados Totales por PCR ' + '('+TotalSpain+') a ' + date;
      this.myChartPcrs.update();
  }

  formatDate(date) {
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
    return (dia+'-'+month+'-'+date.getFullYear());
  }


  onDownloadJsonTxt(){
    this.dataApi.getLastDate().subscribe((lastDate) => {
      this.dataApi.getPcrs(lastDate['Fecha']).subscribe((uci) => {
        console.log(uci);
        this.downloadString(uci, "text/plain", "PCRs-Chart.txt")
      });
    });
  }

  downloadString(text, fileType, fileName) {
    text = JSON.stringify(text);
    var blob = new Blob([text], { type: fileType });

    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
  }


  onDownloadIMG() {
    var base64Str = this.myChartPcrs.toBase64Image();
    var blob = this.dataURItoBlob(base64Str);
    saveAs(blob, "PCRs-Chart.gif");
  }

  onDownloadPDF() {
    var base64Str = this.myChartPcrs.toBase64Image();

    var doc = new jsPDF("p","mm","a4");
    doc.addImage(base64Str, 'JPEG', 15, 15, 180, 100);

    var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=350;  // width of A4 in mm

    var paragraphCCAAs='CCAAs: '+this.myChartPcrs.data.labels.toString();
    var paragraphTotales='Totales: '+this.myChartPcrs.data.datasets[0].data.toString();

    var lines0 =doc.splitTextToSize(paragraphCCAAs, (pdfInMM-lMargin-rMargin));
    var lines1 =doc.splitTextToSize(paragraphTotales, (pdfInMM-lMargin-rMargin));

    doc.setFontSize(9);

    doc.text(lMargin,130,lines0);
    doc.text(lMargin,140,lines1);

    doc.save('PCRs-Chart.pdf');

  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  async makeChart(date, sortedArray) {
    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = '#777';

    sortedArray.CCAAs.shift();
    let TotalSpain = sortedArray.Totales.shift();
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
          text:'España - Nº Confirmados Totales por PCR ' + '('+TotalSpain+') a ' + date,
          fontSize:22
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
