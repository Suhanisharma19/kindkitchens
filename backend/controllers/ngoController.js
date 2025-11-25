const User = require('../models/User');
const Donation = require('../models/Donation');

// Get nearby donations based on pincode
exports.getNearbyDonations = async (req, res) => {
  try {
    const { pincode, limit = 10 } = req.query;
    
    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }

    const donations = await Donation.find({
      'address.pincode': pincode,
      status: 'available'
    })
    .populate('donor', 'name email phone address')
    .limit(parseInt(limit))
    .sort({ createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get NGO profile
exports.getNgoProfile = async (req, res) => {
  try {
    const ngo = await User.findById(req.user.id).select('-password');
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update NGO profile
exports.updateNgoProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phone', 'address', 'organizationName', 'licenseNumber'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates!' });
    }

    const ngo = await User.findById(req.user.id);
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }

    updates.forEach(update => ngo[update] = req.body[update]);
    await ngo.save();

    res.json(ngo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};