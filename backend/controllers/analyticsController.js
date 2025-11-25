const Donation = require('../models/Donation');
const User = require('../models/User');

// Get predictive demand forecasting data
exports.getDemandForecast = async (req, res) => {
  try {
    console.log('Fetching demand forecast data');
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Get all donations from the past year
    const donations = await Donation.find({
      createdAt: { $gte: oneYearAgo }
      // For testing, include all donations regardless of status
      // status: { $in: ['claimed', 'pickedup', 'delivered'] }
    }).populate('donor', 'address');
    
    console.log(`Found ${donations.length} donations for analysis (including all statuses)`);

    // 1. Peak donation times analysis
    const hourlyData = Array(24).fill(0);
    const dailyData = Array(7).fill(0);
    const monthlyData = Array(12).fill(0);

    donations.forEach(donation => {
      const hour = donation.createdAt.getHours();
      const day = donation.createdAt.getDay();
      const month = donation.createdAt.getMonth();
      
      hourlyData[hour]++;
      dailyData[day]++;
      monthlyData[month]++;
    });

    // 2. Popular food types analysis
    const foodTypeCount = {};
    donations.forEach(donation => {
      const foodType = donation.foodType.toLowerCase();
      foodTypeCount[foodType] = (foodTypeCount[foodType] || 0) + 1;
    });

    // Sort food types by frequency
    const sortedFoodTypes = Object.entries(foodTypeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([type, count]) => ({ type, count }));

    // 3. Geographic demand patterns
    const pincodeCount = {};
    donations.forEach(donation => {
      const pincode = donation.address.pincode;
      if (pincode) {
        pincodeCount[pincode] = (pincodeCount[pincode] || 0) + 1;
      }
    });

    // Sort pincodes by frequency
    const sortedPincodes = Object.entries(pincodeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([pincode, count]) => ({ pincode, count }));

    // 4. Seasonal variations
    const seasonalData = {
      'Winter (Dec-Feb)': 0,
      'Spring (Mar-May)': 0,
      'Summer (Jun-Aug)': 0,
      'Autumn (Sep-Nov)': 0
    };

    donations.forEach(donation => {
      const month = donation.createdAt.getMonth();
      if (month >= 11 || month <= 1) {
        seasonalData['Winter (Dec-Feb)']++;
      } else if (month >= 2 && month <= 4) {
        seasonalData['Spring (Mar-May)']++;
      } else if (month >= 5 && month <= 7) {
        seasonalData['Summer (Jun-Aug)']++;
      } else {
        seasonalData['Autumn (Sep-Nov)']++;
      }
    });

    res.json({
      peakTimes: {
        hourly: hourlyData,
        daily: dailyData,
        monthly: monthlyData
      },
      popularFoodTypes: sortedFoodTypes,
      geographicPatterns: sortedPincodes,
      seasonalVariations: seasonalData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get real-time analytics for dashboard
exports.getRealTimeAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfDay);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Today's donations
    const todayDonations = await Donation.countDocuments({
      createdAt: { $gte: startOfDay }
    });

    // This week's donations
    const weekDonations = await Donation.countDocuments({
      createdAt: { $gte: startOfWeek }
    });

    // This month's donations
    const monthDonations = await Donation.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Total donations
    const totalDonations = await Donation.countDocuments();

    // Active donors
    const activeDonors = await User.countDocuments({ role: 'donor', isActive: true });

    // Active NGOs
    const activeNgos = await User.countDocuments({ role: 'ngo', isActive: true });

    res.json({
      today: todayDonations,
      thisWeek: weekDonations,
      thisMonth: monthDonations,
      total: totalDonations,
      activeDonors,
      activeNgos
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};