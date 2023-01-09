const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  materialName: { type: String, required: true },
  image: { type: String, required: true },
  onSale: { type: Boolean, required: true },
  onTop: { type: Boolean, required: true },
  outOfStock: { type: Boolean, required: true },
});

module.exports = mongoose.model('Product', productSchema);
