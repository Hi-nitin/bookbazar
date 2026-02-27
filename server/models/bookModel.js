const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },
    about: {
        type: String,
        required: true
    },
    price: {
        type: Number, required: true

    },
    address: {
        type: String,
        required: true

    },

    mainImage: {
        type: String,
        required: true

    },

    additionalImages: {
        type: [String],
        validate: [val => val.length <= 3, "Maximum 3 images allowed"],
    },


},
    { timestamps: true }
)


module.exports = mongoose.model("Book", bookSchema)