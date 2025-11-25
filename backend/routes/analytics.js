const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getDemandForecast, getRealTimeAnalytics } = require('../controllers/analyticsController');

// Admin routes for analytics (temporarily removed auth for testing)
router.route('/forecast')
  .get(getDemandForecast);

router.route('/realtime')
  .get(getRealTimeAnalytics);

module.exports = router;