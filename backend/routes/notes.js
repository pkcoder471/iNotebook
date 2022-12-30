const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const fetchUser = require('../middleware/fetchUser');
const { body } = require('express-validator');

router.get('/fetchallnotes',fetchUser,notesController.fetchallnotes);


router.post('/addnote',fetchUser,[
    body('title','Enter a Valid Title').isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 }),
],notesController.addnote);

router.put('/updatenote/:id',fetchUser,notesController.updatenote);

router.delete('/deletenote/:id',fetchUser,notesController.deletenote);




module.exports = router;