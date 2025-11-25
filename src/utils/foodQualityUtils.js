/**
 * Utility functions for food quality assessment
 */

// Get quality level color
export const getQualityLevelColor = (level) => {
  switch (level) {
    case 'excellent':
      return '#27ae60';
    case 'good':
      return '#2ecc71';
    case 'fair':
      return '#f39c12';
    case 'poor':
      return '#e74c3c';
    default:
      return '#7f8c8d';
  }
};

// Get spoilage level color
export const getSpoilageLevelColor = (level) => {
  switch (level) {
    case 'low':
      return '#27ae60';
    case 'medium':
      return '#f39c12';
    case 'high':
      return '#e74c3c';
    default:
      return '#7f8c8d';
  }
};

// Get quality score description
export const getQualityScoreDescription = (score) => {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  if (score >= 2) return 'Poor';
  return 'Very Poor';
};

// Get spoilage risk description
export const getSpoilageRiskDescription = (risk) => {
  if (risk >= 80) return 'Very High';
  if (risk >= 60) return 'High';
  if (risk >= 40) return 'Medium';
  if (risk >= 20) return 'Low';
  return 'Very Low';
};

// Get food safety recommendation
export const getFoodSafetyRecommendation = (qualityLevel, spoilageLevel) => {
  if (spoilageLevel === 'high') {
    return 'Do not donate - high spoilage risk';
  }
  
  if (qualityLevel === 'poor') {
    return 'Inspect carefully before donation';
  }
  
  if (qualityLevel === 'fair') {
    return 'Suitable for donation with caution';
  }
  
  return 'Safe for donation';
};

// Format food quality data for display
export const formatFoodQualityData = (foodQuality) => {
  if (!foodQuality) {
    return {
      qualityScore: 'N/A',
      qualityLevel: 'Not assessed',
      isSafeForDonation: false,
      foodTypeIdentified: 'Unknown',
      spoilageRisk: 'N/A',
      spoilageLevel: 'Unknown',
      recommendation: 'Not assessed'
    };
  }
  
  return {
    qualityScore: foodQuality.qualityScore,
    qualityLevel: foodQuality.qualityLevel,
    isSafeForDonation: foodQuality.isSafeForDonation,
    foodTypeIdentified: foodQuality.foodTypeIdentified,
    spoilageRisk: foodQuality.spoilageRisk,
    spoilageLevel: foodQuality.spoilageLevel,
    recommendation: getFoodSafetyRecommendation(
      foodQuality.qualityLevel, 
      foodQuality.spoilageLevel
    )
  };
};

// Get quality indicator icon
export const getQualityIndicator = (level) => {
  switch (level) {
    case 'excellent':
      return '🟢';
    case 'good':
      return '🟡';
    case 'fair':
      return '🟠';
    case 'poor':
      return '🔴';
    default:
      return '⚪';
  }
};

// Get spoilage indicator icon
export const getSpoilageIndicator = (level) => {
  switch (level) {
    case 'low':
      return '🟢';
    case 'medium':
      return '🟠';
    case 'high':
      return '🔴';
    default:
      return '⚪';
  }
};