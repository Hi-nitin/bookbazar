const mongoose = require('mongoose');

const conn = async () => {


    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected to database');

    } catch (error) {
        console.log('error connecting to database. Reason: ' + error);

    }
}

module.exports = conn;