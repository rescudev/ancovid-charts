const axios = require('axios');
const fs = require('fs');
 
function convertToJSONDate(strDate){
    var splitted = strDate.split("/");
    var newDate = splitted[2]+'-'+splitted[1]+'-'+splitted[0];
    return newDate;
}

function scrapResidencias(Fecha){
    fs.readFile('ResidenciasCSV/'+convertToJSONDate(Fecha)+'.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        let finalParts = [];
        let newValue = data.replace(/\s/g, '');
        newValue = newValue.split(";");
    
        for(var i = 0; i<newValue.length; i++){
            if(newValue[i] == ''){
                newValue[i] = null;
            }
        }
    
        
        // for(var j = 0; j<(newValue.length-4); j+=18){
        //Since 2020-06-02
        for(var j = 0; j<(newValue.length-4); j+=21){    
            let dataInJSON;    
            if(newValue[j+5]>-1){
                // dataInJSON = JSON.parse('{ "Residencia": "'+newValue[j+3]+'", "Poblacion": '+newValue[j+5]+', "Confirmados": '+newValue[j+8]+', "ConfirmadosPCR": '+newValue[j+11]+', "Fallecidos": '+newValue[j+14]+', "Curados": '+newValue[j+17]+', "ConfirmadosTotal": '+newValue[j+20]+'}');
                dataInJSON = JSON.parse('{ "Residencia": "'+newValue[j+3]+'", "Poblacion": '+newValue[j+5]+', "Confirmados": '+newValue[j+8]+', "ConfirmadosPCR": '+newValue[j+11]+', "ConfirmadosPCR7d": '+newValue[j+14]+', "Fallecidos": '+newValue[j+17]+', "Curados": '+newValue[j+20]+', "ConfirmadosTotal": '+newValue[j+23]+'}');
            }
            finalParts.push(dataInJSON);
        }
        let finalJSON = {"Date": convertToJSONDate(Fecha), "Fecha": Fecha, "Residencias": finalParts };
    
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
}

function scrapTerritorios(){
    fs.readFile('TerritoriosCVS/terJunio.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        let newValue = data.replace(/\s/g, '');
        newValue = newValue.split(";");
    
        for(var i = 0; i<newValue.length; i++){
            if(newValue[i] == ''){
                newValue[i] = null;
            }
        }
        console.log(newValue.length);
        //x JSON => j < (252*x)
        // for(var j = 0; j<(252*2); j+=28*9){
        // for(var j = 0; j<(newValue.length-5); j+=28*9){
        //Since June    
        for(var j = 0; j<(newValue.length-5); j+=32*9){    
            let finalParts = [];
            for(var i = 0; i<32*9; i+=32){
                let dataInJSON;    
                dataInJSON = JSON.parse('{ "Territorio": "'+newValue[j+i+5]+'", "ConfirmadosPCR": '+newValue[j+i+7]+', "ConfirmadosPCR14d": '+newValue[j+i+11]+', "ConfirmadosPCR7d": '+newValue[j+i+15]+', "Hospitalizados": '+newValue[j+i+19]+', "TotalUCI": '+newValue[j+i+23]+', "Fallecimientos": '+newValue[j+i+27]+', "Curados": '+newValue[j+i+31]+', "ConfirmadosTotal": '+newValue[j+i+35]+'}');
                finalParts.push(dataInJSON);
            }
            let finalJSON = {"Date": convertToJSONDate(newValue[j+4]), "Fecha": newValue[j+4], "Territorios": finalParts };
            console.log(finalJSON);

            axios.post('http://localhost:3000/territorio', {
                    Date: finalJSON.Date,
                    Fecha: finalJSON.Fecha,
                    Territorios: finalJSON.Territorios
            })
            .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
            })
            .catch((error) => {
            console.error(error)
            })
        }
    });
}

scrapTerritorios();
// scrapResidencias("12/06/2020");

//For terAbril.txt
// for(var j = 0; j<(newValue.length-5); j+=24*9){
//     let finalParts = [];
//     for(var i = 0; i<24*9; i+=24){
//         let dataInJSON;    
//         dataInJSON = JSON.parse('{ "Territorio": "'+newValue[j+i+5]+'", "Confirmados": '+newValue[j+i+7]+', "Hospitalizados": '+newValue[j+i+11]+', "TotalUCI": '+newValue[j+i+15]+', "Fallecimientos": '+newValue[j+i+19]+', "Curados": '+newValue[j+i+23]+', "NuevosCasos": '+newValue[j+i+27]+'}');
//         finalParts.push(dataInJSON);
//     }
//     let finalJSON = {"Date": convertToJSONDate(newValue[j+4]), "Fecha": newValue[j+4], "Territorios": finalParts };
//     console.log(finalJSON); 