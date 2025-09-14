const orderService = require('../services/order.service');
const cartService = require('../services/cart.service');
class OrderController {
  async create(req,res){
    try{
      const userId = req.userId || req.body.userId;
      const cart = cartService.getCart(userId);
      if(!cart.length) return res.status(400).json({ error: 'Cart empty' });
      const order = await orderService.createFromCart(userId, cart, req.body.stripePaymentIntentId);
      cartService.clear(userId);
      res.status(201).json(order);
    }catch(e){ res.status(400).json({ error: e.message }); }
  }
  async getAll(req,res){ res.json(await orderService.findAll()); }
  async getOne(req,res){ res.json(await orderService.findById(req.params.id)); }
  async update(req,res){ res.json(await orderService.update(req.params.id, req.body)); }
  async delete(req,res){ res.json(await orderService.delete(req.params.id)); }
}
module.exports = new OrderController();
