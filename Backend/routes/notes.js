const express= require("express")
const router=express.Router()
router.post("/api/notes",(req,res)=>{

    res.json([])
})
module.exports=router