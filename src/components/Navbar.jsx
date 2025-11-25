import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import api from '../utils/api';

const Nav = styled.nav`
  background: #4CAF50;
  padding: 0.5rem 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', 'Poppins', sans-serif;
  box-sizing: border-box;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #e8f5e9;
    text-decoration: underline;
  }
`;

const AuthButton = styled(Link)`
  background: white;
  color: #4CAF50;
  border: 1px solid #4CAF50;
  border-radius: 25px;
  padding: 0.6rem 1.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e8f5e9;
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const token = isAuthenticated();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data);
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleDonateClick = (e) => {
    // If user is not authenticated, redirect to login
    if (!token) {
      e.preventDefault();
      navigate('/login');
    } else {
      // If user is authenticated, prevent default and navigate to /donor
      e.preventDefault();
      navigate('/donor');
    }
  };

  const handleVolunteerClick = (e) => {
    // If user is not authenticated, redirect to login
    if (!token) {
      e.preventDefault();
      navigate('/login');
    } else {
      // If user is authenticated, prevent default and navigate to /ngo
      e.preventDefault();
      navigate('/ngo');
    }
  };

  return (
    <Nav>
      <Logo to="/">KindKitchens</Logo>
      
      <NavMenu>
        <NavItem to="/">Home</NavItem>
        <NavItem to={token ? "/donor" : "/login"} onClick={handleDonateClick}>Donate</NavItem>
        <NavItem to={token ? "/ngo" : "/login"} onClick={handleVolunteerClick}>Volunteer</NavItem>
        <NavItem to="/about">About Us</NavItem>
        <NavItem to="/contact">Contact</NavItem>
        {token && (
          <NavItem to="/profile">My Profile</NavItem>
        )}
      </NavMenu>
      
      {!token ? (
        <div>
          <AuthButton to="/login">Login</AuthButton>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'white', fontWeight: '500' }}>
            Hello, {user?.name || 'User'}
          </span>
          <AuthButton onClick={handleLogout}>Logout</AuthButton>
        </div>
      )}
    </Nav>
  );
};

export default Navbar;