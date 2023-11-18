const mongoose = require('mongoose');
const category = require('./categoryModal')
const item = require('./ItemModal')
const user = require('./userModal')
mongoose.connect('mongodb://127.0.0.1:27017/Camera')
 

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sale: {
    type: String,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  itemProductId: {
    type: [
        {
            userId: {
                type: String,
                ref: 'item'
            },
           
        }
    ],
    default: []
},
  Comment: {
    type: [{
        userId: {
            type: String,
            ref: 'user'
        },
        cmt: String,
        created_at: Date
    }],
    default: []
},

  categoryId: {
    type: String,
    ref: 'category',
    required: true
  }
}, { collection: 'product' });


const productModel = mongoose.model('product', productSchema);
// productModel.findOne({ _id: '6554e5312bf58bc3269bc54b' })
//     .populate('itemProductId')  
//     .lean()
//     .then(async (data) => {
//         for (let i = 0; i < data.itemProductId.length; i++) {
//             const itemId = data.itemProductId[i];
//             const itemData = await item.findOne({ _id: itemId }).lean();
//             data.itemProductId[i] = itemData;
//         }

//         console.log('itemProductId:', data.itemProductId);
//     })
//     .catch((err) => console.log(err));



module.exports = productModel;
