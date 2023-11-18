const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const categoryController = require('../Controller/categoryController');

router.post('/createCategory', categoryController.addCategory);


module.exports = router;


