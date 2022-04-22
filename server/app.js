//imports
require('dotenv').config()
const express = require('express')
const moongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("uploads"))


//database connection
moongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
})
.then(()=> console.log("Connect to the database"))
.catch(err=> console.log(err))

//routes prefix
app.use("/api",require("./routes/Estudiante"))
app.use("/api",require("./routes/Sala"))
app.use("/api",require("./routes/Edificio"))



//start server
app.listen(port,()=> console.log('server running at http://localhost:'+port))
