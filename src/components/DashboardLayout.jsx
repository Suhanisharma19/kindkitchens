import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

const LayoutContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 70px);
  animation: ${fadeIn} 0.8s ease-out;
`;

const Sidebar = styled.div`
  width: 280px;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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

const SidebarItem = styled.div`
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 0.7rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: ${props => props.$active ? 'rgba(52, 152, 219, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.$active ? 'rgba(52, 152, 219, 0.5)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#3498db' : '#ecf0f1'};
  font-weight: 600;
  animation: ${slideIn} 0.5s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    background: rgba(52, 152, 219, 0.2);
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &.active {
    background: rgba(52, 152, 219, 0.3);
    border: 1px solid rgba(52, 152, 219, 0.5);
    color: #3498db;
    transform: translateX(5px);
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(52, 152, 219, 0.03) 0%, transparent 70%);
    z-index: -1;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(236, 240, 241, 0.5);
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
  animation: ${fadeIn} 0.8s ease-out 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(52, 152, 219, 0.4);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const DashboardLayout = ({ title, children, sidebarItems, activeItem }) => {
  const navigate = useNavigate();

  return (
    <LayoutContainer>
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            $active={activeItem === index}
            $delay={`${0.1 * index}s`}
            className={activeItem === index ? 'active' : ''}
            onClick={() => item.action && item.action()}
          >
            {item.label}
          </SidebarItem>
        ))}
      </Sidebar>
      <Content>
        <Header>
          <Title>{title}</Title>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </Header>
        {children}
      </Content>
    </LayoutContainer>
  );
};

export default DashboardLayout;