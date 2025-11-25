import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import api from '../utils/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} 0.8s ease-out;
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

const ChartTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const BarChart = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

const Bar = styled.div`
  width: 40px;
  background: linear-gradient(to top, #3498db, #2c3e50);
  margin: 0 5px;
  position: relative;
  border-radius: 5px 5px 0 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const BarLabel = styled.div`
  margin-top: 10px;
  font-size: 0.8rem;
  color: #7f8c8d;
  text-align: center;
`;

const BarValue = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background: rgba(248, 249, 250, 0.7);
  border-radius: 10px;
  margin-bottom: 0.5rem;
  animation: ${slideIn} 0.5s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    background: rgba(52, 152, 219, 0.1);
  }
`;

const ListItemLabel = styled.span`
  color: #2c3e50;
  font-weight: 500;
`;

const ListItemValue = styled.span`
  color: #3498db;
  font-weight: 700;
`;

const AnalyticsDashboard = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true);
        console.log('Fetching analytics data...');
        const res = await api.get('/analytics/forecast');
        console.log('Analytics data received:', res.data);
        setForecastData(res.data);
      } catch (err) {
        console.error('Error fetching forecast data:', err);
        console.error('Error details:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  if (loading) {
    return <div>Loading analytics data...</div>;
  }

  if (!forecastData) {
    return <div>No analytics data available</div>;
  }

  // Prepare data for charts
  const hourlyLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const dailyLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Find max values for scaling
  const maxHourly = Math.max(...forecastData.peakTimes.hourly);
  const maxDaily = Math.max(...forecastData.peakTimes.daily);
  const maxMonthly = Math.max(...forecastData.peakTimes.monthly);

  return (
    <div>
      <ChartContainer>
        <ChartTitle>Peak Donation Times</ChartTitle>
        <ChartGrid>
          <div>
            <h4>By Hour of Day</h4>
            <BarChart>
              {forecastData.peakTimes.hourly.map((count, index) => (
                <Bar 
                  key={index}
                  style={{ height: `${(count / maxHourly) * 250}px` }}
                >
                  <BarValue>{count}</BarValue>
                  <BarLabel>{hourlyLabels[index]}</BarLabel>
                </Bar>
              ))}
            </BarChart>
          </div>
          
          <div>
            <h4>By Day of Week</h4>
            <BarChart>
              {forecastData.peakTimes.daily.map((count, index) => (
                <Bar 
                  key={index}
                  style={{ height: `${(count / maxDaily) * 250}px` }}
                >
                  <BarValue>{count}</BarValue>
                  <BarLabel>{dailyLabels[index]}</BarLabel>
                </Bar>
              ))}
            </BarChart>
          </div>
          
          <div>
            <h4>By Month</h4>
            <BarChart>
              {forecastData.peakTimes.monthly.map((count, index) => (
                <Bar 
                  key={index}
                  style={{ height: `${(count / maxMonthly) * 250}px` }}
                >
                  <BarValue>{count}</BarValue>
                  <BarLabel>{monthlyLabels[index]}</BarLabel>
                </Bar>
              ))}
            </BarChart>
          </div>
        </ChartGrid>
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Popular Food Types</ChartTitle>
        <ListContainer>
          {forecastData.popularFoodTypes.map((item, index) => (
            <ListItem key={item.type} $delay={`${index * 0.1}s`}>
              <ListItemLabel>{item.type}</ListItemLabel>
              <ListItemValue>{item.count}</ListItemValue>
            </ListItem>
          ))}
        </ListContainer>
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Geographic Demand Patterns</ChartTitle>
        <ListContainer>
          {forecastData.geographicPatterns.map((item, index) => (
            <ListItem key={item.pincode} $delay={`${index * 0.1}s`}>
              <ListItemLabel>{item.pincode}</ListItemLabel>
              <ListItemValue>{item.count} donations</ListItemValue>
            </ListItem>
          ))}
        </ListContainer>
      </ChartContainer>

      <ChartContainer>
        <ChartTitle>Seasonal Variations</ChartTitle>
        <ListContainer>
          {Object.entries(forecastData.seasonalVariations).map(([season, count], index) => (
            <ListItem key={season} $delay={`${index * 0.1}s`}>
              <ListItemLabel>{season}</ListItemLabel>
              <ListItemValue>{count} donations</ListItemValue>
            </ListItem>
          ))}
        </ListContainer>
      </ChartContainer>
    </div>
  );
};

export default AnalyticsDashboard;