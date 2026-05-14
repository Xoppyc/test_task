const router = require('express').Router();
const ctrl = require('../controllers/bookController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/books', authenticate, ctrl.getAll);
router.post('/books', authenticate, ctrl.getOne);
router.get('/books/:id', authenticate, authorize('admin'), ctrl.create);
router.put('/books/:id', authenticate, authorize('admin'), ctrl.update);
router.delete('/books/:id', authenticate, authorize('admin'), ctrl.remove);

module.exports = router;
