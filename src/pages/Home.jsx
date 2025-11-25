import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/auth';
import backgroundImage from '../assets/res.jpg';

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

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const wave = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const grow = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  background: #ffffff;
  font-family: 'Inter', 'Poppins', sans-serif;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.button`
  background: #FF9800;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: white;
  color: #4CAF50;
  border: 1px solid #4CAF50;
`;

const HowItWorksSection = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3.5rem;
  color: #2c3e50;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
    border-radius: 2px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 300px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

const StatsSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(rgba(248, 251, 255, 0.9), rgba(248, 251, 255, 0.9)), 
              url('https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #0d1b2a;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.6s ease-out;
  border-top: 1px solid #e8eef8;
  border-bottom: 1px solid #e8eef8;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%231a73e8' fill-opacity='0.08'/%3E%3C/svg%3E");
    background-size: 25px 25px;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.7s ease-out;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(26, 115, 232, 0.1);
  text-align: center;
  border: 1px solid rgba(26, 115, 232, 0.08);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.7s ease-out, ${grow} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 10px 30px rgba(26, 115, 232, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #1a73e8, #0d47a1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #0d1b2a;
  animation: ${pulse} 3s infinite, ${grow} 0.6s ease-out;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #5f6368;
  opacity: 0.85;
  animation: ${fadeIn} 0.7s ease-out;
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%234CAF50' fill-opacity='0.05'/%3E%3Ccircle cx='80' cy='80' r='1' fill='%23FF9800' fill-opacity='0.05'/%3E%3C/svg%3E");
    background-size: 30px 30px;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 0.7s ease-out;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.7s ease-out, ${grow} 0.6s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #4CAF50, #FF9800);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(76, 175, 80, 0.03);
    transform: rotate(30deg);
    transition: all 0.6s ease;
  }
  
  &:hover::after {
    transform: rotate(30deg) translate(20%, 20%);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #4CAF50, #FF9800);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${bounce} 2.5s infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 800;
  animation: ${fadeIn} 0.7s ease-out;
`;

const FeatureDescription = styled.p`
  font-size: 1.05rem;
  color: #6c757d;
  line-height: 1.7;
  margin-bottom: 0;
  animation: ${fadeIn} 0.7s ease-out;
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='white' fill-opacity='0.1'/%3E%3Ccircle cx='80' cy='80' r='1' fill='white' fill-opacity='0.1'/%3E%3C/svg%3E");
    opacity: 0.2;
  }
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const CTATitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  animation: ${slideInUp} 0.8s ease-out, ${grow} 0.6s ease-out;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
  animation: ${slideInUp} 0.8s ease-out 0.2s, ${grow} 0.6s ease-out 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  line-height: 1.7;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
  color: white;
  border: none;
  padding: 1.3rem 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${heartbeat} 2.5s infinite, ${grow} 0.6s ease-out 0.5s;
  opacity: 0;
  animation-fill-mode: forwards;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    animation: none;
  }
  
  &:active {
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: rgba(255, 255, 255, 0.1);
    transform: rotate(30deg);
    transition: all 0.5s ease;
  }
  
  &:hover::after {
    transform: rotate(30deg) translate(20%, 20%);
  }
