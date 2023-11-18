const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Camera')


  const categorySchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
  }, { collection: 'category' });
  

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
