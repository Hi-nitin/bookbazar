const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/uploadMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");
const { createBook, deleteBook, getthisBook, getmyBook, updateBook, getallBook } = require("../controllers/bookcontroller");
const { createBookValidator } = require('../validator/bookinfoValidator');
const validatorMiddleware = require('../middleware/validatormiddleware');


router.post('/createbook', authMiddleware, uploadMiddleware.fields([{ name: "mainImage", maxCount: 1 },
{ name: "additionalImages", maxCount: 3 },
]), createBookValidator, validatorMiddleware, createBook
);

router.delete('/deletebook', authMiddleware, deleteBook);

router.get('/getthisbook/:bookid', authMiddleware, getthisBook);

router.get('/getallbook', authMiddleware, getallBook);

router.get('/getmybook', authMiddleware, getmyBook);

router.post('/updatebook', authMiddleware, uploadMiddleware.fields([{ name: "mainImage", maxCount: 1 },
{ name: "additionalImages", maxCount: 3 },
]), updateBook);



module.exports = router;