const Product = require('../models/product.model');

class ProductService {
  async create(data) {
    const p = new Product(data);
    return await p.save();
  }

  async findAll() {
    return await Product.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductService();
