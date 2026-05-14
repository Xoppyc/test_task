const authService = require('../services/authService');

// I really don't know if it's a good practice,
exports.signup = async (req, res, next) => {
  try {
    const { token, user } = await authService.signup(req.body);
    res.status(201).json({ token, user });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.status(200).json({ token, user });
  } catch (e) {
    next(e);
  }
};
