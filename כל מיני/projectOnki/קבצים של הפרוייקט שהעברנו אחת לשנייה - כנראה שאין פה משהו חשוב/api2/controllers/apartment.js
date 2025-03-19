import Apartment from "../models/apartment";
import Category from "../models/category";
import Advertiser from "../models/advertiser";
import City from "../models/city";
import apartment from "../models/apartment";

export const getAll = async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: '-__v -_id' })

        res.status(200).json(apartments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {

    const { name, description, imgUrl, category, city, address, countOfBeds, advertiser, } = req.body

    const newApartment = new Apartment({
        name, description, imgUrl, category, city, address, countOfBeds, advertiser,
    });

    newApartment.save()
        .then(async apartment => {
            await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
            await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
            await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } })
            res.status(201).json(apartment)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

export const update = async (req, res) => {
    const { id } = req.params
    Apartment.findByIdAndUpdate(id, req.body)
        .then(async apartment => {
            const { category, city, advertiser } = req.body
            if (category) {
                await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
                await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
            }
            if (city) {
                await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
                await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
            }
            if (advertiser) {
                await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } })
                await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: apartment._id } })
            }
            res.status(200).send({ message: `update apartment ${dose._id} succeed!` })
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
                    res.status(200).send({ message: `delete apartment ${article._id} succeed!` })
                })
                .catch(error => {
                    res.status(500).send({ error: error.message })
                })

        })
}