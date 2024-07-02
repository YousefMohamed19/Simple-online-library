import express from 'express'
import { connectDB } from './db/connection.js'
import { bookRouter, authorRouter, specialRouter } from './src/index.js'

const app = express()
const port = 3000
app.use(express.json())

connectDB()
app.use('/book',bookRouter)
app.use('/author',authorRouter)
app.use('/special',specialRouter)


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)})