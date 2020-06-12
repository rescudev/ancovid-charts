const express = require('express');
const router = express.Router();
const Territorio = require('../models/Territorio');

//get all territorios
router.get('/', async (req, res) => {
    try{
        const territorios = await Territorio.find();
        res.json(territorios);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/chart', async (req, res) => {
    try{
        const territorios = await Territorio.find().sort({Date:1});
        res.json(territorios.pop());
    }catch(err){
        res.json({message: err});
    }
});

//post a Territorio
router.post('/', async (req,res) => {
    const territorio = new Territorio({
        Date: req.body.Date,
        Fecha: req.body.Fecha,
        Territorios: req.body.Territorios
    });
    try{
        const savedTerritorio= await territorio.save();
        res.json(savedTerritorio);
    }catch(err){
        res.json({message: err});
    }
    
});

module.exports = router;