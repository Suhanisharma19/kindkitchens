const sharp = require('sharp');
const fs = require('fs').promises;

// Color thresholds for food quality assessment
const QUALITY_THRESHOLDS = {
  // Brownish colors that might indicate spoilage
  SPOILAGE_COLORS: [
    [101, 67, 33],   // Dark brown
    [139, 69, 19],   // Saddle brown
    [160, 82, 45],   // Sienna
    [165, 42, 42],   // Brown
    [128, 0, 0],     // Maroon
    [105, 105, 105], // Dim gray
    [128, 128, 128], // Gray
    [192, 192, 192], // Silver
  ],
  // Fresh colors for different food types
  FRESH_COLORS: {
    'vegetables': [
      [0, 128, 0],     // Green
      [34, 139, 34],   // Forest green
      [50, 205, 50],   // Lime green
      [144, 238, 144], // Light green
      [255, 255, 0],   // Yellow
      [255, 165, 0],   // Orange
    ],
    'fruits': [
      [255, 0, 0],     // Red
      [255, 165, 0],   // Orange
      [255, 255, 0],   // Yellow
      [124, 252, 0],   // Lawn green
      [0, 255, 0],     // Lime
      [0, 128, 0],     // Green
      [0, 0, 255],     // Blue
      [75, 0, 130],    // Indigo
      [238, 130, 238], // Violet
    ],
    'grains': [
      [245, 245, 220], // Beige
      [245, 222, 179], // Wheat
      [210, 180, 140], // Tan
      [188, 143, 143], // Rosy brown
    ]
  }
};

// Common food types and their characteristics
const FOOD_TYPES = {
  'rice': {
    category: 'grains',
    typicalColors: QUALITY_THRESHOLDS.FRESH_COLORS.grains,
    spoilageIndicators: ['musty smell', 'insects', 'clumping']
  },
  'bread': {
    category: 'grains',
    typicalColors: [[200, 180, 140], [220, 200, 160], [240, 220, 180]],
    spoilageIndicators: ['mold', 'sour smell', 'hard texture']
  },
  'vegetables': {
    category: 'vegetables',
    typicalColors: QUALITY_THRESHOLDS.FRESH_COLORS.vegetables,
    spoilageIndicators: ['soft spots', 'discoloration', 'wilting']
  },
  'fruits': {
    category: 'fruits',
    typicalColors: QUALITY_THRESHOLDS.FRESH_COLORS.fruits,
    spoilageIndicators: ['soft spots', 'mold', 'fermentation']
  },
  'cooked food': {
    category: 'cooked',
    typicalColors: [[200, 150, 100], [220, 180, 140], [240, 200, 160]],
    spoilageIndicators: ['sour smell', 'slimy texture', 'mold']
  }
};

// Calculate color distance using Euclidean distance
function colorDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
    Math.pow(color1[1] - color2[1], 2) +
    Math.pow(color1[2] - color2[2], 2)
  );
}

// Check if a color is close to spoilage colors
function isSpoilageColor(color) {
  for (const spoilageColor of QUALITY_THRESHOLDS.SPOILAGE_COLORS) {
    if (colorDistance(color, spoilageColor) < 50) {
      return true;
    }
  }
  return false;
}

// Analyze dominant colors in an image
async function analyzeImageColors(imagePath) {
  try {
    // Resize image for faster processing
    const resizedImageBuffer = await sharp(imagePath)
      .resize(100, 100)
      .toBuffer();

    // Extract dominant colors
    const { data, info } = await sharp(resizedImageBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Count color frequencies
    const colorCounts = {};
    const totalPixels = info.width * info.height;

    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Skip very dark or very light pixels
      const brightness = (r + g + b) / 3;
      if (brightness < 30 || brightness > 225) continue;
      
      const colorKey = `${Math.floor(r/10)*10},${Math.floor(g/10)*10},${Math.floor(b/10)*10}`;
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }

    // Get top 5 dominant colors
    const sortedColors = Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([color, count]) => {
        const [r, g, b] = color.split(',').map(Number);
        return { color: [r, g, b], percentage: (count / totalPixels) * 100 };
      });

    return sortedColors;
  } catch (error) {
    console.error('Error analyzing image colors:', error);
    throw error;
  }
}

