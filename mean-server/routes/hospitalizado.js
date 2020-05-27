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