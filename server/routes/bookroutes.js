const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createBook ,deleteBook,getBook} = require("../controllers/bookcontroller");
const { createBookValidator } = require('../validator/bookinfoValidator');
const validatorMiddleware = require('../middleware/validatormiddleware');


router.post('/createbook', authMiddleware, uploadMiddleware.fields([{ name: "mainImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 3 },
    ]), createBookValidator, validatorMiddleware, createBook
);

router.delete('/deletebook',deleteBook);
router.get('/getmybook',getBook);
module.exports = router;