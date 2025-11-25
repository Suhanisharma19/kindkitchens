const Donation = require('../models/Donation');
const User = require('../models/User');
const { assessFoodQuality, identifyFoodType, detectSpoilage } = require('../services/foodQualityService');
const path = require('path');

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { foodType, quantity, unit, expirationDate, address, location } = req.body;
    
    // Log incoming data for debugging
    console.log('Incoming donation data:', { foodType, quantity, unit, expirationDate, address, location });
    
    // Image will be handled by multer middleware
    const image = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';

    // Process location data - ensure it has coordinates if provided
    let locationData = undefined;
    if (location) {
      try {
        const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
        console.log('Parsed location:', parsedLocation);
        // Only include location if it has valid coordinates
        if (parsedLocation.coordinates && Array.isArray(parsedLocation.coordinates) && parsedLocation.coordinates.length === 2) {
          locationData = {
            type: parsedLocation.type || 'Point',
            coordinates: parsedLocation.coordinates
          };
          console.log('Valid location data:', locationData);
        } else {
          console.log('Invalid location data - missing or invalid coordinates');
        }
      } catch (parseError) {
        console.log('Error parsing location:', parseError);
      }
    }

    // Prepare donation data
    const donationData = {
      donor: req.user.id,
      foodType,
      quantity,
      unit,
      expirationDate,
      address: typeof address === 'string' ? JSON.parse(address) : address,
      image
    };

    // Only add location if it's valid
    if (locationData) {
      donationData.location = locationData;
    }
    
    console.log('Final donation data:', donationData);

    // If image is provided, perform automatic food quality assessment
    if (req.file) {
      try {
        const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
        console.log(`Performing automatic food quality assessment for image: ${imagePath}`);
        
        // Perform all analyses
        const [qualityResult, identificationResult, spoilageResult] = await Promise.all([
          assessFoodQuality(imagePath, foodType),
          identifyFoodType(imagePath),
          detectSpoilage(imagePath)
        ]);
        
        // Add food quality assessment results to donation data
        donationData.foodQuality = {
          qualityScore: qualityResult.qualityScore,
          qualityLevel: qualityResult.qualityLevel,
          isSafeForDonation: spoilageResult.spoilageLevel !== 'high',
          foodTypeIdentified: identificationResult.foodType,
          spoilageRisk: spoilageResult.spoilageRisk,
          spoilageLevel: spoilageResult.spoilageLevel
        };
        
        console.log('Food quality assessment completed:', donationData.foodQuality);
      } catch (qualityError) {
        console.error('Error during food quality assessment:', qualityError);
        // Continue with donation creation even if quality assessment fails
      }
    }

    const donation = await Donation.create(donationData);

    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all donations for a donor
exports.getDonorDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific donation by ID
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate('donor', 'name email phone')
      .populate('claimedBy', 'name organizationName phone');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if user is authorized to view this donation
    if (req.user.role !== 'admin' && 
        donation.donor.toString() !== req.user.id && 
        (donation.claimedBy && donation.claimedBy.toString() !== req.user.id)) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a donation
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if user is authorized to update this donation
    if (donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Prevent updating claimed donations
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Cannot update claimed donations' });
    }

    const { foodType, quantity, unit, expirationDate, address, location } = req.body;
    
    // Update fields
    donation.foodType = foodType || donation.foodType;
    donation.quantity = quantity || donation.quantity;
    donation.unit = unit || donation.unit;
    donation.expirationDate = expirationDate || donation.expirationDate;
    donation.address = address ? (typeof address === 'string' ? JSON.parse(address) : address) : donation.address;
    
    // Process location data for updates
    if (location) {
      const parsedLocation = typeof location === 'string' ? JSON.parse(location) : location;
      // Only update location if it has valid coordinates
      if (parsedLocation.coordinates && Array.isArray(parsedLocation.coordinates) && parsedLocation.coordinates.length === 2) {
        donation.location = {
          type: parsedLocation.type || 'Point',
          coordinates: parsedLocation.coordinates
        };
      }
    }
    
    // Handle image update
    if (req.file) {
      donation.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a donation
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if user is authorized to delete this donation
    if (donation.donor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Prevent deleting claimed donations
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Cannot delete claimed donations' });
    }

    await donation.remove();
    res.json({ message: 'Donation removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all available donations (for NGOs)
exports.getAvailableDonations = async (req, res) => {
  try {
    // Build filter
    const filter = { status: 'available' };
    
    // Add location filter if provided
    if (req.query.pincode) {
      filter['address.pincode'] = req.query.pincode;
    }
    
    // Add food type filter if provided
    if (req.query.foodType) {
      filter.foodType = new RegExp(req.query.foodType, 'i');
    }
    
    // Add urgency filter if provided
    if (req.query.urgency) {
      const urgencyValue = parseInt(req.query.urgency);
      filter.urgencyScore = { $gte: urgencyValue };
    }

    const donations = await Donation.find(filter)
      .populate('donor', 'name email phone address')
      .sort({ urgencyScore: -1, createdAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Claim a donation (NGO)
exports.claimDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if donation is available
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation is not available' });
    }

    // Update donation
    donation.status = 'claimed';
    donation.claimedBy = req.user.id;
    donation.claimedAt = new Date();

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update pickup status (NGO)
exports.updatePickupStatus = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Check if user is authorized to update this donation
    if (donation.claimedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { status } = req.body;

    // Validate status
    if (!['pickedup', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    donation.status = status;
    
    if (status === 'pickedup') {
      donation.pickedUpAt = new Date();
    } else if (status === 'delivered') {
      donation.deliveredAt = new Date();
    }

    const updatedDonation = await donation.save();
    res.json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get NGO's claimed donations
exports.getNgoDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ claimedBy: req.user.id })
      .populate('donor', 'name email phone address')
      .sort({ claimedAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};