require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();

connectDB();

app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));

// global error catcher
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err ?? 'Server error' });
});

// unhandled promises rejection
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});

console.log(`launching at ${process.env.PORT}`);
app.listen(process.env.PORT ?? 3000);
