import jwt from 'jsonwebtoken';
import Advertiser from './models/advertiser.js';

export const checkAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    const arr = req.headers.authorization.split(' ')

    if (arr.length == 1) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    const [x, token] = arr

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {

        if (error || !decoded) {
            console.log(error.message);
            return res.status(401).send({ error: error.message })
        }
        // req.advertiser_email = decoded.email
        req.body.advertiser = decoded.id
        next()
    })

}

export const allowedCange = (req, res, next) => {

    Advertiser.findById(req.body.advertiser)
        .populate({ path: 'apartments', select: '-__v' })
        .then(async advertiser => {
            if (!advertiser) {
                return res.status(401).send({ error: 'Unauthorized user!' })
            }
            let apartment = await advertiser.apartments.find(a => a._id == req.params.id);
            if (!apartment) {
                return res.status(404).send({ error: 'Apartment not found!' })
            }
            next()

            // advertiser.apartments.findById(req.params.id)
            //     .then(apartment => {
            //         if (!apartment) {
            //             return res.status(404).send({ error: 'Apartment not found!' })
            //         }
            //     }).catch(error => {
            //         console.log(error.message);
            //         res.status(500).send({ error: 'Server Error!' })
            //     })
        }).catch(error => {
            console.log(error.message);
            res.status(500).send({ error: 'Server Error!' })
        })

}
