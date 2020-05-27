const axios = require('axios');
const csvFilePath='ProvinciasCSV/27-05-2020.txt';
const csv=require('csvtojson');
const fs = require('fs');
 

fs.readFile(csvFilePath, 'utf-8', function(err, data) {
    if (err) throw err;
    let finalParts = [];
    let newValue = data.replace(/\s/g, '');
    newValue = newValue.split(";");

    for(var i = 0; i<newValue.length; i++){
        if(newValue[i] == ''){
            newValue[i] = null;
        }
    }

    for(var j = 0; j<(newValue.length-4); j+=18){
        let dataInJSON;    
        if(newValue[j+5]>-1){
            dataInJSON = JSON.parse('{ "Residencia": "'+newValue[j+3]+'", "Poblacion": '+newValue[j+5]+', "Confirmados": '+newValue[j+8]+', "ConfirmadosPCR": '+newValue[j+11]+', "Fallecidos": '+newValue[j+14]+', "Curados": '+newValue[j+17]+', "ConfirmadosTotal": '+newValue[j+20]+'}');
        }
        finalParts.push(dataInJSON);
    }
    let finalJSON = {"Date": "2020-05-27", "Fecha": "27/05/2020", "Residencias": finalParts };
    axios.post('http://localhost:3000/residencia', {
                Date: finalJSON.Date,
                Fecha: finalJSON.Fecha,
                Residencias: finalJSON.Residencias
    })
    .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res)
    })
    .catch((error) => {
    console.error(error)
    })
    console.log(finalParts);
});
