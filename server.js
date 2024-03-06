const express = require('express');
const cors = require('cors');
const User = require('./model/User');
const mongoose = require('mongoose');
const env = require('dotenv');
const app = express();

env.config();

const port = process.env.PORT || 3009;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGOURL).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

app.post('/submit', async (req, res) => {
    try {
        const { name, email, number, message } = req.body;
        const newUser = new User({ name, email, number, message });
        await newUser.save();
        res.json({ message: 'Data Added' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log('Server started on port', port);
});
