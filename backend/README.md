# KindKitchens Backend

This is the backend API for KindKitchens, built with Node.js, Express, and MongoDB.

## Features

- JWT-based authentication (Donor, NGO, Admin)
- Food donation posting and management
- Location-based NGO matching
- Food quality checks
- Impact dashboard

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kindkitchens
   JWT_SECRET=your_jwt_secret_key
   ```

3. Make sure MongoDB is running on your system

4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Donations
- `POST /api/donations` - Create a new donation (Donor)
- `GET /api/donations` - Get all donations for a donor (Donor)
- `GET /api/donations/available` - Get available donations (NGO)
- `GET /api/donations/ngo` - Get NGO's claimed donations (NGO)
- `GET /api/donations/:id` - Get a specific donation
- `PUT /api/donations/:id` - Update a donation (Donor)
- `DELETE /api/donations/:id` - Delete a donation (Donor)
- `PUT /api/donations/:id/claim` - Claim a donation (NGO)
- `PUT /api/donations/:id/status` - Update pickup status (NGO)

### NGOs
- `GET /api/ngos/nearby` - Get nearby donations based on pincode (NGO)
- `GET /api/ngos/profile` - Get NGO profile (NGO)
- `PUT /api/ngos/profile` - Update NGO profile (NGO)

### Admin
- `GET /api/admin/users` - Get all users (Admin)
- `GET /api/admin/donations` - Get all donations (Admin)
- `PUT /api/admin/users/:id/toggle` - Block/unblock user (Admin)
- `GET /api/admin/stats` - Get impact statistics (Admin)