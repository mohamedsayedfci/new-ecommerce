const cartService = require('../services/cart.service');
class CartController{
  addItem(req,res){ const userId = req.userId || req.body.userId; const { productId, qty } = req.body; const cart = cartService.addItem(userId, productId, qty||1); res.json(cart); }
  updateItem(req,res){ const userId = req.userId || req.body.userId; const { productId, qty } = req.body; const cart = cartService.updateItem(userId, productId, qty||1); res.json(cart); }
  removeItem(req,res){ const userId = req.userId || req.body.userId; const { productId } = req.body; const cart = cartService.removeItem(userId, productId); res.json(cart); }
  getCart(req,res){ const userId = req.userId || req.query.userId; res.json(cartService.getCart(userId)); }
  clear(req,res){ const userId = req.userId || req.body.userId; cartService.clear(userId); res.json({ ok:true }); }
}
module.exports = new CartController();
