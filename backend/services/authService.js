const User = require('../models/User');
const bcrypt = require('bcrypt');
const { signToken } = require('../config/jwt');

exports.signup = async ({ name, email, password }) => {
  const isExisting = await User.findOne({ email });
  if (isExisting) throw new Error('email address is already in use');

  const user = await User.create({ name, email, password });
  return signToken(user);
};

exports.signin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error(`account with this address doesn't exist`);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('invalid credentials');

  return signToken(user);
};
