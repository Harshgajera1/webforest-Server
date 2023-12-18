import express from "express";
import route from "./route.js";
import connectDB from  './DB.js'
import cors from 'cors'

const app = express()
const port = 8000
connectDB()
app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.use('/',route)

app.listen(port,() => {
    console.log(`Server start on port : ${port}`)
})