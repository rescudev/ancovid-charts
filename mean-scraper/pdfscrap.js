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

async function getRawPCRData(pdfName){ 
    let rawTxt = await getRawPDFData(pdfName);
    // Valid for 103-115 and 89-91
    // const TxtPCRData = rawTxt.substring(rawTxt.indexOf("Confirmados por PCR"), rawTxt.indexOf("IA (14 d.): Incidencia acumulada"));
    // Valid for 85-102 except (89-91)
    // const TxtPCRData = rawTxt.substring(rawTxt.indexOf("Confirmados por PCR"), rawTxt.indexOf("La Rioja")+150);
    // Valid from 116
    const TxtPCRData = rawTxt.substring(rawTxt.indexOf("Andalucía")-100, rawTxt.indexOf("La Rioja")+150);

    var TxtPCRDataNoChar = TxtPCRData.replace(/\*/g, "");
    // console.log(TxtPCRDataNoChar);
    return TxtPCRDataNoChar;
}

function comDataToJSON(strCom, Community){
    var strCom = strCom.replace(Community, Community.replace(/\s/g, "_"));
    strCom = strCom.replace(/-/g, "null"); //CCAAs with no data that day
    strCom = strCom.replace(/\s/g, "\/");
    strCom = strCom.replace(/\/\//g, "-");
    strCom = strCom.replace(/\//g, "-");
    var splitted = strCom.split("-");
    //var formatedCom = splitted[0]+'-'+splitted[1]+'-'+splitted[2]+'-'+splitted[3]+'-'+splitted[4];
    //Valid for less than 116
    // var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Total": '+splitted[1].replace(".", "")+', "Nuevos": '+splitted[2]+', "Incremento": "'+splitted[3]+'", "IA": "'+splitted[4]+'"}');
    //116 and on there is no "Incremento" in pdfs
    var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Total": '+splitted[1].replace(".", "")+', "Nuevos": '+splitted[2]+', "IA": "'+splitted[4]+'"}');
    //console.log(dataInJSON);
    return dataInJSON;
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

function convertToJSONDate(strDate){
    var splitted = strDate.split("/");
    var newDate = splitted[2]+'-'+splitted[1]+'-'+splitted[0];
    return newDate;
}

async function getPDFFecha(pdfName){ 
    let rawTxt = await getRawPDFData(pdfName);
    let TxtRawFecha = rawTxt.replace(/\s/g, '');
    TxtRawFecha = TxtRawFecha.substring(TxtRawFecha.indexOf("COVID-19).")+10, TxtRawFecha.indexOf("(datos"));
    TxtRawFecha = TxtRawFecha.replace(/\./g, "/");
    //console.log(TxtRawFecha);
    return TxtRawFecha;
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

postPCRJSON('Gobpdfs/Actualizacion_117_COVID-19.pdf');





