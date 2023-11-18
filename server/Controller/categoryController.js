const category =require('../Modal/categoryModal')

const categoryController = {
    addCategory: async (req, res) => {
        try {
            const existingCategory = await category.findOne({ name: req.body.name });
    
            if (existingCategory) {
                return res.status(400).json({ message: 'Lỗi: Danh mục đã tồn tại' });
            }
    
            const newCategory = await category.create({
                name: req.body.name,
            });
    
            res.status(200).json({ message: 'Thêm thành công', data: newCategory });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = categoryController