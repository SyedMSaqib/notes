const express= require("express")
const router=express.Router()
const User=require("../models/User")
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');




router.post("/api/auth",[
  check('email').isEmail(),
  check('password').isLength({ min: 6 })]
  ,async(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) 
      return res.json(result)
     try{ 
      let user=await User.findOne({email:req.body.email}) //checking if user is already registererd or not by email
      if(user)
      return res.status(500).send(`${req.body.email} is already registered`)// throwing already registered error

      var salt = await bcrypt.genSaltSync(10);
      var securePassword =await bcrypt.hashSync(req.body.password, salt);

      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email
      })
    
      res.send("User Created")
     }
     catch(err)
     {
      res.status(500).json(`"errors are": ${err}`)
     }   
      })
      
    
    

module.exports=router