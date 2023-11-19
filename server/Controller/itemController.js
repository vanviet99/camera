const itemModel = require('../Modal/ItemModal')
const productModel = require("../Modal/productModal")
const path = require('path');
const itemController = {
    addItem: async (req, res) => {
        try {
            const newData = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            };

            if (req.file) {
                const filePath = req.file.path;
                const fileUrl = `http://localhost:${process.env.PORT}/uploads/${path.basename(filePath)}`;
                newData.image = fileUrl;
            }
            const newItem = await itemModel.create(newData);

            const productId = req.body.productId;

            const productOne = await productModel.findOne({ _id: productId });

            if (!productOne) {
                return res.status(404).json({ message: 'Product not found' });
            }
            productOne.itemProductId.push(newItem._id);

            await productOne.save();

            res.status(200).json({ message: 'Thêm thành công', data: productOne });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


}

module.exports = itemController