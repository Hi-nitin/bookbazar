const express =require('express')
const app= express();
const conn=require('./db/db')
const port=5555;
require('dotenv').config();
const router = express.Router();
const cors=require('cors')

conn();

//routes
const authRoutes=require('./routes/authRoutes');
const testRoutes=require('./routes/testRoutes')


app.use(cors())
app.use(express.json());
app.use('/api/auth',authRoutes);

app.use('/test',testRoutes)

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    
})