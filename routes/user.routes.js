const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');

router.use(logger);

router.post('/', userController.create);
router.get('/', auth, userController.getAll);
router.get('/:id', auth, userController.getOne);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.delete);

module.exports = router;
