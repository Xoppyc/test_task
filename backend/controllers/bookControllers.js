const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = require('../services/bookService');

exports.getAll = async (req, res, next) => {
  try {
    const books = await getAll();
    res.status(200).json(books);
  } catch (e) {
    next(e);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const book = await getOne(req.params.id);
    res.status(200).json(book);
  } catch (e) {
    next(e);
  }
};

exports.create = async (req, res, next) => {
  try {
    const book = await create(req.body);
    res.status(201).json(book);
  } catch (e) {
    next(e);
  }
};

exports.update = async (req, res, next) => {
  try {
    const book = await update(req.params.id, req.body);
    res.status(200).json(book);
  } catch (e) {
    next(e);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const book = await remove(req.params.id);
    res.status(200).json({ message: 'Book deleted', book });
  } catch (e) {
    next(e);
  }
};
