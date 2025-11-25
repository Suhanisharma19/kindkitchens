// Script to initialize the database with sample data
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Donation = require('./models/Donation');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kindkitchens', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample users
const users = [
  {
    name: 'John Donor',
    email: 'john@example.com',
    password: 'password123',
    role: 'donor',
    phone: '1234567890',
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    }
  },
  {
    name: 'Sarah NGO',
    email: 'sarah@example.com',
    password: 'password123',
    role: 'ngo',
    phone: '0987654321',
    organizationName: 'Helping Hands Foundation',
    licenseNumber: 'NGO123456',
    address: {
      street: '456 Charity Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    }
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    phone: '1112223333',
    address: {
      street: '789 Admin Blvd',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    }
  }
];

// Sample donations
const donations = [
  {
    foodType: 'Rice and Curry',
    quantity: 5,
    unit: 'kg',
    expirationDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    address: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.0760] // Mumbai coordinates
    },
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    status: 'available'
  },
  {
    foodType: 'Bread and Jam',
    quantity: 10,
    unit: 'pieces',
    expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    address: {
      street: '789 Bakery Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [72.8252, 18.9834] // Mumbai coordinates
    },
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    status: 'available'
  },
  {
    foodType: 'Vegetable Salad',
    quantity: 3,
    unit: 'kg',
    expirationDate: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago (expired)
    address: {
      street: '456 Garden Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    location: {
      type: 'Point',
      coordinates: [72.8485, 19.1207] // Mumbai coordinates
    },
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    status: 'expired'
  }
];

async function initData() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Donation.deleteMany({});
    
    // Hash passwords and create users
    const userPromises = users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      return new User({ ...user, password: hashedPassword });
    });
    
    const createdUsers = await Promise.all(userPromises);
    await User.insertMany(createdUsers);
    console.log('Users created:', createdUsers.length);
    
    // Create donations (associate with first user as donor)
    const donationPromises = donations.map(async (donation) => {
      return new Donation({ 
        ...donation, 
        donor: createdUsers[0]._id 
      });
    });
    
    const createdDonations = await Promise.all(donationPromises);
    await Donation.insertMany(createdDonations);
    console.log('Donations created:', createdDonations.length);
    
    console.log('Database initialized with sample data');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

// Run the initialization
initData();