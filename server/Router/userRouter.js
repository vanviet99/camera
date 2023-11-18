const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const multer = require('multer');
const password =require('../Controller/userController')
const upload = multer({ storage: multer.memoryStorage() }); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
router.post('/sencode', password.sendAuthCode);
router.post('/changepassword',password.changePassword)
router.patch('/updateser',middlewreController.verifyToken,upload.single('avatar'),password.updateUser)

module.exports = router;


