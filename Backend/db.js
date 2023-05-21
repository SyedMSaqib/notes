const mongoose=require('mongoose')
const uri="mongodb://127.0.0.1:27017/CWHVblog"

const connectToMongoose=()=>
{
    mongoose.connect(uri).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log(`The error is following ${err}`)
    })
}
module.exports=connectToMongoose

