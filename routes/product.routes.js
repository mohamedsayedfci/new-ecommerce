const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const productController = require('../controllers/product.controller');

// fields: mainImage (single), gallery (multiple)
router.post('/', upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), productController.create);
router.get('/', productController.list);
router.get('/:id', productController.get);
router.put('/:id', upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
