const { assessFoodQuality, identifyFoodType, detectSpoilage } = require('../services/foodQualityService');
const path = require('path');

// Assess food quality from donation image
exports.assessQuality = async (req, res) => {
  try {
    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No image file provided' 
      });
    }

    // Get food type from request body or query
    const foodType = req.body.foodType || req.query.foodType || 'unknown';
    
    // Construct full image path
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    
    console.log(`Assessing quality for image: ${imagePath}`);
    console.log(`Food type: ${foodType}`);
    
    // Perform quality assessment
    const qualityResult = await assessFoodQuality(imagePath, foodType);
    
    res.json({
      success: true,
      assessment: qualityResult
    });
  } catch (error) {
    console.error('Error in assessQuality:', error);
    res.status(500).json({ 
      message: 'Error assessing food quality',
      error: error.message 
    });
  }
};

// Identify food type from image
exports.identifyType = async (req, res) => {
  try {
    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No image file provided' 
      });
    }

    // Construct full image path
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    
    console.log(`Identifying food type for image: ${imagePath}`);
    
    // Perform food type identification
    const identificationResult = await identifyFoodType(imagePath);
    
    res.json({
      success: true,
      identification: identificationResult
    });
  } catch (error) {
    console.error('Error in identifyType:', error);
    res.status(500).json({ 
      message: 'Error identifying food type',
      error: error.message 
    });
  }
};

// Detect spoilage or contamination
exports.detectSpoilage = async (req, res) => {
  try {
    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No image file provided' 
      });
    }

    // Construct full image path
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    
    console.log(`Detecting spoilage for image: ${imagePath}`);
    
    // Perform spoilage detection
    const spoilageResult = await detectSpoilage(imagePath);
    
    res.json({
      success: true,
      spoilageDetection: spoilageResult
    });
  } catch (error) {
    console.error('Error in detectSpoilage:', error);
    res.status(500).json({ 
      message: 'Error detecting spoilage',
      error: error.message 
    });
  }
};

// Complete food analysis (quality, type, and spoilage)
exports.analyzeFood = async (req, res) => {
  try {
    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({ 
        message: 'No image file provided' 
      });
    }

    // Get food type from request body or query
    const foodType = req.body.foodType || req.query.foodType || 'unknown';
    
    // Construct full image path
    const imagePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    
    console.log(`Performing complete food analysis for image: ${imagePath}`);
    console.log(`Food type: ${foodType}`);
    
    // Perform all analyses
    const [qualityResult, identificationResult, spoilageResult] = await Promise.all([
      assessFoodQuality(imagePath, foodType),
      identifyFoodType(imagePath),
      detectSpoilage(imagePath)
    ]);
    
    // Combine results
    const analysisResult = {
      quality: qualityResult,
      identification: identificationResult,
      spoilage: spoilageResult,
      overallAssessment: {
        isSafeForDonation: spoilageResult.spoilageLevel !== 'high',
        recommendedAction: spoilageResult.spoilageLevel === 'high' ? 
          'Do not donate - high spoilage risk' : 
          qualityResult.qualityScore >= 6 ? 
          'Safe for donation' : 
          'Inspect carefully before donation',
        urgencyScore: calculateUrgencyScore(qualityResult, spoilageResult)
      }
    };
    
    res.json({
      success: true,
      analysis: analysisResult
    });
  } catch (error) {
    console.error('Error in analyzeFood:', error);
    res.status(500).json({ 
      message: 'Error performing food analysis',
      error: error.message 
    });
  }
};

// Calculate urgency score based on quality and spoilage
function calculateUrgencyScore(qualityResult, spoilageResult) {
  // Higher urgency for lower quality or higher spoilage risk
  const qualityFactor = (10 - qualityResult.qualityScore) / 10; // 0-1 scale
  const spoilageFactor = spoilageResult.spoilageRisk / 100; // 0-1 scale
  
  // Weighted average (70% quality, 30% spoilage)
  const urgencyScore = (qualityFactor * 0.7 + spoilageFactor * 0.3) * 10;
  
  // Ensure score is between 1-10
  return Math.max(1, Math.min(10, Math.round(urgencyScore)));
}