const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

exports.signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '7d' });

exports.verifyToken = (token) => jwt.verify(token, SECRET);
