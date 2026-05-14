const Book = require('../models/Book');

exports.getAll = async () => {
  return await Book.find();
};

exports.getOne = async (id) => {
  const book = await Book.findById(id);
  if (!book) throw new Error('Book not found');
  return book;
};

exports.create = async (data) => {
  return await Book.create(data);
};

exports.update = async (id, data) => {
  const book = await Book.findByIdAndUpdate(id, data, { new: true });
  if (!book) throw new Error('Book not found');
  return book;
};

exports.remove = async (id) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) throw new Error('Book not found');
  return book;
};
