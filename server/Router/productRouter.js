const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const ProductController = require('../Controller/ProductController');
const fileUploader = require('../cloudinary.config');

router.post('/createProduct', fileUploader.single('file'), ProductController.addProduct);
router.get('/getAllproduct', ProductController.getAllProduct);
router.post('/comment',middlewreController.verifyToken, ProductController.CommentProduct);
router.get('/:productId',ProductController.getOneProduct)

module.exports = router;


