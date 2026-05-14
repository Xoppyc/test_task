const User = require('../models/User');
const bcrypt = require('bcrypt');
const { signToken } = require('../config/jwt');

exports.signup = async ({ name, email, password }) => {
  const isExisting = await User.findOne({ email });
  if (isExisting) throw new Error('email address is already in use');
  const user = await User.create({ name, email, password });
  return {
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error(`account with this address doesn't exist`);
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('invalid credentials');
  return {
    token: signToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  };
};
