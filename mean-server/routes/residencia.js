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