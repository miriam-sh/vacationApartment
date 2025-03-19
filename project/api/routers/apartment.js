import express from 'express';
import { getById, getAll, getByAdvertiser, getByCategory, getByCity, create, update,remove, getByCountOfBedsSmaller, getByCountOfBedsBigger, getByCountOfBedsEqual, getByPriceSmaller, getByPriceBigger, getByPriceEqual, filter, minMaxPrice, minMaxBeds } from '../controllers/apartment.js';
import multer from 'multer';
import { allowedCange, checkAuth } from '../middlewares.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// Get all apartments

router.get('/all', getAll);

// Get apartment by ID

router.get('/getById/:id', getById);

// Get apartments by advertiser ID

router.get('/advertiser',checkAuth, getByAdvertiser);

// Get apartments by category

router.get('/category/:id', getByCategory);

// Get apartments by city

router.get('/city/:id', getByCity);

router.get('/filter', filter);

router.get('/minmaxprice', minMaxPrice);

router.get('/minmaxbeds',minMaxBeds);
// Get apartments with count of beds smaller than a given number

router.get('/getByCountOfBedsSmaller/:number', getByCountOfBedsSmaller);

// Get apartments with count of beds bigger than a given number

router.get('/getByCountOfBedsBigger/:number', getByCountOfBedsBigger);

// Get apartments with count of beds equal to a given number

router.get('/getByCountOfBedsEqual/:number', getByCountOfBedsEqual);

// Get apartments with price smaller than a given number

router.get('/getByPriceSmaller/:number', getByPriceSmaller);

// Get apartments with price bigger than a given number

router.get('/getByPriceBigger/:number', getByPriceBigger);

// Get apartments with price equal to a given number

router.get('/getByPriceEqual/:number', getByPriceEqual);

// Create a new apartment

router.post('', upload.single('image'), checkAuth, create);

// Update an apartment by ID

router.put('/:id', upload.single('image'), checkAuth, allowedCange, update);

// Delete an apartment by ID

router.delete('/:id',checkAuth,allowedCange, remove);



export default router;

