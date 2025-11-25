const User = require('../models/User');
const Donation = require('../models/Donation');

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all donations (admin)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find({})
      .populate('donor', 'name email role')
      .populate('claimedBy', 'name organizationName')
      .sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Block/unblock user (admin)
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent admin from blocking themselves
    if (user.role === 'admin' && req.user.id === user.id) {
      return res.status(400).json({ message: 'Cannot block yourself' });
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    res.json({ 
      message: `User ${user.isActive ? 'unblocked' : 'blocked'} successfully`,
      user 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get impact statistics (admin)
exports.getImpactStats = async (req, res) => {
  try {
    // Total donations
    const totalDonations = await Donation.countDocuments();
    
    // Total donors
    const totalDonors = await User.countDocuments({ role: 'donor' });
    
    // Total NGOs
    const totalNgos = await User.countDocuments({ role: 'ngo' });
    
    // Total delivered donations
    const deliveredDonations = await Donation.countDocuments({ status: 'delivered' });
    
    // Recently delivered donations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentDeliveries = await Donation.find({
      status: 'delivered',
      deliveredAt: { $gte: thirtyDaysAgo }
    });
    
    // Estimate people served (assuming 1 donation serves ~5 people)
    const peopleServed = deliveredDonations * 5;
    
    res.json({
      totalDonations,
      totalDonors,
      totalNgos,
      deliveredDonations,
      recentDeliveries: recentDeliveries.length,
      peopleServed
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get food quality statistics (admin)
exports.getFoodQualityStats = async (req, res) => {
  try {
    // Get donations with food quality assessments
    const donationsWithQuality = await Donation.find({
      'foodQuality.qualityScore': { $exists: true }
    });
    
    // Calculate average quality score
    let totalQualityScore = 0;
    let totalSpoilageRisk = 0;
    let safeForDonationCount = 0;
    let qualityLevelCounts = { excellent: 0, good: 0, fair: 0, poor: 0 };
    let spoilageLevelCounts = { low: 0, medium: 0, high: 0 };
    
    donationsWithQuality.forEach(donation => {
      totalQualityScore += donation.foodQuality.qualityScore;
      totalSpoilageRisk += donation.foodQuality.spoilageRisk;
      
      if (donation.foodQuality.isSafeForDonation) {
        safeForDonationCount++;
      }
      
      if (donation.foodQuality.qualityLevel) {
        qualityLevelCounts[donation.foodQuality.qualityLevel]++;
      }
      
      if (donation.foodQuality.spoilageLevel) {
        spoilageLevelCounts[donation.foodQuality.spoilageLevel]++;
      }
    });
    
    const averageQualityScore = donationsWithQuality.length > 0 ? 
      (totalQualityScore / donationsWithQuality.length).toFixed(1) : 0;
      
    const averageSpoilageRisk = donationsWithQuality.length > 0 ? 
      (totalSpoilageRisk / donationsWithQuality.length).toFixed(1) : 0;
      
    const safeDonationPercentage = donationsWithQuality.length > 0 ? 
      ((safeForDonationCount / donationsWithQuality.length) * 100).toFixed(1) : 0;
    
    res.json({
      totalAssessments: donationsWithQuality.length,
      averageQualityScore,
      averageSpoilageRisk,
      safeDonationPercentage,
      qualityLevelDistribution: qualityLevelCounts,
      spoilageLevelDistribution: spoilageLevelCounts
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};