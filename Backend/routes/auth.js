const express= require("express")
const router=express.Router()
const User=require("../models/User")
const { check, validationResult } = require('express-validator');
router.post("/api/auth",[
  check('email').isEmail(),
  check('password').isLength({ min: 6 })]
  ,(req,res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json(result)
    }
    else
   {
    const user=User(req.body)
    user.save()
  }
  
    
})
module.exports=router