const axios = require('axios');
const csvFilePath='ProvinciasCSV/cs_export.txt';
const csv=require('csvtojson');
const fs = require('fs');
 

fs.readFile('ProvinciasCSV/cs_export(3).txt', 'utf-8', function(err, data) {
    if (err) throw err;
    let finalParts = [];
    let newValue = data.replace(/\s/g, '');
    newValue = newValue.split(";");
    //(newValue.length-1)/6
    console.log((newValue.length-4)/18);
    for(var j = 0; j<(newValue.length-4); j+=18){
        let parts = [];
        for(var i=5; i<21;i+=3){
            parts.push(newValue[j+i]);
            //Montar json aquí y a mamurla!!
        }
        finalParts.push(parts);
    }
    console.log(finalParts);
    
    // fs.writeFile('index.txt', newValue, 'utf-8', function(err, data) {
    //     if (err) throw err;
    //     console.log('Done!');
    // })
})

// csv({
//     noheader:true,
//     delimiter:";",
//     headers: ["Residencia","Poblacion","ConfirmadosPCR","PCR14dias","Fallecidos","Curados","ConfirmadosTotal"],
//     includeColumns: /(Residencia|Poblacion|ConfirmadosPCR|PCR14dias|Fallecidos|Curados|ConfirmadosTotal)/,
// })
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
// 	console.log(jsonObj);
// })

// async function CSVToJson(){
//     let jsonArray=await csv({
//         delimiter:";",
//         // headers: ["Residencia","Medida","Valor"],
//         // includeColumns: /(Residencia|Medida|Valor)/,
//         checkType: true
//     }).fromFile(csvFilePath);
//     for(i=0; i<jsonArray.length;i++){
//         if(jsonArray[i].Valor == ''){
//             jsonArray[i].Valor = -1;
//         }
//     }
//     let validJSON = {"Date": "2020-05-26", "Fecha": "26/05/2020", "Residencias": jsonArray };
//     return validJSON;
// }

// async function postPCRJSON() {
//     var json = await CSVToJson();
//     axios.post('http://localhost:3000/residencia', {
//             Date: json.Date,
//             Fecha: json.Fecha,
//             Residencias: json.Residencias
//     })
//     .then((res) => {
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(res)
//     })
//     .catch((error) => {
//     console.error(error)
//     })
// }
