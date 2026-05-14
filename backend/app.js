const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json());

app.use('api/auth', require('./routes/auth'));
app.use('api/users', require('./routes/users'));
app.use('api/books', require('./routes/books'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err ?? 'Server error' });
});

app.listen(process.env.PORT ?? 3000);
