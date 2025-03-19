import Advertiser from "../models/advertiser.js";

// Create and Save a new Advertiser

export const register = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Advertiser
    const advertiser = new Advertiser({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        anotherPhone: req.body.anotherPhone
    });

    // Save Advertiser in the database
    advertiser.save()
       .then(data => {
        const token = jwt.sign({ name: data.name,email:data.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.send({data, token } );
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Advertiser."
            });
        });
};

//Login a registered Advertiser

export const login =  (req, res) => {
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
            if (!advertiser || password !== advertiser.password) {
                return res.status(401).send({ message: "Authentication failed!" });
            }
            // Create and send a token
            const token = jwt.sign({ name: advertiser.name, email:advertiser.email}, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.send({name:advertiser.name, token });
        })
       .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving Advertiser." });
        });

}

