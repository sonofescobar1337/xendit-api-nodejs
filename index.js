const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection
const dbUri = process.env.MONGODB_URL;
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const qrisRouter = require('./src/middlewere/QRIS');
app.use('/qris', qrisRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
