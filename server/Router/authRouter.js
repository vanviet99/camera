const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const authController = require('../Controller/authController');

router.post('/register', authController.registerUser);
router.get('/userInfo/:_id', authController.getUserInfo);
router.post('/login', authController.loginUser);
router.post('/refreshToken',authController.refreshToken)
router.patch('/logout',authController.logout)

module.exports = router;


