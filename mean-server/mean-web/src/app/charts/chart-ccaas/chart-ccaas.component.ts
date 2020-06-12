import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataApiService} from 'src/app/services/data-api.service';
import * as jsPDF from 'jspdf'

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
  accFirstTime = true;
  selectedValue: string;
  CCAAs: ccaa[] = [
    {nombre: 'Andalucía',sigla: 'AND', pos: 1},
    {nombre: 'Aragón',sigla: 'ARA', pos: 2},
    {nombre: 'Asturias',sigla: 'AST', pos: 3},
    {nombre: 'Baleares',sigla: 'BAL', pos: 4},
    {nombre: 'Canarias',sigla: 'CAN', pos: 5},
    {nombre: 'Cantabria',sigla: 'CNT', pos: 6},
    {nombre: 'Castilla La Mancha',sigla: 'CLM', pos: 7},
    {nombre: 'Castilla y León',sigla: 'CYL', pos: 8},
    {nombre: 'Cataluña',sigla: 'CAT', pos: 9},
    {nombre: 'Ceuta',sigla: 'CEU', pos: 10},
    {nombre: 'C.Valenciana',sigla: 'VAL', pos: 11},
    {nombre: 'Extremadura',sigla: 'EXT', pos: 12},
    {nombre: 'Galicia',sigla: 'GAL', pos: 13},
    {nombre: 'Madrid',sigla: 'MAD', pos: 14},
    {nombre: 'Melilla',sigla: 'MEL', pos: 15},
    {nombre: 'Murcia',sigla: 'MUR', pos: 16},
    {nombre: 'Navarra',sigla: 'NAV', pos: 17},
    {nombre: 'País Vasco',sigla: 'PVA', pos: 18},
    {nombre: 'La Rioja',sigla: 'RIO', pos: 19}
  ];

  ngOnInit() {
    this.dataApi.getHospitalizados().subscribe((arrayHosp) => {
      this.dataApi.getLastDate().subscribe((lastDate) => {
        let ccaas = ['Andalucía','Aragón','Asturias','Baleares','Canarias'];
        let initialHosp=[], initialFall=[], initialUCI=[];
        let indexDay = arrayHosp['Fechas'].indexOf(lastDate['Fecha'].replace(/-/g, '/'));
        for(let i=0; i<5;i++){
          initialHosp[i] = arrayHosp[this.CCAAs[i].sigla].Hospitalizados[indexDay];
          initialFall[i] = arrayHosp[this.CCAAs[i].sigla].Fallecidos[indexDay];
          initialUCI[i] = arrayHosp[this.CCAAs[i].sigla].UCI[indexDay];
        }
        this.makeChart(ccaas, initialHosp, initialFall, initialUCI);
      });
    });
  }

  changeProvincia(ccaas) {
    if(ccaas.length==1 && this.accFirstTime){
      this.accFirstTime=false;
      this.myChartCCAAs.destroy();
      this.makeChart([], [], [], []);
    }
    this.dataApi.getHospitalizados().subscribe((arrayHosp) => {
      this.dataApi.getLastDate().subscribe((lastDate) => {
        let indexDay = arrayHosp['Fechas'].indexOf(lastDate['Fecha'].replace(/-/g, '/'));

        if(this.myChartCCAAs.data.labels.length < ccaas.length){
          let nuevaCCAA = ccaas.filter(x => !this.myChartCCAAs.data.labels.includes(x));
          let nuevaSIG;
          for(var key in this.CCAAs){
            if(this.CCAAs[key].nombre == nuevaCCAA){
              nuevaSIG = this.CCAAs[key].sigla;
            }
          }
          this.myChartCCAAs.data.datasets[0].data.splice(ccaas.indexOf(nuevaCCAA.toString()), 0, arrayHosp[nuevaSIG].Hospitalizados[indexDay]);
          this.myChartCCAAs.data.datasets[1].data.splice(ccaas.indexOf(nuevaCCAA.toString()), 0, arrayHosp[nuevaSIG].Fallecidos[indexDay]);
          this.myChartCCAAs.data.datasets[2].data.splice(ccaas.indexOf(nuevaCCAA.toString()), 0, arrayHosp[nuevaSIG].UCI[indexDay]);

        }else if(this.myChartCCAAs.data.labels.length > ccaas.length){
          let viejaCCAA = this.myChartCCAAs.data.labels.filter(x => !ccaas.includes(x));
          console.log(viejaCCAA);
          let aux = this.myChartCCAAs.data.labels.indexOf(viejaCCAA.toString());
          this.myChartCCAAs.data.datasets[0].data.splice(aux,1);
          this.myChartCCAAs.data.datasets[1].data.splice(aux,1);
          this.myChartCCAAs.data.datasets[2].data.splice(aux,1);
        }

        this.myChartCCAAs.data.labels = ccaas;
        this.myChartCCAAs.update();

      });
    });
  }

  onDownloadJsonTxt(){
    this.dataApi.getProvincias().subscribe((provs) => {
      this.downloadString(provs, "text/plain", "CCAAs-Chart.txt")
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
    var base64Str = this.myChartCCAAs.toBase64Image();
    var blob = this.dataURItoBlob(base64Str);
    saveAs(blob, "CCAAs-Chart.gif");
  }

  onDownloadPDF() {
    var base64Str = this.myChartCCAAs.toBase64Image();

    var doc = new jsPDF("p","mm","a4");
    doc.addImage(base64Str, 'JPEG', 15, 15, 180, 100);

    var lMargin=15;
    var rMargin=15;
    var pdfInMM=350;

    var paragraphCCAAs='CCAAs: '+this.myChartCCAAs.data.labels.toString();
    var paragraphHosp='Hospitalizados: '+this.myChartCCAAs.data.datasets[0].data.toString();
    var paragraphFall='Fallecidos: '+this.myChartCCAAs.data.datasets[1].data.toString();
    var paragraphUCI='UCI: '+this.myChartCCAAs.data.datasets[2].data.toString();

    var lines0 =doc.splitTextToSize(paragraphCCAAs, (pdfInMM-lMargin-rMargin));
    var lines1 =doc.splitTextToSize(paragraphHosp, (pdfInMM-lMargin-rMargin));
    var lines2 =doc.splitTextToSize(paragraphFall, (pdfInMM-lMargin-rMargin));
    var lines3 =doc.splitTextToSize(paragraphUCI, (pdfInMM-lMargin-rMargin));

    doc.setFontSize(9);

    doc.text(lMargin,135,lines0);
    doc.text(lMargin,150,lines1);
    doc.text(lMargin,165,lines2);
    doc.text(lMargin,180,lines3);

    doc.save('CCAAs-Chart.pdf');

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

  async makeChart(initialCCAAs, initialHosp, initialFall, initialUCI) {

    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.defaultFontColor = '#777';

    this.myChartCCAAs = new Chart("myChartCCAAs", {
      type: 'radar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels: initialCCAAs,
        datasets: [{
          label: "Hospitalizados",
          backgroundColor: "rgba(92, 184, 92,0.2)",
          data: initialHosp
        },
        {
          label: "Fallecidos",
          backgroundColor: "rgba(0,0,200,0.3)",
          data: initialFall
        },
        {
          label: "UCI",
          backgroundColor: "rgba(200,0,0,0.4)",
          data: initialUCI
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

