import express from 'express'
import connectDB from './src/database/index.js'
import Root from './src/router/index.js'

import cors from 'cors'


const app = express()
app.use(cors());


connectDB()
app.use(express.json())


app.use(Root)

app.listen(8000, () => {
    console.log("server is on!")
})