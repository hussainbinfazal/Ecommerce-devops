const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean , default: false},
  profileImage: {type: String, required: false},
  phoneNumber:{type:String},
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});
const User = mongoose.model('User', userSchema);
module.exports = User;