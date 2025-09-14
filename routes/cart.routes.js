const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/add', auth, (req,res)=>cartController.addItem(req,res));
router.post('/update', auth, (req,res)=>cartController.updateItem(req,res));
router.post('/remove', auth, (req,res)=>cartController.removeItem(req,res));
router.get('/', auth, (req,res)=>cartController.getCart(req,res));
router.post('/clear', auth, (req,res)=>cartController.clear(req,res));

module.exports = router;
