const { verifyToken } = require('../config/jwt');

module.exports = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers?.startsWith('Bearer')) {
    return res
      .status(401)
      .json({ error: 'Invalid request, no token provided' });
  }

  try {
    req.user = verifyToken(headers.split(' ')[1]);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
