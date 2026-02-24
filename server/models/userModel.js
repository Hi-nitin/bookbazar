const mongoose = require('mongoose');
const { trim } = require('validator');


const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,

    },

    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
        trim: true,

    },
    phone: {
        type: String,
        required: [true, 'Number is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false

    },



}, {
    timestamps: true
}
)