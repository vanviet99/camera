const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const authController = require('../Controller/authController');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() }); 
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); 
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); 
//     },
//   });
router.post('/register', authController.registerUser);
router.get('/userInfo/:_id', authController.getUserInfo);
router.post('/login', authController.loginUser);
router.post('/refreshToken',authController.refreshToken)
router.patch('/logout',authController.logout)

module.exports = router;


