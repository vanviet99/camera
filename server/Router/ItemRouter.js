const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const itemController = require('../Controller/itemController')

const {upload} = require('../upload.config');

router.post('/createItem',upload.single('file'), itemController.addItem);


module.exports = router;


