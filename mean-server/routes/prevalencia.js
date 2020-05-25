const express = require('express');
const router = express.Router();
const Prevalencia = require('../models/Prevalencia');

//get all prevalencias
router.get('/', async (req, res) => {
    try{
        const prevalencias = await Prevalencia.find();
        res.json(prevalencias);
    }catch(err){
        res.json({message: err});
    }
});

//post a prevalencia
router.post('/', async (req,res) => {
    const prevalencia = new Prevalencia({
        Date: req.body.Date,
        Fecha: req.body.Fecha,
        ANHosp: req.body.ANHosp,
        ANUCI: req.body.ANUCI,
        ALHosp: req.body.ALHosp,
        ALUCI: req.body.ALUCI,
        CAHosp: req.body.CAHosp,
        CAUCI: req.body.CAUCI,
        COHosp: req.body.COHosp,
        COUCI: req.body.COUCI,
        GRHosp: req.body.GRHosp,
        GRUCI: req.body.GRUCI,
        HUHosp: req.body.HUHosp,
        HUUCI: req.body.HUUCI,
        JAHosp: req.body.JAHosp,
        JAUCI: req.body.JAUCI,
        MAHosp: req.body.MAHosp,
        MAUCI: req.body.MAUCI,
        SEHosp: req.body.SEHosp,
        SEUCI: req.body.SEUCI
    });
    try{
        const savedPrevalencia= await prevalencia.save();
        res.json(savedPrevalencia);
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