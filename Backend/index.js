const express=require("express")
const MongoConnection=require("./db")
MongoConnection()

const app = express()
const port = 3000
app.use(express.json())
app.post('/api/auth', require("./routes/auth"))
app.post("/api/notes",require("./routes/notes"))
app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})