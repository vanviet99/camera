const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const itemController = require('../Controller/itemController')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
router.post('/createItem',upload.single('avatar'), itemController.addItem);


module.exports = router;


