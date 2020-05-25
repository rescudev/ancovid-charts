const puppeteer = require('puppeteer');
const axios = require('axios');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function scrapePrevalencia(url) {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        await page.goto(url);

        const [el1] = await page.$x('//*[@id="cuerpo"]/div[1]/div[2]/p[1]');
        const txtAn = await el1.getProperty('textContent');
        const rawTxtAn = await txtAn.jsonValue();
        const rawTxtAnNoSpaces = rawTxtAn.replace(/\s/g,'');

        const [el2] = await page.$x('//*[@id="cuerpo"]/div[1]/div[2]/p[3]');
        const txt = await el2.getProperty('textContent');
        const rawTxt = await txt.jsonValue();
        const rawTxtNoSpaces = rawTxt.replace(/\s/g,'');

        const [el3] = await page.$x('//*[@id="cuerpo"]/div[1]/p[2]');
        const fecha = await el3.getProperty('textContent');
        const rawFecha = await fecha.jsonValue();
        const rawfechaNoSpaces = rawFecha.replace(/\s/g,'');

        console.log({rawTxt, rawFecha});

        var reFecha = rawfechaNoSpaces.substring(rawfechaNoSpaces.indexOf('Andalucía,')+10, rawfechaNoSpaces.length);

        var ANHosp = rawTxtAnNoSpaces.substring(rawTxtAnNoSpaces.indexOf('actualmente,')+12, rawTxtAnNoSpaces.indexOf('pacientes'));
        var ANUCI = rawTxtAnNoSpaces.substring(rawTxtAnNoSpaces.indexOf('delosque')+8, rawTxtAnNoSpaces.indexOf('seencuentran'));

        var reAlmeria = addComunidad(rawTxtNoSpaces, 'Almería', 'AL', ',Cádiz');
        var reCadiz = addComunidad(rawTxtNoSpaces, 'Cádiz', 'CA', ',Córdoba');
        var reCordoba = addComunidad(rawTxtNoSpaces, 'Córdoba', 'CO', ',Granada');
        var reGranada = addComunidad(rawTxtNoSpaces, 'Granada', 'GR', ',Huelva');
        var reHuelva = addComunidad(rawTxtNoSpaces, 'Huelva', 'HU', ',Jaén');
        var reJaen = addComunidad(rawTxtNoSpaces, 'Jaén', 'JA', ',Málaga');
        var reMalaga = addComunidad(rawTxtNoSpaces, 'Málaga', 'MA', 'ySevilla');
        var reSevilla = addComunidad(rawTxtNoSpaces, 'Sevilla', 'SE', '.');

        var obj = JSON.parse('{ "Fecha": "'+reFecha+'", "ANHosp": '+ANHosp+', "ANUCI": '+ANUCI+', '+reAlmeria+', '+reCadiz+', '+reCordoba+', '+reGranada+', '+reHuelva+', '+reJaen+', '+reMalaga+', '+reSevilla+'}');
        
        console.log({obj});
        await browser.close();

        return obj;
}

function addComunidad(rawTxt, comunidad, siglas, siguiente) {
        const soloCom = rawTxt.substring(rawTxt.indexOf(comunidad), rawTxt.indexOf(siguiente));
        const Hosp = soloCom.substring(soloCom.lastIndexOf(comunidad)+comunidad.length+1, soloCom.indexOf('hos'));
        const UCI = soloCom.substring(soloCom.indexOf('que')+3, soloCom.indexOf('enUCI'));
        var res = '"'+siglas+'Hosp": '+Hosp+ ', "'+siglas+'UCI":'+UCI;

        return res;
}    

async function postPrevalenciaJSON(url) {
        var json = await scrapePrevalencia(url);
        axios.post('http://localhost:3000/prevalencia', {
                Fecha: json.Fecha,
                ANHosp: json.ANHosp,
                ANUCI: json.ANUCI,
                ALHosp: json.ALHosp,
                ALUCI: json.ALUCI,
                CAHosp: json.CAHosp,
                CAUCI: json.CAUCI,
                COHosp: json.COHosp,
                COUCI: json.COUCI,
                GRHosp: json.GRHosp,
                GRUCI: json.GRUCI,
                HUHosp: json.HUHosp,
                HUUCI: json.HUUCI,
                JAHosp: json.JAHosp,
                JAUCI: json.JAUCI,
                MAHosp: json.MAHosp,
                MAUCI: json.MAUCI,
                SEHosp: json.SEHosp,
                SEUCI: json.SEUCI
        })
        .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
        })
        .catch((error) => {
        console.error(error)
        })
}

var prevURL_16_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236172.html';
var prevURL_17_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236181.html';
var prevURL_18_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236254.html';
var prevURL_19_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236338.html';
var prevURL_20_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236457.html';

var prevURL_21_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236522.html';
var prevURL_22_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236605.html';
var prevURL_23_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236622.html';
var prevURL_24_05 = 'https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236629.html';

postPrevalenciaJSON(prevURL_21_05);
postPrevalenciaJSON(prevURL_22_05);
postPrevalenciaJSON(prevURL_23_05);
postPrevalenciaJSON(prevURL_24_05);



