const express= require("express")
const router=express.Router()
router.get("/api/auth",(req,res)=>{
    
    obj={
      a:"Hello",
      b:"bye"
    }
    res.json(obj)
})
module.exports=router