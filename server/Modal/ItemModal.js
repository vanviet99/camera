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
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: Buffer,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
}, { collection: 'item' });


const ItemModal = mongoose.model('item', itemSchema);

module.exports = ItemModal;
