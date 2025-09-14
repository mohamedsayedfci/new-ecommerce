const categoryService = require('../services/category.service');
class CategoryController{
  async create(req,res){ try{ const c = await categoryService.create(req.body); res.status(201).json(c);}catch(e){ res.status(400).json({ error: e.message }); } }
  async getAll(req,res){ res.json(await categoryService.findAll()); }
  async getOne(req,res){ res.json(await categoryService.findById(req.params.id)); }
  async update(req,res){ res.json(await categoryService.update(req.params.id, req.body)); }
  async delete(req,res){ res.json(await categoryService.delete(req.params.id)); }
}
module.exports = new CategoryController();
