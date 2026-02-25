const express = require('express')
const router = express.Router();

const authMiddleware=require('../middleware/authMiddleware')

router.get('/',authMiddleware.authMiddleware,(req,res)=>{

  
    
})


module.exports = router;