const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  pageCount: { type: Number, required: true, min: 1 },
});

module.exports = mongoose.model('Book', bookSchema);
