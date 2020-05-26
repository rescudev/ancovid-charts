const fs = require("fs");
const request = require("request-promise-native");

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

downloadPDF("https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov-China/documentos/Actualizacion_116_COVID-19.pdf", "Gobpdfs/Actualizacion_116_COVID-19.pdf");