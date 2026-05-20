const express = require('express');
const authUser = require('../middleware/authmiddleware');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authUser);

router.use((req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  next();
});

router.get('/overview', adminController.getAdminOverview);

module.exports = router;
