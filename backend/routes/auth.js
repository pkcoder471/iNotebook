const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const { body } = require('express-validator');

router.post('/',[
    body('name','Enter a Valid name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
],authController.createUser);

module.exports = router;