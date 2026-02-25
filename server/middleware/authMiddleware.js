const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');


exports.authMiddleware = async (req, res, next) => {

    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided. Login again" })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: 'invalid token' })
        }


        const user_exist = await userModel.findById(decode.id);

        if (!user_exist) {
            return res.status(401).json({ message: "User not found!" })

        }

        userId = decode.id;

        next();


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })

    }


}