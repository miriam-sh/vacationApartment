import express from 'express';
import {getById, getAll,getByAdvertiser,getByCategory,getByCity,create,update,remove } from './controllers/apartment.js';

const router = express.Router();

// Get all apartments

router.get('/all', getAll);

// Get apartment by ID

router.get('/:id', getById);

// Get apartments by advertiser ID

router.get('/advertiser/:id', getByAdvertiser);

// Get apartments by category

router.get('/category/:id', getByCategory);

// Get apartments by city

router.get('/city/:id', getByCity);

// Create a new apartment

router.post('', create);

// Update an apartment by ID

router.put('/:id', update);

// Delete an apartment by ID

router.delete('/:id', remove);


export default router;

