import express from 'express';

import { getAllCities,createCity } from '../controllers/city.js';

const router = express.Router();

router.get('/all', getAllCities);

router.post('', createCity);

export default router;

