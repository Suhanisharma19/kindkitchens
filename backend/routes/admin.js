const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  getAllUsers, 
  getAllDonations, 
  toggleUserStatus, 
  getImpactStats,
  getFoodQualityStats
} = require('../controllers/adminController');

router.get('/users', protect, admin, getAllUsers);
router.get('/donations', protect, admin, getAllDonations);
router.put('/users/:id/toggle', protect, admin, toggleUserStatus);
router.get('/stats', protect, admin, getImpactStats);
router.get('/food-quality-stats', protect, admin, getFoodQualityStats);

module.exports = router;