`;

const Footer = styled.footer`
  background: linear-gradient(rgba(13, 27, 42, 0.9), rgba(13, 27, 42, 0.9)), 
              url('https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  padding: 2rem 2rem;
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #1a73e8, #0d47a1);
  }
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Home = () => {
  const navigate = useNavigate();
  const token = isAuthenticated();
  const user = getCurrentUser();
  const [stats, setStats] = useState({
    foodSaved: 1250,
    peopleServed: 5000,
    activeDonors: 320,
    partnerNgos: 45
  });

  const handleGetStarted = () => {
    if (token) {
      if (user.role === 'donor') {
        navigate('/donor');
      } else if (user.role === 'ngo') {
        navigate('/ngo');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    } else {
      navigate('/register');
    }
  };

  const handleDonateClick = () => {
    if (token) {
      if (user.role === 'donor') {
        navigate('/donor');
      } else {
        // If user is logged in but not a donor, redirect to donor registration or show message
        alert('You need to be registered as a donor to access this feature.');
      }
    } else {
      navigate('/register');
    }
  };

  const handleVolunteerClick = () => {
    if (token) {
      if (user.role === 'ngo') {
        navigate('/ngo');
      } else {
        // If user is logged in but not an NGO, redirect to NGO registration or show message
        alert('You need to be registered as an NGO to access this feature.');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Rescue Food, Feed Communities!</HeroTitle>
          <HeroSubtitle>
            Donate surplus food and reduce waste, or volunteer to help deliver food to those in need.
          </HeroSubtitle>
          <ButtonGroup>
            <PrimaryButton onClick={handleDonateClick}>Donate Food</PrimaryButton>
            <SecondaryButton onClick={handleVolunteerClick}>Volunteer</SecondaryButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>

      <HowItWorksSection>
        <SectionContainer>
          <SectionTitle>How It Works</SectionTitle>
          <CardsContainer>
            <Card>
              <CardIcon>🍽️</CardIcon>
              <CardTitle>Donate Food</CardTitle>
              <CardDescription>
                Post your surplus food items with details about type, quantity, and pickup location.
              </CardDescription>
            </Card>
            <Card>
              <CardIcon>✅</CardIcon>
              <CardTitle>We Pick & Check Quality</CardTitle>
              <CardDescription>
                Our team collects the food and ensures it meets quality and safety standards.
              </CardDescription>
            </Card>
            <Card>
              <CardIcon>🤝</CardIcon>
              <CardTitle>Distribute to Needy People</CardTitle>
              <CardDescription>
                We deliver the food to local NGOs who distribute it to communities in need.
              </CardDescription>
            </Card>
          </CardsContainer>
        </SectionContainer>
      </HowItWorksSection>

      <StatsSection id="stats">
        <StatsContainer>
          <StatCard>
            <StatNumber>{stats.foodSaved}+</StatNumber>
            <StatLabel>Tons of Food Saved</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.peopleServed}+</StatNumber>
            <StatLabel>Meals Provided</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.activeDonors}+</StatNumber>
            <StatLabel>Active Donors</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.partnerNgos}+</StatNumber>
            <StatLabel>Community Partners</StatLabel>
          </StatCard>
        </StatsContainer>
      </StatsSection>

      <FeaturesSection id="features">
        <FeaturesContainer>
          <SectionTitle>How We Create Impact</SectionTitle>
          
          <FeaturesGrid>
            <FeatureCard $delay="0.1s">
              <FeatureIcon>📤</FeatureIcon>
              <FeatureTitle>For Donors</FeatureTitle>
              <FeatureDescription>
                Have surplus food to donate? Post it on KindKitchens and connect with local NGOs 
                who can collect and distribute it to those in need.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard $delay="0.3s">
              <FeatureIcon>📥</FeatureIcon>
              <FeatureTitle>For NGOs</FeatureTitle>
              <FeatureDescription>
                Find nearby food donations and claim them for pickup. Help reduce food waste 
                while serving your community.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard $delay="0.5s">
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Impact Tracking</FeatureTitle>
              <FeatureDescription>
                Track the impact of your contributions. See how much food has been saved 
                and how many people have been served.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>

      <CTASection>
        <CTAContainer>
          <CTATitle>Join the Movement Against Hunger</CTATitle>
          <CTASubtitle>
            Become part of a growing community dedicated to transforming surplus food into nourishment for those in need
          </CTASubtitle>
          <CTAButton onClick={handleGetStarted}>
            Get Started Now
          </CTAButton>
        </CTAContainer>
      </CTASection>

      <Footer id="contact">
        <FooterContainer>
          <p>© 2023 KindKitchens. Transforming Surplus Into Support.</p>
          <p>Contact us: info@kindkitchens.org | Together, we can end hunger in our communities</p>
        </FooterContainer>
      </Footer>
    </HomeContainer>
  );
};

export default Home;