const express = require("express");
const router = express.Router();
const Post = require('../models/post.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
  
const upload = multer({ storage: storage }).single('upload_file');

router.get('/post',(req,res)=>{
    Post.find({},function (err,docs){
        if(err || !docs){
            res.status(400);
            console.log(err);
        }else{
            res.status(200).json(docs);
        }
    })
})

router.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.status(400);
        }else{
            const newPost = {
                name : req.body.name,
                location : req.body.location,
                description : req.body.description,
                postImage : {
                    data : fs.readFileSync(process.cwd()+"/uploads/"+req.file.filename),
                    contentType : "image/png"
                },
                date : Date.now(),
                like : Math.floor(Math.random() * 101)
            }
            Post.create(newPost,(err,item)=>{
                if(err){
                    res.status(400);
                    console.log(err);
                }else{
                    res.redirect('/post');
                }
            })
            
        }
    })
})

module.exports = router;