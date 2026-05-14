const router = require('express').Router();
const ctrl = require('../controllers/userControllers');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.get('/users', authenticate, ctrl.getAll);
router.post('/users', authenticate, ctrl.getOne);
router.get('/users/:id', authenticate, authorize('admin'), ctrl.create);
router.put('/users/:id', authenticate, authorize('admin'), ctrl.update);
router.delete('/users/:id', authenticate, authorize('admin'), ctrl.remove);

module.exports = router;
