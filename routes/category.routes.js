const router = require('express').Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth, categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.put('/:id', auth, categoryController.update);
router.delete('/:id', auth, categoryController.delete);

module.exports = router;
