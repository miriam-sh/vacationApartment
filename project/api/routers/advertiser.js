import express from 'express';
import { register, login, loginWithNewPassword, verifyEmail, sendEmail } from '../controllers/advertiser.js';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/loginWithNewPassword', loginWithNewPassword);

router.get('/verifyEmail/:email', verifyEmail)

router.put('/sendMail/:mail', sendEmail);


export default router

