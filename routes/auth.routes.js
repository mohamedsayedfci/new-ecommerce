const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', (req,res)=>authController.register(req,res));
router.post('/login', (req,res)=>authController.login(req,res));
router.post('/send-code', (req,res)=>authController.sendVerificationCode(req,res));
router.post('/verify-code', (req,res)=>authController.verifyCode(req,res));
router.get('/me', authMiddleware, (req,res)=>authController.me(req,res));
router.post('/change-password', authMiddleware, (req,res)=>authController.changePassword(req,res));

module.exports = router;
