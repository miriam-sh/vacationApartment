import Apartment from "../models/apartment.js";
import Category from "../models/category.js";
import Advertiser from "../models/advertiser.js";
import City from "../models/city.js";
import { populate } from "dotenv";

export const getAll = async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate({ path: 'category', select: '-__v' })
            .populate({ path: 'city', select: '-__v' })
            .populate({ path: 'advertiser', select: '-__v -_id' })

        res.status(200).json(apartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {

    const { name, description, imgUrl, category, city, address, countOfBeds, price, advertiser, plugins } = req.body

    const newApartment = new Apartment({
        name, description, imgUrl, category, city, address, countOfBeds, price, advertiser, plugins
    });

    newApartment.save()
        .then(async apartment => {
            await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
            await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
            await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } })

            const answer = await Apartment.findById(apartment._id)
                .populate({ path: 'category', select: '-__v -_id' })
                .populate({ path: 'city', select: '-__v -_id' })

            res.status(201).json(answer)
        })
        .catch(err => {
            console.log(err.message);
            res.status(400).json({ message: err.message })
        })
}

export const update = async (req, res) => {
    const { id } = req.params
    Apartment.findByIdAndUpdate(id, req.body)
        .then(async apartment => {
            const { category, city } = req.body
            if (category) {
                await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
                await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
            }
            if (city) {
                await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
                await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
            }
            res.status(200).send({ message: `update apartment ${apartment._id} succeed!` })
        })
        .catch(error => {
            res.status(500).send({ error: error.message })
        })

}

export const remove = (req, res) => {
    Apartment.findById(req.params.id)
        .then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: 'apartment not found!' })
            }
            apartment.deleteOne()
                .then(async () => {
                    await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
                    await City.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
                    await Advertiser.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
                    res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
                })
                .catch(error => {
                    console.log(error.message);
                    res.status(500).send({ error: error.message })
                })

        })
}

//Get apartment by ID

export const getById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id)
            .populate({ path: 'category', select: '-__v' })
            .populate({ path: 'city', select: '-__v' })
            .populate({ path: 'advertiser', select: '-__v -_id -apartments -password' })

        if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

        res.json(apartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get apartments by category

export const getByCategory = async (req, res) => {
    try {
        const apartments = await Category.findById(req.params.id).apartments
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: '-__v -_id -password' })

        if (!apartments) return res.status(404).json({ message: 'Apartments not found' });

        res.json(apartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Get apartments by city

export const getByCity = async (req, res) => {
    try {
        const apartments = await City.findById(req.params.id).apartments
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: '-__v -_id -password' })

        if (!apartments) return res.status(404).json({ message: 'Apartments not found' });

        res.json(apartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get apartments by advertiser

export const getByAdvertiser = async (req, res) => {

    try {
        const adv = await Advertiser.findById(req.body.advertiser)
            .populate({
                path: 'apartments', select: '-__v', populate: [
                    { path: 'category', select: '-__v -_id' },
                    { path: 'city', select: '-__v -_id' },
                    // { path: 'advertiser', select: '-__v -_id -password' }
                ]
            })
        const apartments = await adv
            .apartments

        if (!apartments) return res.status(404).json({ message: 'Apartments not found' });

        res.json(apartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};