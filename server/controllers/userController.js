const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Create token for authentication
const authenticateToken = (_id) => {
   return jwt.sign({_id: _id}, process.env.SECRET , {expiresIn: '5d'});
};

// Login
const loginProcess = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        // Create token
        const token = authenticateToken(user._id);

        // Respond with only _id, email, and token
        res.status(200).json({
            _id: user._id,
            email: user.email,
            token: token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Signup
const signupProcess = async (req, res) => {
    const { email, password, userName, phone } = req.body;
    try {
        const newUser = await User.signup(email, password, userName, phone);
        // Create token
        const token = authenticateToken(newUser._id);

        // Respond with only _id, email, and token
        res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            token: token,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginProcess,
    signupProcess,
};
