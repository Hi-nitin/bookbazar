const express = require('express')
const router = express.Router();
const { signupValidator,loginValidator } = require('../validator/authValidator');
const validatorMiddleware = require('../middleware/validatormiddleware')
const authController = require('../controllers/authController')


router.post('/signup', signupValidator, validatorMiddleware, authController.signup)
router.post('/login',loginValidator,validatorMiddleware,authController.login)

module.exports = router;