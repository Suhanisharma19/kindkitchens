const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middleware/authMiddleware');
const { assessQuality, identifyType, detectSpoilage, analyzeFood } = require('../controllers/foodQualityController');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes for food quality assessment
router.route('/assess')
  .post(protect, admin, upload.single('image'), assessQuality);

router.route('/identify')
  .post(protect, admin, upload.single('image'), identifyType);

router.route('/spoilage')
  .post(protect, admin, upload.single('image'), detectSpoilage);

router.route('/analyze')
  .post(protect, admin, upload.single('image'), analyzeFood);

module.exports = router;