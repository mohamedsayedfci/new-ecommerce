const Order = require('../models/order.model');
const Product = require('../models/product.model');
class OrderService {
  async create(orderData){ return await Order.create(orderData); }
  async findAll(){ return await Order.find().populate('user').populate('items.product'); }
  async findById(id){ return await Order.findById(id).populate('user').populate('items.product'); }
  async update(id,data){ return await Order.findByIdAndUpdate(id,data,{new:true}); }
  async delete(id){ return await Order.findByIdAndDelete(id); }
  async createFromCart(userId, cartItems, stripePaymentIntentId){ 
    let items = [], total = 0;
    for(const it of cartItems){
      const p = await Product.findById(it.productId);
      if(!p) throw new Error('Product not found ' + it.productId);
      const price = p.price;
      items.push({ product: p._id, qty: it.qty, price });
      total += price * it.qty;
    }
    const order = await Order.create({ user: userId, items, total, status: 'pending', stripePaymentIntentId });
    return order;
  }
}
module.exports = new OrderService();
