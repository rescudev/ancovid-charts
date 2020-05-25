const puppeteer = require('puppeteer');

async function scrapeWeb(url) {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        await page.goto(url);

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

        var reAlmeria = addComunidad(rawTxtNoSpaces, 'Almería', 'AL', ',Cádiz');
        var reCadiz = addComunidad(rawTxtNoSpaces, 'Cádiz', 'CA', ',Córdoba');
        var reCordoba = addComunidad(rawTxtNoSpaces, 'Córdoba', 'CO', ',Granada');
        var reGranada = addComunidad(rawTxtNoSpaces, 'Granada', 'GR', ',Huelva');
        var reHuelva = addComunidad(rawTxtNoSpaces, 'Huelva', 'HU', ',Jaén');
        var reJaen = addComunidad(rawTxtNoSpaces, 'Jaén', 'JA', ',Málaga');
        var reMalaga = addComunidad(rawTxtNoSpaces, 'Málaga', 'MA', 'ySevilla');
        var reSevilla = addComunidad(rawTxtNoSpaces, 'Sevilla', 'SE', '.');

        var obj = JSON.parse('{ "Fecha": "'+reFecha+'", '+reAlmeria+', '+reCadiz+', '+reCordoba+', '+reGranada+', '+reHuelva+', '+reJaen+', '+reMalaga+', '+reSevilla+'}');
        
        console.log({obj});
        await browser.close();
}

function addComunidad(rawTxt, comunidad, siglas, siguiente) {
        const soloCom = rawTxt.substring(rawTxt.indexOf(comunidad), rawTxt.indexOf(siguiente));
        const Hosp = soloCom.substring(soloCom.lastIndexOf(comunidad)+comunidad.length+1, soloCom.indexOf('hos'));
        const UCI = soloCom.substring(soloCom.indexOf('que')+3, soloCom.indexOf('enUCI'));
        var res = '"'+siglas+'Hosp": '+Hosp+ ', "'+siglas+'UCI":'+UCI;

        return res;
}    

scrapeWeb('https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236172.html');
scrapeWeb('https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236181.html');
scrapeWeb('https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236254.html');
scrapeWeb('https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236338.html');
scrapeWeb('https://www.juntadeandalucia.es/organismos/saludyfamilias/actualidad/noticias/detalle/236457.html');