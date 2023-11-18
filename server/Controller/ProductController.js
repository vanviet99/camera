const productModal = require('../Modal/productModal')
const categoryModel = require('../Modal/categoryModal')
const removeDiacritics = require('remove-diacritics');
const item = require('../Modal/ItemModal');
const ProductController = {
    addProduct: async (req, res) => {
        try {
            const newData = {
                categoryId: req.body.categoryId,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                sale: req.body.sale,

            }
            if (req.file) {
                newData.image = req.file.buffer.toString('base64');
            }
            let data = await productModal.create(newData);
            res.status(200).json({ message: 'Thêm thành công', data: data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllProduct: async (req, res) => {
        try {
            let page = parseInt(req.query.page) || 1;
            let perPage = parseInt(req.query.perPage) || 10;
            let minPrice = parseInt(req.query.minPrice) || undefined;
            let maxPrice = parseInt(req.query.maxPrice) || undefined;
            let productName = req.query.productName || undefined;
            let sale = req.query.sale || undefined;
            let categoryId = req.query.categoryId || undefined;

            if (page < 1) {
                page = 1;
            }

            if (perPage < 1) {
                perPage = 10;
            }

            let query = {};

            if (minPrice !== undefined && maxPrice !== undefined) {
                query.price = { $gte: minPrice, $lte: maxPrice };
            } else if (minPrice !== undefined) {
                query.price = { $gte: minPrice };
            } else if (maxPrice !== undefined) {
                query.price = { $lte: maxPrice };
            }

            if (productName !== undefined) {
                const cleanedProductName = removeDiacritics(productName).trim();
                query.name = new RegExp(cleanedProductName, 'i');
            }

            if (sale !== undefined) {
                query.sale = { $gt: "0" };  // Lọc sale lớn hơn 0
            }

            if (categoryId !== undefined) {
                query.categoryId = categoryId;
            }

            let data = await productModal.find(query)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .populate('categoryId');  // Thêm populate nếu cần

            res.status(200).json({ message: "success", data: data });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    CommentProduct: async (req, res) => {
        try {
            const productOne = await productModal.findOne({
                _id: req.body.productId
            });

            if (!productOne) {
                return res.status(404).json({ message: 'Product not found' });
            }

            productOne.Comment.push({
                userId: req.user.userId,
                cmt: req.body.cmt,
                created_at: new Date()
            });

            await productOne.save();

            res.status(200).json({
                message: 'Success',
                data: productOne
            });
        } catch (error) {
            res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },
    loadItemData :async(itemIds)=>{
        const itemDataArray = [];

        for (let i = 0; i < itemIds.length; i++) {
            const itemId = itemIds[i];
            const itemData = await item.findOne({ _id: itemId }).lean();
            itemDataArray.push(itemData);
        }
    
        return itemDataArray;
    },
    getOneProduct: async (req, res) => {
        try {
            const productId = req.params.productId;
            const data = await productModal.findOne({ _id: productId })
                .populate('Comment.userId')
                .populate('itemProductId') 
                .lean();
    
            if (!data) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            
            const commentsWithUsername = data.Comment.map(comment => {
                return {
                    userId: comment.userId ? comment.userId._id : null,
                    username: comment.userId ? comment.userId.username : null,
                    cmt: comment.cmt,
                    created_at: comment.created_at,
                    _id: comment._id
                };
            });
    
            const itemDataArray = await ProductController.loadItemData(data.itemProductId);
            const items = itemDataArray.map(item => {
                return {
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    image:item.image,
                    description:item.description
                };
            });
            const productData = {
                _id: data._id,
                name: data.name,
                image: data.image,
                description: data.description,
                price: data.price,
                sale: data.sale,
                created_at: data.created_at,
                itemProductId: items,
                categoryId: data.categoryId,
                Comment: commentsWithUsername
            };
    
            res.status(200).json(productData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    

}


module.exports = ProductController