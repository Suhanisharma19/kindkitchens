const express = require('express');
const router = express.Router();
const { protect, ngo } = require('../middleware/authMiddleware');
const { 
  getNearbyDonations, 
  getNgoProfile, 
  updateNgoProfile 
} = require('../controllers/ngoController');

router.get('/nearby', protect, ngo, getNearbyDonations);
router.get('/profile', protect, ngo, getNgoProfile);
router.put('/profile', protect, ngo, updateNgoProfile);

module.exports = router;