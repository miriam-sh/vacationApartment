import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotnev from 'dotenv';
import mongoose from'mongoose';
import cityRouter from './api/routers/city.js';
import advertiserRouter from './api/routers/advertiser.js'
import categoryRouter from './api/routers/category.js'
import apartmentRouter from './api/routers/apartment.js'
import imageRouter from './api/routers/image.js'


const app = express();
const port = 3001;

dotnev.config();

app.use(cors());


mongoose.connect(process.env.URI)
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/apartment', apartmentRouter);
app.use('/city',cityRouter);
app.use('/advertiser',advertiserRouter)
app.use('/category',categoryRouter)
app.use('/image',imageRouter)


app.listen(port, () =>
     console.log(`Server running on port ${port}`));