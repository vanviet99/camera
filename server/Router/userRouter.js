const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const password =require('../Controller/userController')
const {upload} = require('../upload.config');

router.post('/sencode', password.sendAuthCode);
router.post('/changepassword',password.changePassword)
router.patch('/updateser',middlewreController.verifyToken,upload.single('file'),password.updateUser)

module.exports = router;


