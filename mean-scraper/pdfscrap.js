const fs = require("fs");
const request = require("request-promise-native");
const pdf = require('pdf-parse');
const axios = require('axios');

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

// let numPDF = 100;
// for(i=0; i < 10; i++){
//     downloadPDF("https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos/Actualizacion_"+numPDF+"_COVID-19.pdf", "Gobpdfs/Actualizacion_"+numPDF+"_COVID-19.pdf");
//     numPDF++;
// }

// downloadPDF("https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos/Actualizacion_116_COVID-19.pdf", "Gobpdfs/Actualizacion_116_COVID-19.pdf");


async function getRawPDFData(pdfName){
    let dataBuffer = fs.readFileSync(pdfName);
    var rawTxt = await pdf(dataBuffer).then(function(data) {
        return data.text;   
    });
    return rawTxt;
}

async function getPDFFecha(pdfName){ 
    let rawTxt = await getRawPDFData(pdfName);
    let TxtRawFecha = rawTxt.replace(/\s/g, '');
    TxtRawFecha = TxtRawFecha.substring(TxtRawFecha.indexOf("COVID-19).")+10, TxtRawFecha.indexOf("(datos"));
    TxtRawFecha = TxtRawFecha.replace(/\./g, "/");
    console.log(TxtRawFecha);
    return TxtRawFecha;
}

async function getRawPCRData(pdfName){ 
    let rawTxt = await getRawPDFData(pdfName);
    const TxtPCRData = rawTxt.substring(rawTxt.indexOf("Confirmados por PCR"), rawTxt.indexOf("IA (14 d.): Incidencia acumulada"));
    var TxtPCRDataNoChar = TxtPCRData.replace(/\*/g, "");
    //console.log(TxtPCRDataNoChar);
    return TxtPCRDataNoChar;
}

async function getPCRDataByCommunity(Community, Next, pdfName){
    const rawPCRData = await getRawPCRData(pdfName);
    let ComPCRs = rawPCRData.substring(rawPCRData.indexOf(Community), rawPCRData.indexOf(Next));
    // console.log(comDataToJSON(ComPCRs));
    if(Community == "ESPAÑA"){
        ComPCRs = rawPCRData.substring(rawPCRData.indexOf(Community), rawPCRData.length);
    }
    let ComInJSON = comDataToJSON(ComPCRs, Community);
    return ComInJSON;

}

function comDataToJSON(strCom, Community){
    var strCom = strCom.replace(Community, Community.replace(/\s/g, "_"));
    strCom = strCom.replace(/\s/g, "\/");
    strCom = strCom.replace(/\/\//g, "-");
    strCom = strCom.replace(/\//g, "-");
    var splitted = strCom.split("-");
    //var formatedCom = splitted[0]+'-'+splitted[1]+'-'+splitted[2]+'-'+splitted[3]+'-'+splitted[4];
    var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Total": '+splitted[1].replace(".", "")+', "Nuevos": '+splitted[2]+', "Incremento": "'+splitted[3]+'", "IA": "'+splitted[4]+'"}');
    //console.log(dataInJSON);
    return dataInJSON;
}

function convertToJSONDate(strDate){
        var splitted = strDate.split("/");
        var newDate = splitted[2]+'-'+splitted[1]+'-'+splitted[0];
        return newDate;
}

async function postPCRJSON(pdfName) {
    var json = await getFullPCRJson(pdfName);
    axios.post('http://localhost:3000/pcr', {
            Date: json.Date,
            Fecha: json.Fecha,
            CCAAs: json.CCAAs
    })
    .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
    })
    .catch((error) => {
    console.error(error)
    })
}


async function getFullPCRJson(pdfName){
    let CCAAs = ["Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla La Mancha", "Castilla y León", "Cataluña", "Ceuta", "C. Valenciana", "Extremadura",
                "Galicia", "Madrid", "Melilla", "Murcia", "Navarra", "País Vasco", "La Rioja", "ESPAÑA"];
    let Fecha = await getPDFFecha(pdfName);
    
    let jsonArray = [await getPCRDataByCommunity("ESPAÑA", "" , pdfName)];
    //finalJSON.push([await getPCRDataByCommunity("ESPAÑA", "")]);
    for(i = 0; i < CCAAs.length-1; i++){
        let comJson = await getPCRDataByCommunity(CCAAs[i], CCAAs[i+1], pdfName);
        jsonArray.push(comJson);
    
    }
    let finalJSON = {"Date": await convertToJSONDate(Fecha), "Fecha": Fecha, "CCAAs": jsonArray };
    console.log(finalJSON);
    return finalJSON;
}                

// for(i = 30; i < 116; i++){
//     postPCRJSON('Gobpdfs/Actualizacion_'+i+'_COVID-19.pdf');
// }

//PROBLEMAS: 112, 92-102, >88
postPCRJSON('Gobpdfs/Actualizacion_86_COVID-19.pdf');

//postPCRJSON('Gobpdfs/Actualizacion_100_COVID-19.pdf');

//getFullPCRJson();

//getPDFFecha();

//getPCRDataByCommunity("ESPAÑA", "");

// getPCRDataByCommunity("Andalucía", "Aragón");
// getPCRDataByCommunity("Aragón", "Asturias");
// getPCRDataByCommunity("Asturias", "Baleares");
// getPCRDataByCommunity("Baleares", "Canarias");
// getPCRDataByCommunity("Canarias", "Cantabria");
// getPCRDataByCommunity("Cantabria", "Castilla La Mancha");
// getPCRDataByCommunity("Castilla La Mancha", "Castilla y León");
// getPCRDataByCommunity("Castilla y León", "Cataluña");
// getPCRDataByCommunity("Cataluña", "Ceuta");
// getPCRDataByCommunity("Ceuta", "C. Valenciana");
// getPCRDataByCommunity("C. Valenciana", "Extremadura");
// getPCRDataByCommunity("Extremadura", "Galicia");
// getPCRDataByCommunity("Galicia", "Madrid");
// getPCRDataByCommunity("Madrid", "Melilla");
// getPCRDataByCommunity("Melilla", "Murcia");
// getPCRDataByCommunity("Murcia", "Navarra");
// getPCRDataByCommunity("Navarra", "País Vasco");
// getPCRDataByCommunity("País Vasco", "La Rioja");
// getPCRDataByCommunity("La Rioja", "ESPAÑA");

// Andalucía
// 12.600 3 0,02% 3,96
// Aragón
// 5.646 19 0,34% 25,01
// Asturias
// 2.397 2 0,08% 3,13
// Baleares
// 2.041 2 0,10% 8,26
// Canarias
// 2.322 1 0,04% 2,97
// Cantabria
// 2.289 2 0,09% 7,74
// Castilla La Mancha
// 16.889 34 0,20% 26,86
// Castilla y León
// 18.789 52 0,28% 34,88
// Cataluña
// 57.148 52 0,09% 19,71
// Ceuta
// 124 0 0,00% 16,51
// C. Valenciana
// 11.073 22 0,20% 6,06
// Extremadura
// 3.047 0 0,00% 4,31
// Galicia
// 9.105 7 0,08% 4,59
// Madrid
// 67.871 26 0,04% 29,22
// Melilla
// 121 0 0,00% 2,31
// Murcia
// 1.579
// 1
// 0,13% 4,48
// Navarra
// 5.219 14 0,27% 25,53
// País Vasco
// 13.476 9 0,07% 11,82
// La Rioja
// 4.036 0 0,00% 8,84
// ESPAÑA
// 235.772 246 0,10% 14,36



