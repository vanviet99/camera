const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const ProductController = require('../Controller/ProductController');
const {upload} = require('../upload.config');

router.post('/createProduct', upload.single('file'), ProductController.addProduct);
router.get('/getAllproduct', ProductController.getAllProduct);
router.post('/comment',middlewreController.verifyToken, ProductController.CommentProduct);
router.get('/:productId',ProductController.getOneProduct)

module.exports = router;