// Assess food quality based on image analysis
async function assessFoodQuality(imagePath, foodType = 'unknown') {
  try {
    // Check if file exists
    try {
      await fs.access(imagePath);
    } catch (error) {
      throw new Error('Image file not found');
    }

    // Analyze image colors
    const dominantColors = await analyzeImageColors(imagePath);
    
    if (dominantColors.length === 0) {
      return {
        qualityScore: 5,
        qualityLevel: 'unknown',
        issues: ['Could not analyze image colors'],
        recommendations: ['Please upload a clearer image'],
        confidence: 0
      };
    }

    // Count spoilage-like colors
    let spoilageColorCount = 0;
    for (const { color } of dominantColors) {
      if (isSpoilageColor(color)) {
        spoilageColorCount++;
      }
    }

    // Calculate quality score (0-10, 10 being best)
    const spoilagePercentage = (spoilageColorCount / dominantColors.length) * 100;
    let qualityScore = 10 - (spoilagePercentage / 10);
    
    // Adjust score based on food type
    let foodCategory = 'unknown';
    if (foodType !== 'unknown') {
      // Try to match food type to known categories
      for (const [type, info] of Object.entries(FOOD_TYPES)) {
        if (foodType.toLowerCase().includes(type)) {
          foodCategory = info.category;
          break;
        }
      }
      
      // If we have a known food type, adjust quality assessment
      if (foodCategory !== 'unknown') {
        // Check if dominant colors match expected colors for this food type
        let colorMatchScore = 0;
        const expectedColors = QUALITY_THRESHOLDS.FRESH_COLORS[foodCategory] || [];
        
        for (const { color, percentage } of dominantColors) {
          for (const expectedColor of expectedColors) {
            if (colorDistance(color, expectedColor) < 60) {
              colorMatchScore += percentage;
              break;
            }
          }
        }
        
        // Adjust quality score based on color matching
        qualityScore = Math.min(10, qualityScore + (colorMatchScore / 20));
      }
    }

    // Ensure quality score is within bounds
    qualityScore = Math.max(0, Math.min(10, qualityScore));
    
    // Determine quality level
    let qualityLevel;
    if (qualityScore >= 8) {
      qualityLevel = 'excellent';
    } else if (qualityScore >= 6) {
      qualityLevel = 'good';
    } else if (qualityScore >= 4) {
      qualityLevel = 'fair';
    } else {
      qualityLevel = 'poor';
    }

    // Generate issues and recommendations
    const issues = [];
    const recommendations = [];
    
    if (spoilageColorCount > 0) {
      issues.push('Detected colors that may indicate spoilage or contamination');
    }
    
    if (qualityScore < 6) {
      recommendations.push('Consider inspecting this food more carefully before donation');
      recommendations.push('Check for odors, textures, or other signs of spoilage');
    } else if (qualityScore >= 8) {
      recommendations.push('Food appears to be in excellent condition for donation');
    }

    return {
      qualityScore: Math.round(qualityScore * 10) / 10, // Round to 1 decimal place
      qualityLevel,
      dominantColors,
      issues,
      recommendations,
      confidence: Math.round((1 - Math.abs(5 - qualityScore) / 5) * 100) // Confidence based on how far from neutral
    };
  } catch (error) {
    console.error('Error assessing food quality:', error);
    throw error;
  }
}

// Identify food type from image (simplified approach)
async function identifyFoodType(imagePath) {
  try {
    // Analyze image colors
    const dominantColors = await analyzeImageColors(imagePath);
    
    if (dominantColors.length === 0) {
      return {
        foodType: 'unknown',
        confidence: 0,
        possibleTypes: []
      };
    }

    // Count colors in each category
    const categoryScores = {};
    
    for (const [category, colors] of Object.entries(QUALITY_THRESHOLDS.FRESH_COLORS)) {
      let score = 0;
      for (const { color, percentage } of dominantColors) {
        for (const expectedColor of colors) {
          const distance = colorDistance(color, expectedColor);
          if (distance < 60) {
            score += percentage * (1 - distance / 60);
          }
        }
      }
      categoryScores[category] = score;
    }

    // Find the category with the highest score
    const bestCategory = Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)[0];
    
    if (!bestCategory || bestCategory[1] === 0) {
      return {
        foodType: 'unknown',
        confidence: 0,
        possibleTypes: []
      };
    }

    // Map category to specific food types
    const possibleTypes = Object.entries(FOOD_TYPES)
      .filter(([, info]) => info.category === bestCategory[0])
      .map(([type]) => type);

    return {
      foodType: bestCategory[0],
      confidence: Math.min(100, Math.round(bestCategory[1])),
      possibleTypes,
      dominantColors
    };
  } catch (error) {
    console.error('Error identifying food type:', error);
    throw error;
  }
}

// Detect potential spoilage or contamination
async function detectSpoilage(imagePath) {
  try {
    const dominantColors = await analyzeImageColors(imagePath);
    
    const spoilageIndicators = [];
    let spoilageRisk = 0;
    
    for (const { color, percentage } of dominantColors) {
      if (isSpoilageColor(color)) {
        spoilageRisk += percentage;
        // Add specific indicators based on color
        if (colorDistance(color, [105, 105, 105]) < 50) {
          spoilageIndicators.push('Gray discoloration detected');
        } else if (colorDistance(color, [128, 0, 0]) < 50) {
          spoilageIndicators.push('Brown spots detected');
        } else if (colorDistance(color, [192, 192, 192]) < 50) {
          spoilageIndicators.push('White fuzzy growth detected (possible mold)');
        }
      }
    }
    
    // Determine spoilage level
    let spoilageLevel;
    if (spoilageRisk >= 15) {
      spoilageLevel = 'high';
    } else if (spoilageRisk >= 5) {
      spoilageLevel = 'medium';
    } else {
      spoilageLevel = 'low';
    }
    
    return {
      spoilageRisk: Math.round(spoilageRisk * 10) / 10,
      spoilageLevel,
      indicators: spoilageIndicators,
      recommendation: spoilageRisk >= 10 ? 
        'High risk of spoilage or contamination. Do not donate this food.' :
        spoilageRisk >= 5 ? 
        'Moderate risk of spoilage. Inspect carefully before donating.' :
        'Low risk of spoilage. Food appears safe for donation.'
    };
  } catch (error) {
    console.error('Error detecting spoilage:', error);
    throw error;
  }
}

module.exports = {
  assessFoodQuality,
  identifyFoodType,
  detectSpoilage
};