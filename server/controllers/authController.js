const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Signup part
exports.signup = async (req, res) => {


    try {
        const { name, email, password, phone } = req.body;

        //checking email if there is already in database or not 

        const check_email = await UserModel.findOne({ email })
        if (check_email) {
            return res.status(400).json({
                message: "Email already used!"
            })
        }

        const check_phone = await UserModel.findOne({ phone })
        if (check_phone) {
            return res.status(400).json({
                message: "Phone number already used!"
            })
        }

        //hashing the password
        const hash_d_password = await bcrypt.hash(password, 12)
        // saving user in database
        const save_user = await UserModel.create({
            name,
            email,
            phone,
            password: hash_d_password

        })
        return res.status(201).json({
            message: "Registered Sucessfully"
        })



    } catch (error) {

        console.log(`Error occured : Reason => ${error}`);

    }
}


//login part


exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        //find user if exist

        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({ message: "Invalid email" })
        }

        const compare_password = await bcrypt.compare(password, user.password);
        if (!compare_password) {

            return res.status(400).json({ message: "Password is incorrect." });
        }

        const token = jwt.sign({ id: user._id },  process.env.JWT_SECRET);
        return res.status(201).json({ message: 'Login successfull', token })


    } catch (error) {
        console.log(`error occured . Reason : ${error}`);

    }
}