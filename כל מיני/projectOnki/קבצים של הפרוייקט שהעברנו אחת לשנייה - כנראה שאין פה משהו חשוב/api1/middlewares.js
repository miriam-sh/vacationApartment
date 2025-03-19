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
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            req.advertiser_email = decoded.email
            console.log(error.message);
            return res.status(401).send({ error: error.message })
        }
        next()
    })

}
export const allowedCange = (req, res, next) => {

    Advertiser.findOne({ email: req.advertiser_email }).then(advertiser => {

        if (!advertiser) {
            return res.status(401).send({ error: 'Unauthorized user!' })
        }
        advertiser.apartments.findById(req.params.id).then(apartment => {
            if (!apartment) {
                return res.status(404).send({ error: 'Apartment not found!' })
            }
        })
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({ error: 'Server Error!' })
    })

    next()
}
