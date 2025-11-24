import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from '../utils/auth';

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
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
  animation: ${fadeIn} 0.5s ease-out;
`;



const HeroSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(120deg, #e0f7fa 0%, #f8f9fa 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #e0f7fa, #e8f5e9, #fff3e0);
    background-size: 400% 400%;
    animation: ${wave} 15s ease infinite;
    opacity: 0.7;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  text-align: left;
  animation: ${slideInUp} 1s ease-out, ${grow} 0.8s ease-out;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  text-align: left;
  animation: ${slideInLeft} 1s ease-out, ${grow} 0.8s ease-out;
  
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const HeroVisual = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInRight} 1s ease-out, ${grow} 0.8s ease-out;
`;

const FoodIcons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.8rem;
  font-size: 3rem;
  color: #0d47a1;
  opacity: 0.9;
  filter: drop-shadow(0 5px 15px rgba(13, 71, 161, 0.2));
`;

const FoodIcon = styled.div`
  animation: ${bounce} 4s ease-in-out infinite;
  opacity: 0.8;
  
  &:nth-child(1) { animation-delay: 0s; }
  &:nth-child(2) { animation-delay: 0.5s; }
  &:nth-child(3) { animation-delay: 1s; }
  &:nth-child(4) { animation-delay: 1.5s; }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  color: #1a237e;
  margin-bottom: 1.5rem;
  line-height: 1.3;
  font-weight: 800;
  animation: ${slideInLeft} 1s ease-out, ${grow} 0.8s ease-out;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const Highlight = styled.span`
  color: #0d47a1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0d47a1, #1976d2);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #455a64;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  max-width: 650px;
  animation: ${slideInRight} 1s ease-out 0.3s, ${grow} 0.8s ease-out 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
  font-weight: 400;
  
  @media (max-width: 768px) {
    margin: 0 auto 2.5rem;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
  color: white;
  border: none;
  padding: 1.2rem 2.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 25px rgba(13, 71, 161, 0.3);
  animation: ${heartbeat} 3s infinite, ${grow} 0.8s ease-out;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(13, 71, 161, 0.4);
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
    transition: all 0.6s ease;
  }
  
  &:hover::after {
    transform: rotate(30deg) translate(20%, 20%);
  }
`;

const StatsSection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1a237e;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='%231a237e' fill-opacity='0.1'/%3E%3C/svg%3E");
    background-size: 20px 20px;
  }
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(25, 118, 210, 0.15);
  text-align: center;
  border: 1px solid rgba(13, 71, 161, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out, ${grow} 0.8s ease-out;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 15px 40px rgba(25, 118, 210, 0.25);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0d47a1, #1976d2);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: #0d47a1;
  animation: ${pulse} 4s infinite, ${grow} 0.8s ease-out;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #455a64;
  opacity: 0.9;
  animation: ${fadeIn} 0.8s ease-out;
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f5f9ff 0%, #e8f4fc 100%);
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%230d47a1' fill-opacity='0.05'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%230d47a1' fill-opacity='0.05'/%3E%3Ccircle cx='70' cy='70' r='1' fill='%230d47a1' fill-opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.3;
  }
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 2.3rem;
  color: #1a237e;
  margin-bottom: 1rem;
  font-weight: 800;
  position: relative;
  display: inline-block;
  animation: ${grow} 0.8s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 4px;
    background: linear-gradient(90deg, #0d47a1, #1976d2);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: #455a64;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
  animation: ${fadeIn} 0.8s ease-out;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(13, 71, 161, 0.1);
  text-align: center;
  transition: all 0.4s ease;
  border: 1px solid rgba(13, 71, 161, 0.05);
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out, ${grow} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 45px rgba(13, 71, 161, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #0d47a1, #1976d2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 1.3rem;
  color: #0d47a1;
  animation: ${bounce} 3s infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  color: #1a237e;
  margin-bottom: 1rem;
  font-weight: 700;
  animation: ${fadeIn} 0.8s ease-out;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #455a64;
  line-height: 1.7;
  margin-bottom: 0;
  animation: ${fadeIn} 0.8s ease-out;
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0d47a1 0%, #1976d2 100%);
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
  
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
  animation: ${fadeIn} 0.8s ease-out;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.3rem;
  font-weight: 800;
  animation: ${slideInUp} 1s ease-out, ${grow} 0.8s ease-out;
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.9;
  animation: ${slideInUp} 1s ease-out 0.3s, ${grow} 0.8s ease-out 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const CTAButton = styled.button`
  background: white;
  color: #0d47a1;
  border: none;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${heartbeat} 3s infinite, ${grow} 0.8s ease-out 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  
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
    background: rgba(13, 71, 161, 0.1);
    transform: rotate(30deg);
    transition: all 0.6s ease;
  }
  
  &:hover::after {
    transform: rotate(30deg) translate(20%, 20%);
  }
`;

const Footer = styled.footer`
  background: #0d47a1;
  color: white;
  text-align: center;
  padding: 2rem 2rem;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #1976d2, #0d47a1);
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

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContainer>
          <HeroContent>
            <Title>
              Transform <Highlight>Surplus Food</Highlight> Into <Highlight>Community Impact</Highlight>
            </Title>
            <Subtitle>
              KindKitchens connects compassionate donors with local NGOs to ensure no food goes to waste 
              while nourishing communities in need. Join our mission to create a hunger-free future.
            </Subtitle>
            <Button onClick={handleGetStarted}>
              {token ? 'Go to Dashboard' : 'Get Started'}
            </Button>
          </HeroContent>
          <HeroVisual>
            <FoodIcons>
              <FoodIcon>爱心</FoodIcon>
              <FoodIcon>🥡</FoodIcon>
              <FoodIcon>🥗</FoodIcon>
              <FoodIcon>🍞</FoodIcon>
            </FoodIcons>
          </HeroVisual>
        </HeroContainer>
      </HeroSection>

      <StatsSection id="stats">
        <StatsContainer>
          <StatCard>
            <StatNumber>{stats.foodSaved}+</StatNumber>
            <StatLabel>KG Food Saved</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.peopleServed}+</StatNumber>
            <StatLabel>People Served</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.activeDonors}+</StatNumber>
            <StatLabel>Active Donors</StatLabel>
          </StatCard>
          
          <StatCard>
            <StatNumber>{stats.partnerNgos}+</StatNumber>
            <StatLabel>Partner NGOs</StatLabel>
          </StatCard>
        </StatsContainer>
      </StatsSection>

      <FeaturesSection id="features">
        <FeaturesContainer>
          <SectionTitle>How We Create Impact</SectionTitle>
          <SectionSubtitle>
            Our platform empowers donors and NGOs to transform surplus food into community nourishment
          </SectionSubtitle>
          
          <FeaturesGrid>
            <FeatureCard delay="0.1s">
              <FeatureIcon>📤</FeatureIcon>
              <FeatureTitle>For Donors</FeatureTitle>
              <FeatureDescription>
                Have surplus food to donate? Post it on KindKitchens and connect with local NGOs 
                who can collect and distribute it to those in need.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard delay="0.3s">
              <FeatureIcon>📥</FeatureIcon>
              <FeatureTitle>For NGOs</FeatureTitle>
              <FeatureDescription>
                Find nearby food donations and claim them for pickup. Help reduce food waste 
                while serving your community.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard delay="0.5s">
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