import Advertiser from "../models/advertiser.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
        phone: req.body.phone,
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
            if (password !== advertiser.password) {
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
export const sendEmail = (req, res) => {

    // הגדרת המנשא (transporter)
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail', // או ספק דוא"ל אחר
    //     auth: {
    //         user: 'vacationApartmentDM@Gmail.com', // כתובת האימייל שלך
    //         pass: 'pruhheynode' // סיסמת האימייל שלך
    //     }
    // });

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // השרת SMTP שלך
        port: 465, // או 465 אם אתה משתמש ב-SSL
        secure: true, // true עבור 465, false עבור אחרים
        auth: {
            user: 'vacationApartmentDM@Gmail.com', // כתובת האימייל שלך
            pass: 'hdlo ugqw ckcu suds' // סיסמת האימייל שלך
        }
    });

    // הגדרת פרטי ההודעה
    let mailOptions = {
        from: 'dvori7330@gmail.com', // כתובת השולח
        to: req.body.advertiser.email, // כתובת הנמען
        subject: req.params.mail + "מעונין לשכור ממך את הדירה", // נושא ההודעה
        text: 'This is a test email sent from Node.js!', // תוכן ההודעה
    };

    transporter.sendMail(mailOptions)
        .then(mail => {
            res.status(200).send({ message: mail })
        }
        )
        .catch(error => {
            res.status(500).send({ message: error })
        })
}

export const loginWithNewPassword = (req, res) => {
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
        .then(async advertiser => {
            // Check if the password matches
            if (!advertiser) {
                return res.status(401).send({ message: "Authentication failed" });
            }

            await Advertiser.findByIdAndUpdate(advertiser._id, { password })

            // Create and send a token
            const token = jwt.sign({ id: advertiser.id, email: advertiser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.send({ advertiser, token });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error retrieving Advertiser." });
        });

}

export const verifyEmail = (req, res) => {
    let code = Math.floor(100000 + Math.random() * 900000);

    let { email } = req.params

    console.log(code);
    
    // res.status(200).json({ code });


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'vacationApartmentDM@Gmail.com', // כתובת האימייל שלך
            pass: 'hdlo ugqw ckcu suds' // סיסמת האימייל שלך
        }
    });

    // הגדרת פרטי ההודעה
    let mailOptions = {
        from: 'vacationApartmentDM@Gmail.com', // כתובת השולח
        to: email, // כתובת הנמען
        subject: "no-reply", // נושא ההודעה
        html: `
        <div style="direction: rtl;"><p style="color: black;">על מנת לאמת את חשבון האימייל שלך הקש את הקוד הבא: </p><h1>${code}</h1><img src="https://drive.google.com/uc?export=view&id=1xrmUaf3fM7R7ZtpM5h4GrVy-cutSYZSs" alt="תמונה" style="max-width: 22%; height: auto;" /></div>`, // תוכן ההודעה
    };

    transporter.sendMail(mailOptions)
        .then(mail => {
            res.status(200).json({ code });
        }
        )
        .catch(error => {
            res.status(500).send({ message: error })
        })

}

