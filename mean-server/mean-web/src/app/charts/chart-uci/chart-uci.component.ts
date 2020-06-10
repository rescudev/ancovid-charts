import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';
import { Provincias } from "src/app/models/provincias.model";
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf'

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

  onDownloadJsonTxt(){
    this.dataApi.getUci().subscribe((uci) => {
      this.downloadString(uci, "text/plain", "UCI-Chart.txt")
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
    var base64Str = this.myChartUci.toBase64Image();
    var blob = this.dataURItoBlob(base64Str);
    saveAs(blob, "UCI-Chart.gif");
  }

  onDownloadPDF() {
    var base64Str = this.myChartUci.toBase64Image();

    var doc = new jsPDF("p","mm","a4");
    doc.addImage(base64Str, 'JPEG', 15, 15, 180, 100);
    let j = 0;

    var lMargin=15; //left margin in mm
    var rMargin=15; //right margin in mm
    var pdfInMM=350;  // width of A4 in mm

    var paragraphFechas='Fechas: '+this.myChartUci.data.labels.toString();
    var paragraphHosp='Hospitalizados: '+this.myChartUci.data.datasets[1].data.toString();
    var paragraphUCI='UCI: '+this.myChartUci.data.datasets[0].data.toString();

    var lines0 =doc.splitTextToSize(paragraphFechas, (pdfInMM-lMargin-rMargin));
    var lines1 =doc.splitTextToSize(paragraphHosp, (pdfInMM-lMargin-rMargin));
    var lines2 =doc.splitTextToSize(paragraphUCI, (pdfInMM-lMargin-rMargin));

    doc.setFontSize(9);

    doc.text(lMargin,130,lines0);
    doc.text(lMargin,160,lines1);
    doc.text(lMargin,175,lines2);

    doc.save('UCI-Chart.pdf');

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

