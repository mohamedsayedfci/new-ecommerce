const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, (req,res)=>orderController.create(req,res));
router.get('/', auth, (req,res)=>orderController.getAll(req,res));
router.get('/:id', auth, (req,res)=>orderController.getOne(req,res));
router.put('/:id', auth, (req,res)=>orderController.update(req,res));
router.delete('/:id', auth, (req,res)=>orderController.delete(req,res));

module.exports = router;
