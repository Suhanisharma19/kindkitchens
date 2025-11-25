const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodType: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'grams', 'pieces', 'liters', 'packets']
  },
  expirationDate: {
    type: Date,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  location: {
    type: {
      type: String
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  image: {
    type: String, // URL to the uploaded image
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'pickedup', 'delivered', 'expired'],
    default: 'available'
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  claimedAt: {
    type: Date
  },
  pickedUpAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  urgencyScore: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  qualityCheckPassed: {
    type: Boolean,
    default: true
  },
  qualityCheckNotes: {
    type: String
  },
  // Food quality assessment results
  foodQuality: {
    type: {
      qualityScore: {
        type: Number,
        min: 0,
        max: 10
      },
      qualityLevel: {
        type: String,
        enum: ['excellent', 'good', 'fair', 'poor', 'unknown']
      },
      isSafeForDonation: {
        type: Boolean,
        default: true
      },
      foodTypeIdentified: {
        type: String
      },
      spoilageRisk: {
        type: Number,
        min: 0,
        max: 100
      },
      spoilageLevel: {
        type: String,
        enum: ['low', 'medium', 'high']
      }
    }
  }
}, {
  timestamps: true
});

// Index for location-based queries
donationSchema.index({ location: '2dsphere' });

// Calculate urgency score before saving
donationSchema.pre('save', async function() {
  // In Mongoose 9+, we don't need to pass next as a parameter
  if (this.expirationDate) {
    const hoursUntilExpiry = (this.expirationDate - new Date()) / (1000 * 60 * 60);
    
    if (hoursUntilExpiry <= 2) {
      this.urgencyScore = 10; // High priority
    } else if (hoursUntilExpiry <= 6) {
      this.urgencyScore = 8;
    } else if (hoursUntilExpiry <= 12) {
      this.urgencyScore = 6;
    } else if (hoursUntilExpiry <= 24) {
      this.urgencyScore = 4;
    } else {
      this.urgencyScore = 2; // Low priority
    }
  }
  // In Mongoose 9+, we don't need to call next()
});

module.exports = mongoose.model('Donation', donationSchema);