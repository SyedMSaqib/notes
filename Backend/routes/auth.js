const express= require("express")
const router=express.Router()
const User=require("../models/User")
const { check, validationResult } = require('express-validator');
router.post("/api/auth",[
  check('email').isEmail(),
  check('password').isLength({ min: 6 })]
  ,(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) 
      return res.json(result)
      User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }).catch(err=>{console.log(err)})
      
      })
    

module.exports=router