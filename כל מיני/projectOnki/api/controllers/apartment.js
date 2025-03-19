import Apartment from "../models/apartment.js";
import Category from "../models/category.js";
import Advertiser from "../models/advertiser.js";
import City from "../models/city.js";
import Image from "../models/image.js";


export const getAll = async (req, res) => {
    try {
        const apartments = await Apartment.find()
            .populate({ path: 'category', select: '-__v' })
            .populate({ path: 'city', select: '-__v' })
            .populate({ path: 'advertiser', select: 'email phone' })
            .populate({ path: 'image', select: '-__v -__id' })

        const apartmentsWithImages = apartments.map(apartment => ({

            ...apartment._doc,
            image: apartment.image ? {
                contentType: apartment.image.contentType,
                data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
            } : null
        }));

        res.status(200).json(apartmentsWithImages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const create = async (req, res) => {

    const { name, description, category, city, address, countOfBeds, price, plugins } = JSON.parse(req.body.apartment)

    const newImage = new Image({
        data: req.file.buffer,
        contentType: req.file.mimetype,
    });

    let imageSaved = await newImage.save()

    let image = imageSaved._id

    let advertiser = req.body.advertiser

    const newApartment = new Apartment({
        name, description, image, category, city, address, countOfBeds, price, plugins, advertiser,
    });
    newApartment.save()
        .then(async apartment => {
            await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
            await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
            await Advertiser.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } })
            const answer = await Apartment.findById(apartment._id)
                .populate({ path: 'category', select: '-__v' })
                .populate({ path: 'city', select: '-__v' })

            res.status(201).json(answer)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

export const update = async (req, res) => {
    const { id } = req.params

    const parameters = JSON.parse(req.body.apartment)

    let a = await Apartment.findById(id)
    
    let image = a.image

    if (req.file) {

        await Image.findByIdAndDelete(image)

        const newImage = new Image({
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });

        let imageSaved = await newImage.save()

        image = imageSaved._id

    }

    parameters.image = image

    res.status(200)
    Apartment.findByIdAndUpdate(id, parameters)
        .then(async apartment => {
            const { category, city } = parameters            
            if (category) {
                await Category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } })
                await Category.findByIdAndUpdate(category, { $push: { apartments: apartment._id } })
            }
            if (city) {
                await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
                await City.findByIdAndUpdate(city, { $push: { apartments: apartment._id } })
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
                    await City.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } })
                    await Advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: apartment._id } })
                    await Image.findByIdAndDelete(apartment.image)
                    res.status(200).send({ message: `delete apartment ${apartment._id} succeed!` })
                })
                .catch(error => {
                    res.status(500).send({ error: error.message })
                })

        })
}

//Get apartment by ID

