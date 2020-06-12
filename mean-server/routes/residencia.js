const express = require('express');
const router = express.Router();
const Residencia = require('../models/Residencia');

//get all residencias
router.get('/', async (req, res) => {
    try{
        const residencias = await Residencia.find();
        res.json(residencias);
    }catch(err){
        res.json({message: err});
    }
});

//post a Residencia
router.post('/', async (req,res) => {
    const residencia = new Residencia({
        Date: req.body.Date,
        Fecha: req.body.Fecha,
        Residencias: req.body.Residencias
    });
    try{
        const savedResidencia= await residencia.save();
        res.json(savedResidencia);
    }catch(err){
        res.json({message: err});
    }
    
});

module.exports = router;