import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
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

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  padding: 1.2rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  animation: ${slideInDown} 0.8s ease-out;
  border-bottom: 1px solid rgba(236, 240, 241, 0.3);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 2.2rem;
  font-weight: 800;
  color: #2c3e50;
  text-decoration: none;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  letter-spacing: -0.5px;
  animation: ${slideIn} 0.8s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: scale(1.05);
    animation: ${pulse} 2s infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #2c3e50);
    border-radius: 2px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #34495e;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  position: relative;
  animation: ${slideIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  letter-spacing: 0.5px;
  
  &:hover {
    color: #3498db;
    background-color: rgba(52, 152, 219, 0.1);
    transform: translateY(-3px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #2c3e50);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border-radius: 2px;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  padding: 0.8rem 2.2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
  animation: ${slideIn} 0.8s ease-out, ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 35px rgba(52, 152, 219, 0.5);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = isAuthenticated();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">KindKitchens</Logo>
        <NavLinks>
          <NavLink href="#features" delay="0.1s">Features</NavLink>
          <NavLink href="#stats" delay="0.2s">Impact</NavLink>
          <NavLink href="#contact" delay="0.3s">Contact</NavLink>
          {!token ? (
            <>
              <NavLink to="/login" delay="0.4s">Login</NavLink>
              <NavLink to="/register" delay="0.5s">Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" delay="0.4s">Home</NavLink>
              <Button onClick={handleLogout} delay="0.5s">Logout</Button>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;