export const getById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id)
            .populate({ path: 'category', select: '-__v ' })
            .populate({ path: 'city', select: '-__v' })
            .populate({ path: 'advertiser', select: '-__v -_id -apartments -password' })
            .populate({ path: 'image', select: '-__v -__id' })

        if (!apartment) return res.status(404).json({ message: 'Apartment not found' });

        const apartmentWithImage = {
            ...apartment._doc,
            image: apartment.image ? {
                contentType: apartment.image.contentType,
                data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
            } : null
        }

        res.json(apartmentWithImage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const filter = async (request, res) => {
    try {
        console.log(request.query);
        
        const { category, city, minPrice, maxPrice, minBeds, maxBeds } = request.query;

        // התחלת חיפוש עם קריטריונים
        let query = {};
        if (category) query.category = category;
        if (city) query.city = city;
        if (minPrice) query.price = { ...query.price, $gt: minPrice };
        if (maxPrice) query.price = { ...query.price, $lt: maxPrice };
        if (minBeds) query.countOfBeds = { ...query.countOfBeds, $gt: minBeds };
        if (maxBeds) query.countOfBeds = { ...query.countOfBeds, $lt: maxBeds };

        const apartments = await Apartment.find(query)
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'image', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: 'email phone' });

        const apartmentsWithImages = apartments.map(apartment => ({
            ...apartment._doc,
            image: apartment.image ? {
                contentType: apartment.image.contentType,
                data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
            } : null
        }));
        console.log(apartmentsWithImages);
        
        res.status(200).json(apartmentsWithImages);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);  
    }
}
export const minMaxPrice = async (req, res) => {
    try {
        const minMaxPrice = await Apartment.aggregate([
            { $group: { _id: null, minPrice: { $min: "$price" }, maxPrice: { $max: "$price" } } }
        ])
        res.status(200).json({minPrice: minMaxPrice[0] ? minMaxPrice[0].minPrice : null,
            maxPrice: minMaxPrice[0] ? minMaxPrice[0].maxPrice : null})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const minMaxBeds = async (req, res) => {
    try {
        const minMaxBeds = await Apartment.aggregate([
            { $group: { _id: null, minBeds: { $min: "$countOfBeds" }, maxBeds: { $max: "$countOfBeds" } } }
        ])
        res.status(200).json({
            minBeds: minMaxBeds[0]? minMaxBeds[0].minBeds : null,
            maxBeds: minMaxBeds[0]? minMaxBeds[0].maxBeds : null
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Get apartments by category

export const getByCategory = async (req, res) => {
        await Category.findById(req.params.id).populate({ path: 'apartments',
            populate: [
                { path: 'city', select: '-__v ' },
                { path: 'advertiser', select: '-__v -_id -password' },
                { path: 'category', select: '-__v ' },
                { path: 'image', select: '-__v -_id'}
            ]})
        .then(category => {
            const apartments = category.apartments
            const apartmentsWithImages = apartments.map(apartment => ({
                ...apartment._doc,
                image: apartment.image? {
                    contentType: apartment.image.contentType,
                    data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
                }:null
            }));

        if (!apartments) return res.status(404).json({ message: 'Apartments not found' });
        res.json(apartmentsWithImages);
        })
        .catch ((error)=>
        {
        res.status(500).json({ message: error.message });
        }
        )
}
//Get apartments by city

export const getByCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id)
            .populate({ path: 'apartments',populate: [
            { path: 'city', select: '-__v -_id' },
            { path: 'advertiser', select: '-__v -_id -password' },
            { path: 'category', select: '-__v -_id' },
            { path: 'image', select: '-__v -_id'}
        ]})
        const apartments = city.apartments;
        if (!apartments) return res.status(404).json({ message: 'Apartments not found' });        
        const apartmentsWithImages = apartments.map(apartment => ({               
            ...apartment._doc,
            image: apartment.image? {
                contentType: apartment.image.contentType,
                data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
            }:null
        }));
        res.json(apartmentsWithImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get apartments by advertiser

export const getByAdvertiser = async (req, res) => {

    try {
        const advertiser = await Advertiser.findById(req.body.advertiser)
        .populate({ path: 'apartments', populate: [
            { path: 'category', select: '-__v -_id' },
            { path: 'city', select: '-__v -_id' },
            { path: 'advertiser', select: '-__v -_id -password' },
            { path: 'image', select: '-__v -_id'}
        ] });
    
    const apartments = advertiser.apartments;


        if (!apartments) return res.status(404).json({ message: 'Apartments not found' });
        const apartmentsWithImages = apartments.map(apartment => ({
            ...apartment._doc,
            image:apartment.image?{
                contentType: apartment.image.contentType,
                data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
            }:null
        }));
        res.json(apartmentsWithImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getByCountOfBedsSmaller = async (req, res) => {
    const { number } = req.params;
    try {
        const apartments = await Apartment.find({ countOfBeds: { $lt: parseInt(number) } })
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'image', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: 'email phone' });

        const apartmentsWithImages = apartments.map(apartment => ({
            ...apartment._doc,
            image:apartment.image? {
                contentType: apartment.image.contentType,
                data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
            }:null
        }));

        res.status(200).json(apartmentsWithImages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByCountOfBedsBigger = async (req, res) => {
    const { number } = req.params;
    try {
        const apartments = await Apartment.find({ countOfBeds: { $gt: parseInt(number) } })
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: 'email phone' });
            const apartmentsWithImages = apartments.map(apartment => ({
                ...apartment._doc,
                image:apartment.image? {
                    contentType: apartment.image.contentType,
                    data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
                }:null
            }));

        res.status(200).json(apartmentsWithImages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByCountOfBedsEqual = async (req, res) => {
    const { number } = req.params;
    try {
        const apartments = await Apartment.find({ countOfBeds: { $eq: parseInt(number) } })
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({path:'image',select:'-__v - _id'})
            .populate({ path: 'advertiser', select: 'email phone' });
            const apartmentsWithImages = apartments.map(apartment => ({
                ...apartment._doc,
                image:apartment.image? {
                    contentType: apartment.image.contentType,
                    data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
                }:null
            }));

        res.status(200).json(apartmentsWithImages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByPriceSmaller = async (req, res) => {
    const { number } = req.params;
    try {
        const apartments = await Apartment.find({ price: { $lt: parseInt(number) } })
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'image', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: 'email phone' });

            const apartmentsWithImages = apartments.map(apartment => ({
                ...apartment._doc,
                image:apartment.image? {
                    contentType: apartment.image.contentType,
                    data: apartment.image.data.toString('base64') // המרת התמונה לבסיס 64
                }:null
            }));

        res.status(200).json(apartmentsWithImages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByPriceBigger = async (req, res) => {
    const { number } = req.params;
    try {
        const apartments = await Apartment.find({ price: { $gt: parseInt(number) } })
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'image', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: 'email phone' });
            console.log(apartments);

            const apartmentsWithImages = apartments.map(apartment => ({
                ...apartment._doc,
                image: apartment.image? {
                    contentType: apartment.image.contentType,
                    data: apartment.image.data.toString('base64') // המרת התמו��ה לב��י�� 64
                }:null
            }));
        res.status(200).json(apartmentsWithImages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getByPriceEqual = async (req, res) => {
    const { number } = req.params;
    try {
        const apartments = await Apartment.find({ price: { $eq: parseInt(number) } })
            .populate({ path: 'category', select: '-__v -_id' })
            .populate({ path: 'city', select: '-__v -_id' })
            .populate({ path: 'image', select: '-__v -_id' })
            .populate({ path: 'advertiser', select: 'email phone' });

            const apartmentsWithImages = apartments.map(apartment => ({
                ...apartment._doc,
                image:apartment.image? {
                    contentType: apartment.image.contentType,
                    data: apartment.image.data.toString('base64') // המרת התמו��ה לב��י�� 64
                }:null
            }));
        res.status(200).json(apartmentsWithImages);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}