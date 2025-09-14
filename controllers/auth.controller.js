const authService = require('../services/auth.service');
class AuthController {
  async register(req,res){ try{ const user = await authService.register(req.body); res.status(201).json({ user }); }catch(e){ res.status(400).json({ error: e.message }); } }
  async login(req,res){ try{ const { user, token } = await authService.login(req.body); res.json({ user, token }); }catch(e){ res.status(400).json({ error: e.message }); } }
  async sendVerificationCode(req,res){ try{ const email = req.body.email; if(!email) return res.status(400).json({ error:'Email required' }); const result = await authService.sendEmailVerificationCode(email); res.json(result);}catch(e){ res.status(400).json({ error: e.message }); } }
  async verifyCode(req,res){ try{ const { email, code } = req.body; if(!email||!code) return res.status(400).json({ error:'Email and code required' }); const result = await authService.verifyEmailCode(email,code); res.json(result);}catch(e){ res.status(400).json({ error: e.message }); } }
  async me(req,res){ res.json({ userId: req.userId }); }
  async changePassword(req,res){ try{ const userId = req.userId; const { oldPassword, newPassword } = req.body; await authService.changePassword(userId, oldPassword, newPassword); res.json({ ok: true }); }catch(e){ res.status(400).json({ error: e.message }); } }
}
module.exports = new AuthController();
