const router = require('express').Router();
const { signin, signup } = require('../controllers/authControllers');

router.post('/signup', signup);
router.post('/login', signin);

module.exports = reouter;
