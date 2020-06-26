const fs = require("fs");
const request = require("request-promise-native");
const pdf = require('pdf-parse');
const axios = require('axios');

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log("Writing downloaded PDF file to " + outputFilename + "...");
    fs.writeFileSync(outputFilename, pdfBuffer);
}

async function getRawPDFData(pdfName){
    let dataBuffer = fs.readFileSync(pdfName);
    var rawTxt = await pdf(dataBuffer).then(function(data) {
        // console.log(data.text);
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
    const TxtPCRData = rawTxt.substring(rawTxt.indexOf("Andalucía")-100, rawTxt.indexOf("Andalucía")+1800);

    var TxtPCRDataNoChar = TxtPCRData.replace(/\*/g, "");
    var TxtPCRDataNoChar = TxtPCRData.replace(/(\r\n|\n|\r)/gm,"-");
    var TxtPCRDataNoChar = TxtPCRData.replace(/\s\s+/g, ' ');
    // console.log(TxtPCRDataNoChar);
    return TxtPCRDataNoChar;
}

async function getRawHospData(pdfName){ 
    let rawTxt = await getRawPDFData(pdfName);
    const TxtPCRData = rawTxt.substring(rawTxt.indexOf("hospitalización"), rawTxt.indexOf("hospitalización")+1800);

    var TxtPCRDataNoChar = TxtPCRData.replace(/\*/g, "");
    var TxtPCRDataNoChar = TxtPCRData.replace(/(\r\n|\n|\r)/gm,"-");
    var TxtPCRDataNoChar = TxtPCRData.replace(/\s\s+/g, ' ');
    // console.log(TxtPCRDataNoChar);
    return TxtPCRDataNoChar;
}

function comDataToJSON(strCom, Community, dataType){
    var strCom = strCom.replace(Community, Community.replace(/\s/g, "_"));
    strCom = strCom.replace(/-/g, "null"); //CCAAs with no data that day
    strCom = strCom.replace(/¥/g, "null");
    strCom = strCom.replace(/\*/g, "");
    strCom = strCom.replace(/\s/g, "\/");
    if(Community != "ESPAÑA"){
        strCom = strCom.replace(/\/\/\//g, "-");
    }
    strCom = strCom.replace(/\/\//g, "-");
    strCom = strCom.replace(/\//g, "-");
    if(Community != "ESPAÑA" && Community != "Madrid"){
        strCom = strCom.replace(/--/g, "-");
    }    
    var splitted = strCom.split("-");

    //FOR PCR DATA
    //var formatedCom = splitted[0]+'-'+splitted[1]+'-'+splitted[2]+'-'+splitted[3]+'-'+splitted[4];
    //Valid for less than 116
    // var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Total": '+splitted[1].replace(".", "")+', "Nuevos": '+splitted[2]+', "Incremento": "'+splitted[3]+'", "IA": "'+splitted[4]+'"}');
    //116 and on there is no "Incremento" in pdfs
    if(Community == "ESPAÑA"){
        for(i=0; i<6; i++){
            if(splitted[i] == ''){
                splitted[i] = 'null';
            }
        }
    }
    
    if(dataType == 'pcr'){
        var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Total": '+splitted[1].replace(".", "")+', "Nuevos": '+splitted[2]+', "IA": "'+splitted[4]+'"}');
    }else if(dataType == 'hosp'){
        //Before 116
        //var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Hospitalizados": '+splitted[1].replace(".", "")+', "NuevosHosp": '+splitted[2].replace(".", "")+', "UCI": '+splitted[3].replace(".", "")+', "NuevosUCI": '+splitted[4].replace(".", "")+', "Fallecidos": '+splitted[5].replace(".", "")+', "NuevosFallecidos": '+splitted[6].replace(".", "")+'}');
        //After 115
        var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Hospitalizados": '+splitted[1].replace(".", "")+', "Hosp7d": '+splitted[2].replace(".", "")+', "UCI": '+splitted[3].replace(".", "")+', "UCI7d": '+splitted[4].replace(".", "")+', "Fallecidos": '+splitted[5].replace(".", "")+', "Fallecidos7d": '+splitted[6].replace(".", "")+'}');
    }
    

    //FOR HOSP DATA
    //  var formatedCom = splitted[0]+'-'+splitted[1]+'-'+splitted[2]+'-'+splitted[3]+'-'+splitted[4]+'-'+splitted[5]+'-'+splitted[6];
    // var dataInJSON = JSON.parse('{ "CCAA": "'+splitted[0]+'", "Hospitalizados": '+splitted[1].replace(".", "")+', "NuevosHosp": '+splitted[2].replace(".", "")+', "UCI": '+splitted[3].replace(".", "")+', "NuevosUCI": '+splitted[4].replace(".", "")+', "Fallecidos": '+splitted[5].replace(".", "")+', "NuevosFallecidos": '+splitted[6].replace(".", "")+'}');

    // console.log(dataInJSON);
    // console.log(formatedCom);
    return dataInJSON;
}

async function getPCRDataByCommunity(Community, Next, pdfName, dataType){
    let rawPCRData;
    if(dataType == 'pcr'){
        rawPCRData = await getRawPCRData(pdfName);
    }else if(dataType == 'hosp'){
        rawPCRData = await getRawHospData(pdfName);
    }
    
    let ComPCRs = rawPCRData.substring(rawPCRData.indexOf(Community), rawPCRData.indexOf(Next));
    // console.log(comDataToJSON(ComPCRs));
    if(Community == "ESPAÑA"){
        ComPCRs = rawPCRData.substring(rawPCRData.indexOf(Community), rawPCRData.length);
    }
    let ComInJSON = await comDataToJSON(ComPCRs, Community, dataType);
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
    // console.log(TxtRawFecha);
    return TxtRawFecha;
}

async function getFullPCRJson(pdfName, dataType){
    let CCAAs = ["Andalucía", "Aragón", "Asturias", "Baleares", "Canarias", "Cantabria", "Castilla La Mancha", "Castilla y León", "Cataluña", "Ceuta", "C. Valenciana", "Extremadura",
                "Galicia", "Madrid", "Melilla", "Murcia", "Navarra", "País Vasco", "La Rioja", "ESPAÑA"];
    let Fecha = await getPDFFecha(pdfName);
    
    let jsonArray = [await getPCRDataByCommunity("ESPAÑA", "" , pdfName, dataType)];
    for(i = 0; i < CCAAs.length-1; i++){
        let comJson = await getPCRDataByCommunity(CCAAs[i], CCAAs[i+1], pdfName, dataType);
        jsonArray.push(comJson);
    
    }
    let finalJSON = {"Date": await convertToJSONDate(Fecha), "Fecha": Fecha, "CCAAs": jsonArray };
    console.log(finalJSON);
    return finalJSON;
}                

async function postPCRJSON(pdfName, dataType, postURL) {
    var json = await getFullPCRJson(pdfName, dataType);
    axios.post(postURL, {
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

downloadPDF("https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos/Actualizacion_148_COVID-19.pdf", "Gobpdfs/Actualizacion_148_COVID-19.pdf");
// postPCRJSON('Gobpdfs/Actualizacion_148_COVID-19.pdf', 'hosp', 'http://localhost:3000/hospitalizado');
// postPCRJSON('Gobpdfs/Actualizacion_148_COVID-19.pdf', 'pcr', 'http://localhost:3000/pcr');






