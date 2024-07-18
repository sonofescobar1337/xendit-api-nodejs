const express = require('express');
const router = express.Router();
require('dotenv').config();
const QRIS_Payment = require('../model/QRIS_Payment');
const create = require('../module/QRIS/create');
const parseExpirationTime = require('../utils/expiration');

router.post('/', async (req, res) => {
    try {
        const privatekey = process.env.XENDIT_PRIVATE_KEY;
        const { reference_id, currency, amount } = req.body;
        
        // Get expiration time from .env
        const expired = parseExpirationTime();
        
        // Create payment
        const paymentResponse = await create.craetepayment(privatekey, reference_id, currency, amount, expired);

        if (paymentResponse.error) {
            throw new Error(paymentResponse.error);
        }

        const paymentData = paymentResponse.response;
        const newPayment = new QRIS_Payment({
            paymentid: paymentData.id,
            reference_id: paymentData.reference_id,
            Payment_Method: paymentData.type,
            QRString: paymentData.qr_string,
            Status_QR: paymentData.status,
            Status_Payment: 'pending',
            Amount: paymentData.amount,
            Type: paymentData.type,
            Created: paymentData.created,
            Expired: paymentData.expires_at
        });

        await newPayment.save();

        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

module.exports = router;
