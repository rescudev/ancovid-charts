import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';
import { Provincias } from "src/app/models/provincias.model";
import * as jsPDF from 'jspdf'

interface Provincia {
  nombre: string;
  sigla: string;
  pos: number;
}

@Component({
  selector: 'app-chart-provincias',
  templateUrl: './chart-provincias.component.html',
  styleUrls: ['./chart-provincias.component.css']
})
export class ChartProvinciasComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }

  myChartProvincias;
  selectedValue: string;
  provincias: Provincia[] = [
    {nombre: 'Andalucía',sigla: 'AN', pos: 0},
    {nombre: 'Almería',sigla: 'AL', pos: 1},
    {nombre: 'Cádiz',sigla: 'CA', pos: 2},
    {nombre: 'Córdoba',sigla: 'CO', pos: 3},
    {nombre: 'Granada',sigla: 'GR', pos: 4},
    {nombre: 'Huelva',sigla: 'HU', pos: 5},
    {nombre: 'Jaén',sigla: 'JA', pos: 6},
    {nombre: 'Málaga',sigla: 'MA', pos: 7},
    {nombre: 'Sevilla',sigla: 'SE', pos: 8}
  ];

  initialValue= this.provincias[0].nombre;

  ngOnInit() {
    this.getApiUci();
  }

  getApiUci(){
    let dataSource;
    this.dataApi.getProvincias().subscribe((territorios) => { this.makeChart(territorios) });
    return dataSource;
  }

  changeProvincia(prov) {
    let pos;
    for(let i=0; i<this.provincias.length; i++){
      if(this.provincias[i].nombre == prov){
        pos = this.provincias[i].pos;
      }
    }
    this.dataApi.getProvincias().subscribe((sortedArray) => {

    let newData = [sortedArray['Territorios'][pos].ConfirmadosTotal, sortedArray['Territorios'][pos].ConfirmadosPCR, sortedArray['Territorios'][pos].Hospitalizados, sortedArray['Territorios'][pos].Fallecimientos
      , sortedArray['Territorios'][pos].TotalUCI, sortedArray['Territorios'][pos].Curados];

      this.myChartProvincias.options.title.text = prov + ' - Datos Totales';
      this.myChartProvincias.data.datasets[0].data = newData;
      this.myChartProvincias.data.datasets[1].data = newData;
      this.myChartProvincias.update();
    });
  }

  onDownloadJsonTxt(){
    this.dataApi.getProvincias().subscribe((uci) => {
      this.downloadString(uci, "text/plain", "Provincias-Chart.txt")
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
    var base64Str = this.myChartProvincias.toBase64Image();
    var blob = this.dataURItoBlob(base64Str);
    saveAs(blob, "Provincias-Chart.gif");
  }

  onDownloadPDF() {
    var base64Str = this.myChartProvincias.toBase64Image();

    var doc = new jsPDF("p","mm","a4");
    doc.addImage(base64Str, 'JPEG', 15, 15, 180, 100);

    var lMargin=15;
    var rMargin=15;
    var pdfInMM=350;

    var paragraphData='Datos totales: '+this.myChartProvincias.data.datasets[0].data.toString();

    var lines0 =doc.splitTextToSize(paragraphData, (pdfInMM-lMargin-rMargin));

    doc.setFontSize(9);
    doc.text(lMargin,130,lines0);

    doc.save('Provincias-Chart.pdf');

  }

  dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }

  async makeChart(sortedArray) {

    //Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    let data = [sortedArray['Territorios'][0].ConfirmadosTotal, sortedArray['Territorios'][0].ConfirmadosPCR, sortedArray['Territorios'][0].Hospitalizados, sortedArray['Territorios'][0].Fallecimientos
      , sortedArray['Territorios'][0].TotalUCI, sortedArray['Territorios'][0].Curados];

    this.myChartProvincias = new Chart("myChartProvincias", {
      type: 'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:['Contagiados',  'PCRs', 'Hospitalizados', 'Fallecidos','UCI', 'Curados'],
        datasets:[{
          label:'UCI',
          data:data,
          backgroundColor:['rgba(39, 170, 128, 0.6)','rgba(217, 32, 39, 0.6)','rgba(255, 146, 52, 0.6)','rgba(255, 205, 60, 0.6)','rgba(181, 7, 107, 0.6)','rgba(92, 42, 157, 0.6)'],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidht:3,
          hoverBorderColor:'#000'
          },
          {
            label:'UCI',
            data:data,
            backgroundColor:['rgba(39, 170, 128, 0.6)','rgba(217, 32, 39, 0.6)','rgba(255, 146, 52, 0.6)','rgba(255, 205, 60, 0.6)','rgba(181, 7, 107, 0.6)','rgba(92, 42, 157, 0.6)'],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidht:3,
            hoverBorderColor:'#000',
            type:'bar'
            }
        ]
      },
      options:{
        title:{
          display:true,
          text:'Andalucía - Datos Totales',
          fontSize:23
        },
        legend:{
          display:false,
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
            gridLines: {
              display: false,
            },
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

