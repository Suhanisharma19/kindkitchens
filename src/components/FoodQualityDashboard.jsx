import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import { getQualityLevelColor, getSpoilageLevelColor, getFoodSafetyRecommendation } from '../utils/foodQualityUtils';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const UploadContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #3498db, #2c3e50);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
  }
`;

const FileInput = styled.input`
  padding: 0.75rem;
  border: 2px dashed #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #27ae60, #2c3e50);
  }
`;

const QualityScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => {
    if (props.score >= 8) return 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
    if (props.score >= 6) return 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)';
    if (props.score >= 4) return 'linear-gradient(135deg, #e67e22 0%, #e74c3c 100%)';
    return 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)';
  }};
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const QualityLevel = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => getQualityLevelColor(props.level)};
  margin-bottom: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InfoCard = styled.div`
  background: rgba(248, 249, 250, 0.7);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const InfoTitle = styled.div`
  font-weight: 600;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
`;

const InfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
`;

const Recommendation = styled.div`
  background: ${props => {
    if (props.$type === 'warning') return 'rgba(231, 76, 60, 0.1)';
    if (props.$type === 'success') return 'rgba(39, 174, 96, 0.1)';
    return 'rgba(52, 152, 219, 0.1)';
  }};
  border-left: 4px solid ${props => {
    if (props.$type === 'warning') return '#e74c3c';
    if (props.$type === 'success') return '#27ae60';
    return '#3498db';
  }};
  padding: 1rem;
  border-radius: 0 8px 8px 0;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const FoodQualityDashboard = () => {
  const [foodType, setFoodType] = useState('');
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/food-quality-stats');
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching food quality stats:', err);
      }
    };

    fetchStats();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!image) {
      setError('Please select an image file');
      return;
    }
    
    setLoading(true);
    setError('');
    setAnalysisResult(null);
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      if (foodType) {
        formData.append('foodType', foodType);
      }
      
      const response = await api.post('/food-quality/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setAnalysisResult(response.data.analysis);
    } catch (err) {
      console.error('Error analyzing food:', err);
      setError(err.response?.data?.message || 'Error analyzing food quality');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContainer>
      <SectionTitle>Food Quality Assessment</SectionTitle>
      
      {stats && (
        <UploadContainer>
          <SectionTitle>Platform Statistics</SectionTitle>
          <InfoGrid>
            <InfoCard>
              <InfoTitle>Total Assessments</InfoTitle>
              <InfoValue>{stats.totalAssessments}</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Avg. Quality Score</InfoTitle>
              <InfoValue>{stats.averageQualityScore}/10</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Avg. Spoilage Risk</InfoTitle>
              <InfoValue>{stats.averageSpoilageRisk}%</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Safe for Donation</InfoTitle>
              <InfoValue>{stats.safeDonationPercentage}%</InfoValue>
            </InfoCard>
          </InfoGrid>
        </UploadContainer>
      )}
      
      <UploadContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="foodType">Food Type (Optional)</Label>
            <Input
              type="text"
              id="foodType"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              placeholder="e.g., Rice, Vegetables, Bread"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="image">Food Image</Label>
            <FileInput
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormGroup>
          
          {error && (
            <div style={{ color: '#e74c3c', fontWeight: '600' }}>
              {error}
            </div>
          )}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Food Quality'}
          </Button>
        </Form>
      </UploadContainer>
      
      {analysisResult && (
        <ResultsContainer>
          <SectionTitle>Analysis Results</SectionTitle>
          
          <QualityScore score={analysisResult.quality.qualityScore}>
            {analysisResult.quality.qualityScore}
          </QualityScore>
          
          <QualityLevel level={analysisResult.quality.qualityLevel}>
            {analysisResult.quality.qualityLevel.charAt(0).toUpperCase() + analysisResult.quality.qualityLevel.slice(1)} Quality
          </QualityLevel>
          
          <InfoGrid>
            <InfoCard>
              <InfoTitle>Food Type Identified</InfoTitle>
              <InfoValue>
                {analysisResult.identification.foodType === 'unknown' 
                  ? 'Unknown' 
                  : analysisResult.identification.foodType}
              </InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Spoilage Risk</InfoTitle>
              <InfoValue>{analysisResult.spoilage.spoilageRisk}%</InfoValue>
            </InfoCard>
            
            <InfoCard>
              <InfoTitle>Spoilage Level</InfoTitle>
              <InfoValue style={{ color: getSpoilageLevelColor(analysisResult.spoilage.spoilageLevel) }}>
                {analysisResult.spoilage.spoilageLevel.charAt(0).toUpperCase() + analysisResult.spoilage.spoilageLevel.slice(1)}
              </InfoValue>
            </InfoCard>
          </InfoGrid>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3>Recommendation</h3>
            <Recommendation $type={analysisResult.overallAssessment.isSafeForDonation ? 'success' : 'warning'}>
              {getFoodSafetyRecommendation(
                analysisResult.quality.qualityLevel, 
                analysisResult.spoilage.spoilageLevel
              )}
            </Recommendation>
          </div>
          
          {analysisResult.quality.issues.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3>Potential Issues</h3>
              {analysisResult.quality.issues.map((issue, index) => (
                <Recommendation key={index} $type="warning">
                  {issue}
                </Recommendation>
              ))}
            </div>
          )}
          
          {analysisResult.quality.recommendations.length > 0 && (
            <div>
              <h3>Recommendations</h3>
              {analysisResult.quality.recommendations.map((rec, index) => (
                <Recommendation key={index} $type="info">
                  {rec}
                </Recommendation>
              ))}
            </div>
          )}
        </ResultsContainer>
      )}
    </DashboardContainer>
  );
};

export default FoodQualityDashboard;