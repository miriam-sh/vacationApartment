import City from "../models/city.js";


export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find()
        .populate({path : 'apartments',select : '-__v,-_id'});
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCity = async (req, res) => {
    const city = new City({
        name: req.body.name,
    });

    try {
        const newCity = await city.save();
        res.status(201).json(newCity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};