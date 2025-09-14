// Simple in-memory cart store per user (demo only). Use Redis or DB for production.
const carts = new Map(); // userId -> [{productId, qty}]

class CartService {
  addItem(userId, productId, qty=1){
    const cur = carts.get(String(userId)) || [];
    const idx = cur.findIndex(i => i.productId === productId);
    if(idx === -1) cur.push({ productId, qty });
    else cur[idx].qty += qty;
    carts.set(String(userId), cur);
    return cur;
  }
  updateItem(userId, productId, qty){
    const cur = carts.get(String(userId)) || [];
    const idx = cur.findIndex(i => i.productId === productId);
    if(idx === -1) { cur.push({ productId, qty }); }
    else cur[idx].qty = qty;
    carts.set(String(userId), cur);
    return cur;
  }
  removeItem(userId, productId){
    const cur = carts.get(String(userId)) || [];
    const next = cur.filter(i => i.productId !== productId);
    carts.set(String(userId), next);
    return next;
  }
  getCart(userId){
    return carts.get(String(userId)) || [];
  }
  clear(userId){ carts.delete(String(userId)); }
}

module.exports = new CartService();
