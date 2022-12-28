const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { body } = require('express-validator');

router.post('/createuser',[
    body('name','Enter a Valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],authController.createUser);

router.post('/login',[
    body('email').isEmail(),
    body('password',"Password cannot be blank").exists(),
],authController.login)
module.exports = router;