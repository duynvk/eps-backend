require('dotenv').config({ path: '../config/.env' });
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }

        const token = authHeader.replace('Bearer ', '');
        console.log('Received Token:', token);  // Log the token
        
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log('Decoded Token:', decoded);  // Log the decoded token

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        console.log('Authenticated User:', user);  // Log the user

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.error('Authentication Error:', error.message);  // Log the error
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
