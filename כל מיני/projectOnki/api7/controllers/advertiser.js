import Advertiser from "../models/advertiser.js";
import jwt from 'jsonwebtoken';

// Create and Save a new Advertiser

export const register = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Advertiser
    const new_advertiser = new Advertiser({
        email: req.body.email,
        phon: req.body.phone,
        anotherPhone: req.body.anotherPhone,
        password: req.body.password
    });

    // Check if email already exists
    Advertiser.findOne({ email: req.body.email })
        .then(advertiser => {
            if (advertiser) {
                return res.status(400).send({ message: "Email already exists." });
            }

            // Save Advertiser in the database
            new_advertiser.save()
                .then(data => {
                    const token = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    res.send({ data, token });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Advertiser."
                    });
                });
        })
};

//Login a registered Advertiser

export const login = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const email = req.body.email;  
    const password = req.body.password;

    // Find a Advertiser by email
    Advertiser.findOne({ email })
        .then(advertiser => {
            // Check if the password matches
            if (!advertiser) {
                return res.status(401).send({ message: "Authentication failed" });
            }
            if(password !== advertiser.password){
                return res.status(401).send({ message: "password in not correct" });
            }
            // Create and send a token
            const token = jwt.sign({ id: advertiser.id, email: advertiser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.send({ advertiser, token });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving Advertiser." });
        });

}

