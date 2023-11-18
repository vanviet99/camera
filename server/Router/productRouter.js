const express = require('express');
const router = express.Router();
const middlewreController = require('../Controller/middlewreController')
const ProductController = require('../Controller/ProductController');
const multer = require('multer');
const { route } = require('./categoryRouter');
const upload = multer({ storage: multer.memoryStorage() }); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
router.post('/createProduct', upload.single('avatar'), ProductController.addProduct);
router.get('/getAllproduct', ProductController.getAllProduct);
router.post('/comment',middlewreController.verifyToken, ProductController.CommentProduct);
router.get('/:productId',ProductController.getOneProduct)

module.exports = router;


