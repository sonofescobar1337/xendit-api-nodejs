const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentid: {
        type: String,
        required: true
    },
    reference_id: {
        type: String,
        required: true
    },
    Payment_Method: {
        type: String,
        required: true
    },
    QRString: {
        type: String,
        required: true
    },
    Status_QR: {
        type: String,
        required: true
    },
    Status_Payment: {
        type: String,
        enum: ['pending', 'Partial', 'Failed', 'Paid'],
        default: 'pending'
    },
    Amount: {
        type: Number,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    Created: {
        type: String,
        required: true
    },
    Expired: {
        type: String,
        required: true
    }
});

// Gawe Model Mongodb
const QRIS_Payment = mongoose.model('QRIS_Payment', paymentSchema);


module.exports = QRIS_Payment;
