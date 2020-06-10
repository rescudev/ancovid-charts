import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';
import * as jsPDF from 'jspdf'

@Component({
  selector: 'app-chart-prevalencia',
  templateUrl: './chart-prevalencia.component.html',
  styleUrls: ['./chart-prevalencia.component.css']
})
export class ChartPrevalenciaComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  myChartPrevalencia;

  ngOnInit() {
    this.getApiPrevalencias();
  }

  getApiPrevalencias(){
    let dataSource;
    this.dataApi.getPrevalencia().subscribe((prevalencia) => { this.makeChart(prevalencia) });
    return dataSource;
  }

  onDownloadJsonTxt(){
    this.dataApi.getPrevalencia().subscribe((prevalencia) => {
      this.downloadString(prevalencia, "text/plain", "Prevalencia-Chart.txt")
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
    var base64Str = this.myChartPrevalencia.toBase64Image();
    var blob = this.dataURItoBlob(base64Str);
    saveAs(blob, "Prevalencia-Chart.gif");
  }

  onDownloadPDF() {
    var base64Str = this.myChartPrevalencia.toBase64Image();
    var blob = this.dataURItoBlob(base64Str);
    // saveAs(blob, "UCI-Chart.gif");

    var doc = new jsPDF("p","mm","a4");
    doc.addImage(base64Str, 'JPEG', 15, 15, 180, 100);
    let j = 0;

    var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=350;  // width of A4 in mm

    var paragraphFechas='Fechas: '+this.myChartPrevalencia.data.labels.toString();
    var paragraphAN='Andalucía: '+this.myChartPrevalencia.data.datasets[0].data.toString(), paragraphAL='Almería: '+this.myChartPrevalencia.data.datasets[1].data.toString()
    , paragraphCA='Cádiz: '+this.myChartPrevalencia.data.datasets[2].data.toString(), paragraphCO='Córdoba: '+this.myChartPrevalencia.data.datasets[3].data.toString()
    , paragraphGR='Granada: '+this.myChartPrevalencia.data.datasets[4].data.toString(), paragraphHU='Huelva: '+this.myChartPrevalencia.data.datasets[5].data.toString()
    , paragraphJA='Jaén: '+this.myChartPrevalencia.data.datasets[6].data.toString(), paragraphMA='Málaga: '+this.myChartPrevalencia.data.datasets[7].data.toString()
    , paragraphSE='Sevilla: '+this.myChartPrevalencia.data.datasets[8].data.toString();


    var lines0 =doc.splitTextToSize(paragraphFechas, (pdfInMM-lMargin-rMargin)), lines1 =doc.splitTextToSize(paragraphAN, (pdfInMM-lMargin-rMargin))
    , lines2 =doc.splitTextToSize(paragraphAL, (pdfInMM-lMargin-rMargin)), lines3 =doc.splitTextToSize(paragraphCA, (pdfInMM-lMargin-rMargin))
    , lines4 =doc.splitTextToSize(paragraphCO, (pdfInMM-lMargin-rMargin)), lines5 =doc.splitTextToSize(paragraphGR, (pdfInMM-lMargin-rMargin))
    , lines6 =doc.splitTextToSize(paragraphHU, (pdfInMM-lMargin-rMargin)), lines7 =doc.splitTextToSize(paragraphJA, (pdfInMM-lMargin-rMargin))
    , lines8 =doc.splitTextToSize(paragraphMA, (pdfInMM-lMargin-rMargin)), lines9 =doc.splitTextToSize(paragraphSE, (pdfInMM-lMargin-rMargin));

    doc.setFontSize(9);

    doc.text(lMargin,130,lines0), doc.text(lMargin,150,lines1), doc.text(lMargin,162,lines2), doc.text(lMargin,174,lines3), doc.text(lMargin,186,lines4)
    , doc.text(lMargin,198,lines5), doc.text(lMargin,210,lines6), doc.text(lMargin,220,lines7), doc.text(lMargin,236,lines8), doc.text(lMargin,248,lines9);

    doc.save('Prevalencia-Chart.pdf');
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

  async makeChart(sortedArray) {

    var ANHospArray = sortedArray["ANHosp"], ALHospArray = sortedArray["ALHosp"], CAHospArray = sortedArray["CAHosp"], COHospArray = sortedArray["COHosp"], GRHospArray = sortedArray["GRHosp"],
    HUHospArray = sortedArray["HUHosp"], JAHospArray = sortedArray["JAHosp"], MAHospArray = sortedArray["MAHosp"], SEHospArray = sortedArray["SEHosp"], Fechas = sortedArray["Fechas"];

    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    this.myChartPrevalencia = new Chart("myChartPrevalencia", {
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
          reverse: true,
          //TODO CONSEGUIR SEGUN VIEW A RIGHT O LEFT, LOCK SCREEN LANDSCAPE
          labels:{
            // usePointStyle: true,
            boxWidth: 20,
            padding: 6,
            fontColor:'#000',
            fontSize: 15
          },

        },
        layout:{
          padding:{
            left:0,
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

