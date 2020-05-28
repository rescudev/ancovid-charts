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