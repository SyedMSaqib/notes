const express=require("express")
const MongoConnection=require("./db")
MongoConnection()

const app = express()
const port = 5000
app.use(express.json())
app.use('/api/auth', require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})