const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require('../services/userService');

exports.getAll = async (req, res, next) => {
  try {
    const users = await getAll();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const user = await getOne(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await update(req.params.id, req.body);
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const user = await remove(req.params.id);
    res.status(200).json({ message: 'User deleted', user });
  } catch (e) {
    next(e);
  }
};
