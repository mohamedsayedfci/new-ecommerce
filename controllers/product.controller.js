const productService = require('../services/product.service');

class ProductController {
  async create(req, res) {
    try {
      const { name, description, price, category } = req.body;
      const mainImage = req.files && req.files['mainImage'] ? '/uploads/products/' + req.files['mainImage'][0].filename : null;
      const gallery = req.files && req.files['gallery'] ? req.files['gallery'].map(f => '/uploads/products/' + f.filename) : [];
      const product = await productService.create({ name, description, price, category, mainImage, gallery });
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async list(req, res) {
    const items = await productService.findAll();
    res.json(items);
  }

  async get(req, res) {
    const item = await productService.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  }

  async update(req, res) {
    try {
      const data = req.body;
      if (req.files && req.files['mainImage']) data.mainImage = '/uploads/products/' + req.files['mainImage'][0].filename;
      if (req.files && req.files['gallery']) data.gallery = req.files['gallery'].map(f => '/uploads/products/' + f.filename);
      const updated = await productService.update(req.params.id, data);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async remove(req, res) {
    await productService.remove(req.params.id);
    res.json({ ok: true });
  }
}

module.exports = new ProductController();
