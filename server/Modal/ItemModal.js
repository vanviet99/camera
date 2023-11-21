const mongoose = require('mongoose');
const product = require('./productModal')
mongoose.connect('mongodb://127.0.0.1:27017/Camera')


const itemSchema = mongoose.Schema({
  // productId: {
  //   type: String,
  //   ref: 'product'
  // },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
}, { collection: 'item' });


const ItemModal = mongoose.model('item', itemSchema);

module.exports = ItemModal;
