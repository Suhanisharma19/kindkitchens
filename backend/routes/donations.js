const express = require('express');
const router = express.Router();
const { protect, donor, ngo } = require('../middleware/authMiddleware');
const { 
  createDonation, 
  getDonorDonations, 
  getDonationById, 
  updateDonation, 
  deleteDonation, 
  getAvailableDonations, 
  claimDonation, 
  updatePickupStatus,
  getNgoDonations
} = require('../controllers/donationController');
const multer = require('multer');
const path = require('path');

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

// Donor routes
router.route('/')
  .post(protect, donor, upload.single('image'), createDonation)
  .get(protect, donor, getDonorDonations);

// NGO routes
router.get('/available', protect, ngo, getAvailableDonations);
router.get('/ngo', protect, ngo, getNgoDonations);
router.put('/:id/claim', protect, ngo, claimDonation);
router.put('/:id/status', protect, ngo, updatePickupStatus);

// General routes
router.route('/:id')
  .get(protect, getDonationById)
  .put(protect, donor, upload.single('image'), updateDonation)
  .delete(protect, donor, deleteDonation);

module.exports = router;