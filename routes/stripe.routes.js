const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const auth = require('../middlewares/auth.middleware');
const cartService = require('../services/cart.service');
const Product = require('../models/product.model');

router.post('/create-payment-intent', auth, async (req,res)=>{
  try{
    const userId = req.userId;
    const cart = cartService.getCart(userId);
    if(!cart.length) return res.status(400).json({ error: 'Cart empty' });
    let amount = 0;
    for(const it of cart){
      const p = await Product.findById(it.productId);
      if(!p) return res.status(400).json({ error: 'Product not found ' + it.productId });
      amount += p.price * it.qty;
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment', userId }
    });
    res.json({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id });
  }catch(e){ res.status(400).json({ error: e.message }); }
});

module.exports = router;
