const express = require('express');
const router = express.Router();
const Hospitalizado = require('../models/Hospitalizado');

//get all hospitalizados
router.get('/', async (req, res) => {
    try{
        const hospitalizados = await Hospitalizado.find();
        res.json(hospitalizados);
    }catch(err){
        res.json({message: err});
    }
});

//post a Hospitalizado
router.post('/', async (req,res) => {
    const hospitalizado = new Hospitalizado({
        Date: req.body.Date,
        Fecha: req.body.Fecha,
        CCAAs: req.body.CCAAs
    });
    try{
        const savedHospitalizado= await hospitalizado.save();
        res.json(savedHospitalizado);
    }catch(err){
        res.json({message: err});
    }
    
});

router.get('/chart', async (req, res) => {
    try{
        const hospitalizados = await Hospitalizado.find().sort({Date:1});
        let hospChart={};
        let AND={}, ARA={}, AST={}, BAL={}, CAN={}, CNT={}, CLM={}, CYL={}, CAT={}, CEU={}, VAL={}, EXT={}, GAL={}, MAD={}, MEL={}, MUR={}, NAV={}, PVA={}, RIO={};
        let Fechas=[], ANDHosp=[], ANDUCI=[], ANDFallecidos=[], ARAHosp=[], ARAUCI=[], ARAFallecidos=[], ASTHosp=[], ASTUCI=[], ASTFallecidos=[]
        , BALHosp=[], BALUCI=[], BALFallecidos=[], CANHosp=[], CANUCI=[], CANFallecidos=[], CNTHosp=[], CNTUCI=[], CNTFallecidos=[], CLMHosp=[], CLMUCI=[], CLMFallecidos=[]
        , CYLHosp=[], CYLUCI=[], CYLFallecidos=[], CATHosp=[], CATUCI=[], CATFallecidos=[], CEUHosp=[], CEUUCI=[], CEUFallecidos=[], VALHosp=[], VALUCI=[], VALFallecidos=[]
        , EXTHosp=[], EXTUCI=[], EXTFallecidos=[], GALHosp=[], GALUCI=[], GALFallecidos=[], MADHosp=[], MADUCI=[], MADFallecidos=[], MELHosp=[], MELUCI=[], MELFallecidos=[]
        , MURHosp=[], MURUCI=[], MURFallecidos=[], NAVHosp=[], NAVUCI=[], NAVFallecidos=[], PVAHosp=[], PVAUCI=[], PVAFallecidos=[], RIOHosp=[], RIOUCI=[], RIOFallecidos=[];

        for(var key in hospitalizados){
            Fechas.push(hospitalizados[key].Fecha);
            ANDHosp.push(hospitalizados[key].CCAAs[1].Hospitalizados), ANDUCI.push(hospitalizados[key].CCAAs[1].UCI,), ANDFallecidos.push(hospitalizados[key].CCAAs[1].Fallecidos);
            ARAHosp.push(hospitalizados[key].CCAAs[2].Hospitalizados), ARAUCI.push(hospitalizados[key].CCAAs[2].UCI), ARAFallecidos.push(hospitalizados[key].CCAAs[2].Fallecidos);
            ASTHosp.push(hospitalizados[key].CCAAs[3].Hospitalizados), ASTUCI.push(hospitalizados[key].CCAAs[3].UCI), ASTFallecidos.push(hospitalizados[key].CCAAs[3].Fallecidos);
            BALHosp.push(hospitalizados[key].CCAAs[4].Hospitalizados), BALUCI.push(hospitalizados[key].CCAAs[4].UCI), BALFallecidos.push(hospitalizados[key].CCAAs[4].Fallecidos);
            CANHosp.push(hospitalizados[key].CCAAs[5].Hospitalizados), CANUCI.push(hospitalizados[key].CCAAs[5].UCI), CANFallecidos.push(hospitalizados[key].CCAAs[5].Fallecidos);
            CNTHosp.push(hospitalizados[key].CCAAs[6].Hospitalizados), CNTUCI.push(hospitalizados[key].CCAAs[6].UCI), CNTFallecidos.push(hospitalizados[key].CCAAs[6].Fallecidos);
            CLMHosp.push(hospitalizados[key].CCAAs[7].Hospitalizados), CLMUCI.push(hospitalizados[key].CCAAs[7].UCI), CLMFallecidos.push(hospitalizados[key].CCAAs[7].Fallecidos);
            CYLHosp.push(hospitalizados[key].CCAAs[8].Hospitalizados), CYLUCI.push(hospitalizados[key].CCAAs[8].UCI), CYLFallecidos.push(hospitalizados[key].CCAAs[8].Fallecidos);
            CATHosp.push(hospitalizados[key].CCAAs[9].Hospitalizados), CATUCI.push(hospitalizados[key].CCAAs[9].UCI), CATFallecidos.push(hospitalizados[key].CCAAs[9].Fallecidos);
            CEUHosp.push(hospitalizados[key].CCAAs[10].Hospitalizados), CEUUCI.push(hospitalizados[key].CCAAs[10].UCI), CEUFallecidos.push(hospitalizados[key].CCAAs[10].Fallecidos);
            VALHosp.push(hospitalizados[key].CCAAs[11].Hospitalizados), VALUCI.push(hospitalizados[key].CCAAs[11].UCI), VALFallecidos.push(hospitalizados[key].CCAAs[11].Fallecidos);
            EXTHosp.push(hospitalizados[key].CCAAs[12].Hospitalizados), EXTUCI.push(hospitalizados[key].CCAAs[12].UCI), EXTFallecidos.push(hospitalizados[key].CCAAs[12].Fallecidos);
            GALHosp.push(hospitalizados[key].CCAAs[13].Hospitalizados), GALUCI.push(hospitalizados[key].CCAAs[13].UCI), GALFallecidos.push(hospitalizados[key].CCAAs[13].Fallecidos);
            MADHosp.push(hospitalizados[key].CCAAs[14].Hospitalizados), MADUCI.push(hospitalizados[key].CCAAs[14].UCI), MADFallecidos.push(hospitalizados[key].CCAAs[14].Fallecidos);
            MELHosp.push(hospitalizados[key].CCAAs[15].Hospitalizados), MELUCI.push(hospitalizados[key].CCAAs[15].UCI), MELFallecidos.push(hospitalizados[key].CCAAs[15].Fallecidos);
            MURHosp.push(hospitalizados[key].CCAAs[16].Hospitalizados), MURUCI.push(hospitalizados[key].CCAAs[16].UCI), MURFallecidos.push(hospitalizados[key].CCAAs[16].Fallecidos);
            NAVHosp.push(hospitalizados[key].CCAAs[17].Hospitalizados), NAVUCI.push(hospitalizados[key].CCAAs[17].UCI), NAVFallecidos.push(hospitalizados[key].CCAAs[17].Fallecidos);
            PVAHosp.push(hospitalizados[key].CCAAs[18].Hospitalizados), PVAUCI.push(hospitalizados[key].CCAAs[18].UCI), PVAFallecidos.push(hospitalizados[key].CCAAs[18].Fallecidos);
            RIOHosp.push(hospitalizados[key].CCAAs[19].Hospitalizados), RIOUCI.push(hospitalizados[key].CCAAs[19].UCI), RIOFallecidos.push(hospitalizados[key].CCAAs[19].Fallecidos);
        }

        AND["Hospitalizados"]=ANDHosp, AND["UCI"]=ANDUCI, AND["Fallecidos"]=ANDFallecidos, ARA["Hospitalizados"]=ARAHosp, ARA["UCI"]=ARAUCI, ARA["Fallecidos"]=ARAFallecidos
        , AST["Hospitalizados"]=ASTHosp, AST["UCI"]=ASTUCI, AST["Fallecidos"]=ASTFallecidos, BAL["Hospitalizados"]=BALHosp, BAL["UCI"]=BALUCI, BAL["Fallecidos"]=BALFallecidos, CAN["Hospitalizados"]=CANHosp, CAN["UCI"]=CANUCI, CAN["Fallecidos"]=CANFallecidos
        , CNT["Hospitalizados"]=CNTHosp, CNT["UCI"]=CNTUCI, CNT["Fallecidos"]=CNTFallecidos, CLM["Hospitalizados"]=CLMHosp, CLM["UCI"]=CLMUCI, CLM["Fallecidos"]=CLMFallecidos, CYL["Hospitalizados"]=CYLHosp, CYL["UCI"]=CYLUCI, CYL["Fallecidos"]=CYLFallecidos
        , CAT["Hospitalizados"]=CATHosp, CAT["UCI"]=CATUCI, CAT["Fallecidos"]=CATFallecidos, CEU["Hospitalizados"]=CEUHosp, CEU["UCI"]=CEUUCI, CEU["Fallecidos"]=CEUFallecidos, VAL["Hospitalizados"]=VALHosp, VAL["UCI"]=VALUCI, VAL["Fallecidos"]=VALFallecidos
        , EXT["Hospitalizados"]=EXTHosp, EXT["UCI"]=EXTUCI, EXT["Fallecidos"]=EXTFallecidos, GAL["Hospitalizados"]=GALHosp, GAL["UCI"]=GALUCI, GAL["Fallecidos"]=GALFallecidos, MAD["Hospitalizados"]=MADHosp, MAD["UCI"]=MADUCI, MAD["Fallecidos"]=MADFallecidos
        , MEL["Hospitalizados"]=MELHosp, MEL["UCI"]=MELUCI, MEL["Fallecidos"]=MELFallecidos, MUR["Hospitalizados"]=MURHosp, MUR["UCI"]=MURUCI, MUR["Fallecidos"]=MURFallecidos, NAV["Hospitalizados"]=NAVHosp, NAV["UCI"]=NAVUCI, NAV["Fallecidos"]=NAVFallecidos
        , PVA["Hospitalizados"]=PVAHosp, PVA["UCI"]=PVAUCI, PVA["Fallecidos"]=PVAFallecidos, RIO["Hospitalizados"]=RIOHosp, RIO["UCI"]=RIOUCI, RIO["Fallecidos"]=RIOFallecidos;

        hospChart["AND"]=AND, hospChart["ARA"]=ARA, hospChart["AST"]=AST, hospChart["BAL"]=BAL, hospChart["CAN"]=CAN, hospChart["CNT"]=CNT, hospChart["CLM"]=CLM
        , hospChart["CYL"]=CYL, hospChart["CAT"]=CAT, hospChart["CEU"]=CEU, hospChart["VAL"]=VAL, hospChart["EXT"]=EXT, hospChart["GAL"]=GAL, hospChart["MAD"]=MAD, hospChart["MEL"]=MEL
        , hospChart["MUR"]=MUR, hospChart["NAV"]=NAV, hospChart["PVA"]=PVA, hospChart["RIO"]=RIO;
        hospChart["Fechas"]=Fechas;

        res.json(hospChart);
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