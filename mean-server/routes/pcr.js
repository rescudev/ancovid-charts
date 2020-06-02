const express = require('express');
const router = express.Router();
const PCR = require('../models/PCR');

//get all pcrs
router.get('/', async (req, res) => {
    try{
        const pcrs = await PCR.find().sort({Date:1});
        res.json(pcrs);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/chart', async (req, res) => {
    try{
        const pcrs = await PCR.find().sort({Date:1});
        let pcrsChart={};
        let ESP={}, AND={}, ARA={}, AST={}, BAL={}, CAN={}, CNT={}, CLM={}, CYL={}, CAT={}, CEU={}, VAL={}, EXT={}, GAL={}, MAD={}, MEL={}, MUR={}, NAV={}, PVA={}, RIO={};
        let Fechas=[], ESPtotal=[], ESPnuevos=[], ESPia=[], ANDtotal=[], ANDnuevos=[], ANDia=[], ARAtotal=[], ARAnuevos=[], ARAia=[], ASTtotal=[], ASTnuevos=[], ASTia=[]
        , BALtotal=[], BALnuevos=[], BALia=[], CANtotal=[], CANnuevos=[], CANia=[], CNTtotal=[], CNTnuevos=[], CNTia=[], CLMtotal=[], CLMnuevos=[], CLMia=[]
        , CYLtotal=[], CYLnuevos=[], CYLia=[], CATtotal=[], CATnuevos=[], CATia=[], CEUtotal=[], CEUnuevos=[], CEUia=[], VALtotal=[], VALnuevos=[], VALia=[]
        , EXTtotal=[], EXTnuevos=[], EXTia=[], GALtotal=[], GALnuevos=[], GALia=[], MADtotal=[], MADnuevos=[], MADia=[], MELtotal=[], MELnuevos=[], MELia=[]
        , MURtotal=[], MURnuevos=[], MURia=[], NAVtotal=[], NAVnuevos=[], NAVia=[], PVAtotal=[], PVAnuevos=[], PVAia=[], RIOtotal=[], RIOnuevos=[], RIOia=[];

        for(var key in pcrs){
            Fechas.push(pcrs[key].Fecha);
            ESPtotal.push(pcrs[key].CCAAs[0].Total), ESPnuevos.push(pcrs[key].CCAAs[0].Nuevos), ESPia.push(pcrs[key].CCAAs[0].IA);
            ANDtotal.push(pcrs[key].CCAAs[1].Total), ANDnuevos.push(pcrs[key].CCAAs[1].Nuevos), ANDia.push(pcrs[key].CCAAs[1].IA);
            ARAtotal.push(pcrs[key].CCAAs[2].Total), ARAnuevos.push(pcrs[key].CCAAs[2].Nuevos), ARAia.push(pcrs[key].CCAAs[2].IA);
            ASTtotal.push(pcrs[key].CCAAs[3].Total), ASTnuevos.push(pcrs[key].CCAAs[3].Nuevos), ASTia.push(pcrs[key].CCAAs[3].IA);
            BALtotal.push(pcrs[key].CCAAs[4].Total), BALnuevos.push(pcrs[key].CCAAs[4].Nuevos), BALia.push(pcrs[key].CCAAs[4].IA);
            CANtotal.push(pcrs[key].CCAAs[5].Total), CANnuevos.push(pcrs[key].CCAAs[5].Nuevos), CANia.push(pcrs[key].CCAAs[5].IA);
            CNTtotal.push(pcrs[key].CCAAs[6].Total), CNTnuevos.push(pcrs[key].CCAAs[6].Nuevos), CNTia.push(pcrs[key].CCAAs[6].IA);
            CLMtotal.push(pcrs[key].CCAAs[7].Total), CLMnuevos.push(pcrs[key].CCAAs[7].Nuevos), CLMia.push(pcrs[key].CCAAs[7].IA);
            CYLtotal.push(pcrs[key].CCAAs[8].Total), CYLnuevos.push(pcrs[key].CCAAs[8].Nuevos), CYLia.push(pcrs[key].CCAAs[8].IA);
            CATtotal.push(pcrs[key].CCAAs[9].Total), CATnuevos.push(pcrs[key].CCAAs[9].Nuevos), CATia.push(pcrs[key].CCAAs[9].IA);
            CEUtotal.push(pcrs[key].CCAAs[11].Total), CEUnuevos.push(pcrs[key].CCAAs[10].Nuevos), CEUia.push(pcrs[key].CCAAs[10].IA);
            VALtotal.push(pcrs[key].CCAAs[11].Total), VALnuevos.push(pcrs[key].CCAAs[11].Nuevos), VALia.push(pcrs[key].CCAAs[11].IA);
            EXTtotal.push(pcrs[key].CCAAs[12].Total), EXTnuevos.push(pcrs[key].CCAAs[12].Nuevos), EXTia.push(pcrs[key].CCAAs[12].IA);
            GALtotal.push(pcrs[key].CCAAs[13].Total), GALnuevos.push(pcrs[key].CCAAs[13].Nuevos), GALia.push(pcrs[key].CCAAs[13].IA);
            MADtotal.push(pcrs[key].CCAAs[14].Total), MADnuevos.push(pcrs[key].CCAAs[14].Nuevos), MADia.push(pcrs[key].CCAAs[14].IA);
            MELtotal.push(pcrs[key].CCAAs[15].Total), MELnuevos.push(pcrs[key].CCAAs[15].Nuevos), MELia.push(pcrs[key].CCAAs[15].IA);
            MURtotal.push(pcrs[key].CCAAs[16].Total), MURnuevos.push(pcrs[key].CCAAs[16].Nuevos), MURia.push(pcrs[key].CCAAs[16].IA);
            NAVtotal.push(pcrs[key].CCAAs[17].Total), NAVnuevos.push(pcrs[key].CCAAs[17].Nuevos), NAVia.push(pcrs[key].CCAAs[17].IA);
            PVAtotal.push(pcrs[key].CCAAs[18].Total), PVAnuevos.push(pcrs[key].CCAAs[18].Nuevos), PVAia.push(pcrs[key].CCAAs[18].IA);
            RIOtotal.push(pcrs[key].CCAAs[19].Total), RIOnuevos.push(pcrs[key].CCAAs[19].Nuevos), RIOia.push(pcrs[key].CCAAs[19].IA);
        }

        ESP["Total"]=ESPtotal, ESP["Nuevos"]=ESPnuevos, ESP["IA"]=ESPia, AND["Total"]=ANDtotal, AND["Nuevos"]=ANDnuevos, AND["IA"]=ANDia, ARA["Total"]=ARAtotal, ARA["Nuevos"]=ARAnuevos, ARA["IA"]=ARAia
        , AST["Total"]=ASTtotal, AST["Nuevos"]=ASTnuevos, AST["IA"]=ASTia, BAL["Total"]=BALtotal, BAL["Nuevos"]=BALnuevos, BAL["IA"]=BALia, CAN["Total"]=CANtotal, CAN["Nuevos"]=CANnuevos, CAN["IA"]=CANia
        , CNT["Total"]=CNTtotal, CNT["Nuevos"]=CNTnuevos, CNT["IA"]=CNTia, CLM["Total"]=CLMtotal, CLM["Nuevos"]=CLMnuevos, CLM["IA"]=CLMia, CYL["Total"]=CYLtotal, CYL["Nuevos"]=CYLnuevos, CYL["IA"]=CYLia
        , CAT["Total"]=CATtotal, CAT["Nuevos"]=CATnuevos, CAT["IA"]=CATia, CEU["Total"]=CEUtotal, CEU["Nuevos"]=CEUnuevos, CEU["IA"]=CEUia, VAL["Total"]=VALtotal, VAL["Nuevos"]=VALnuevos, VAL["IA"]=VALia
        , EXT["Total"]=EXTtotal, EXT["Nuevos"]=EXTnuevos, EXT["IA"]=EXTia, GAL["Total"]=GALtotal, GAL["Nuevos"]=GALnuevos, GAL["IA"]=GALia, MAD["Total"]=MADtotal, MAD["Nuevos"]=MADnuevos, MAD["IA"]=MADia
        , MEL["Total"]=MELtotal, MEL["Nuevos"]=MELnuevos, MEL["IA"]=MELia, MUR["Total"]=MURtotal, MUR["Nuevos"]=MURnuevos, MUR["IA"]=MURia, NAV["Total"]=NAVtotal, NAV["Nuevos"]=NAVnuevos, NAV["IA"]=NAVia
        , PVA["Total"]=PVAtotal, PVA["Nuevos"]=PVAnuevos, PVA["IA"]=PVAia, RIO["Total"]=RIOtotal, RIO["Nuevos"]=RIOnuevos, RIO["IA"]=RIOia;

        pcrsChart["ESP"]=ESP, pcrsChart["AND"]=AND, pcrsChart["ARA"]=ARA, pcrsChart["AST"]=AST, pcrsChart["BAL"]=BAL, pcrsChart["CAN"]=CAN, pcrsChart["CNT"]=CNT, pcrsChart["CLM"]=CLM
        , pcrsChart["CYL"]=CYL, pcrsChart["CAT"]=CAT, pcrsChart["CEU"]=CEU, pcrsChart["VAL"]=VAL, pcrsChart["EXT"]=EXT, pcrsChart["GAL"]=GAL, pcrsChart["MAD"]=MAD, pcrsChart["MEL"]=MEL
        , pcrsChart["MUR"]=MUR, pcrsChart["NAV"]=NAV, pcrsChart["PVA"]=PVA, pcrsChart["RIO"]=RIO;
        pcrsChart["Fechas"]=Fechas;

        res.json(pcrsChart);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/chart/:Fecha', async (req, res) => {
    try{
        let dia = req.params.Fecha.split('-');
        let diaString = dia[0]+'/'+dia[1]+'/'+dia[2];
        let pcrs = await PCR.find({ Fecha: [diaString] });
        let sortedArray = pcrs[0].CCAAs.sort(compareTotal);
        let sortedCCAA = [], sortedTotales = [];
        let pcrsChart={};
        for(var key in sortedArray){
            sortedCCAA.push(sortedArray[key].CCAA);
            sortedTotales.push(sortedArray[key].Total);
        }
        pcrsChart['CCAAs']=sortedCCAA;
        pcrsChart['Totales']=sortedTotales;
        res.json(pcrsChart);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/date', async (req, res) => {
    try{
        const pcrs = await PCR.find().sort({Date:-1});
        let lastDate = pcrs[0].Fecha;
        let lastDateFormat = lastDate.replace(/\//g, '-');
        let dateJson = {"Fecha": lastDateFormat, "Date": pcrs[0].Date}
        res.json(dateJson);
    }catch(err){
        res.json({message: err});
    }
});

function compareTotal( a, b ) {
    if ( a.Total < b.Total ){
      return 1;
    }
    if ( a.Total > b.Total ){
      return -1;
    }
    return 0;
}

//post a PCR
router.post('/', async (req,res) => {
    const pcr = new PCR({
        Date: req.body.Date,
        Fecha: req.body.Fecha,
        CCAAs: req.body.CCAAs
    });
    try{
        const savedPCR= await pcr.save();
        res.json(savedPCR);
    }catch(err){
        res.json({message: err});
    }
    
});

// //get specific post
// router.get('/:postId', async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     }catch(err){
//         res.json({message: err});
//     }   
// });

// //delete specific post
// router.delete('/:postId', async (req,res) => {
//     try{
//         const removedPost = await Post.remove({_id: req.params.postId });
//         res.json(removedPost);
//     }catch(err){
//         res.json({message: err});
//     }
// });

// //update post
// router.patch('/:postId', async (req,res) => {
//     try{
//         const updatedPost = await Post.updateOne(
//             {_id: req.params.postId }, 
//             {$set: {title: req.body.title}}
//         );
//         res.json(updatedPost);
//     }catch(err){
//         res.json({message: err});
//     }
// })

module.exports = router;