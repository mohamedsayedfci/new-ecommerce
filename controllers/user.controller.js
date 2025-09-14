const userService = require('../services/user.service');
class UserController{
  async create(req,res){ try{ const u = await userService.create(req.body); res.status(201).json(u);}catch(e){ res.status(400).json({ error: e.message }); } }
  async getAll(req,res){ res.json(await userService.findAll()); }
  async getOne(req,res){ res.json(await userService.findById(req.params.id)); }
  async update(req,res){ res.json(await userService.update(req.params.id, req.body)); }
  async delete(req,res){ res.json(await userService.delete(req.params.id)); }
}
module.exports = new UserController();
