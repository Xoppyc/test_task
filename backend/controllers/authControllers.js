const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
  try {
    const token = await authService.signup(req.body);
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};
