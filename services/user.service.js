const User = require('../models/user.model');
class UserService {
  async create(data){ return await User.create(data); }
  async findAll(){ return await User.find(); }
  async findById(id){ return await User.findById(id); }
  async update(id,data){ return await User.findByIdAndUpdate(id,data,{new:true}); }
  async delete(id){ return await User.findByIdAndDelete(id); }
}
module.exports = new UserService();
