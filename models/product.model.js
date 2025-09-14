const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  mainImage: { type: String }, // single main image path
  gallery: [String], // multiple images paths
}, { timestamps: true });

// ✅ تحويل المسارات إلى full URL عند التحويل لـ JSON
productSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    if (ret.mainImage) {
      ret.mainImage = `${baseUrl}/${ret.mainImage}`;
    }

    if (ret.gallery && Array.isArray(ret.gallery)) {
      ret.gallery = ret.gallery.map(img => `${baseUrl}/${img}`);
    }

    return ret;
  }
});

module.exports = mongoose.model('Product', productSchema);
