const express = require('express')
const app = express();
const conn = require('./db/db')
const port = 5555;
require('dotenv').config();
const router = express.Router();
const cors = require('cors')

conn();

//routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const bookRoutes = require('./routes/bookroutes');



app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

app.use('/test', testRoutes);


app.use('/api/book', bookRoutes);


app.listen(port, () => {
    console.log(`server running on port ${port}`);

})