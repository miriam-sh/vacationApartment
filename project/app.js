import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import categoryRouter from './api/routers/category.js'
import cityRouter from './api/routers/city.js'
import advertiserRouter from './api/routers/advertiser.js'
import apartmentRouter from './api/routers/apartment.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())

dotenv.config()

app.use('/category', categoryRouter)
app.use('/advertiser', advertiserRouter)
app.use('/city', cityRouter)
app.use('/apartment', apartmentRouter)

const port = 3001

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000000000, // זמן פסק של 20 שניות
    socketTimeoutMS: 2000000000 // זמן פסק של 20 שניות
})
.then(() => {
    console.log('connect to mongoDB');
})
.catch(err => {
    console.error({error: err.message});
});


app.listen(port, () => {
    console.log(`my application is running on http://localhost:${port}`)
})
