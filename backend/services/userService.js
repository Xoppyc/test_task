const User = require('../models/User');

exports.getAll = async () => {
  return await User.find();
};

exports.getOne = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not found');
  return user;
};

exports.create = async (data) => {
  return await User.create(data);
};

exports.update = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

exports.remove = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};
