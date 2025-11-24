import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const RegisterPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  padding: 1rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(52, 152, 219, 0.05) 0%, transparent 70%);
    z-index: -1;
  }
`;

const RegisterCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
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

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 800;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${float} 4s ease-in-out infinite;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 2rem;
  animation: ${fadeIn} 0.8s ease-out 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.1rem;
  animation: ${fadeIn} 0.8s ease-out 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.8rem;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.7rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
    background: white;
  }
  
  &:hover {
    border-color: #3498db;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.7);
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 4px rgba(52, 152, 219, 0.2);
    background: white;
  }
  
  &:hover {
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border: none;
  padding: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-top: 0.5rem;
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
  animation: ${fadeIn} 0.8s ease-out 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(52, 152, 219, 0.4);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fdf2f2;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.8rem;
  border-left: 4px solid #e74c3c;
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
  animation: ${fadeIn} 0.8s ease-out 0.7s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.2rem 0;
  
  &:hover {
    color: #2980b9;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #3498db;
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const RoleSelector = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.8rem;
  animation: ${slideIn} 0.8s ease-out 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const RoleOption = styled.div`
  flex: 1;
  padding: 1.5rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e1e8ed'};
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: ${props => props.selected ? 'rgba(52, 152, 219, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
  box-shadow: ${props => props.selected ? '0 10px 25px rgba(52, 152, 219, 0.2)' : '0 5px 15px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.15);
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(52, 152, 219, 0.25);
  }
  
  ${props => props.selected && `
    transform: translateY(-5px);
  `}
`;

const RoleTitle = styled.div`
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const RoleDescription = styled.div`
  font-size: 0.95rem;
  color: #7f8c8d;
  line-height: 1.5;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
    phone: '',
    organizationName: '',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { name, email, password, role, phone, organizationName, licenseNumber } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        role,
        phone,
        organizationName: role === 'ngo' ? organizationName : undefined,
        licenseNumber: role === 'ngo' ? licenseNumber : undefined
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      
      // Redirect based on role
      if (res.data.role === 'donor') {
        navigate('/donor');
      } else if (res.data.role === 'ngo') {
        navigate('/ngo');
      } else if (res.data.role === 'admin') {
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <RegisterPageContainer>
      <RegisterCard>
        <LogoSection>
          <Logo>KindKitchens</Logo>
          <Title>Create Account</Title>
          <Subtitle>Join our community to fight food waste</Subtitle>
        </LogoSection>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup delay="0.3s">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              delay="0.4s"
            />
          </FormGroup>

          <FormGroup delay="0.4s">
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              delay="0.5s"
            />
          </FormGroup>

          <FormGroup delay="0.5s">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Create a strong password"
              delay="0.6s"
            />
          </FormGroup>

          <FormGroup delay="0.6s">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              delay="0.7s"
            />
          </FormGroup>

          <FormGroup>
            <Label>I want to join as:</Label>
            <RoleSelector>
              <RoleOption 
                selected={role === 'donor'} 
                onClick={() => handleRoleSelect('donor')}
              >
                <RoleTitle>Donor</RoleTitle>
                <RoleDescription>Donate surplus food</RoleDescription>
              </RoleOption>
              
              <RoleOption 
                selected={role === 'ngo'} 
                onClick={() => handleRoleSelect('ngo')}
              >
                <RoleTitle>NGO</RoleTitle>
                <RoleDescription>Collect and distribute food</RoleDescription>
              </RoleOption>
            </RoleSelector>
          </FormGroup>

          {role === 'ngo' && (
            <>
              <FormGroup delay="0.7s">
                <Label>Organization Name</Label>
                <Input
                  type="text"
                  name="organizationName"
                  value={organizationName}
                  onChange={handleChange}
                  required={role === 'ngo'}
                  placeholder="Enter your organization name"
                />
              </FormGroup>

              <FormGroup delay="0.8s">
                <Label>License Number</Label>
                <Input
                  type="text"
                  name="licenseNumber"
                  value={licenseNumber}
                  onChange={handleChange}
                  required={role === 'ngo'}
                  placeholder="Enter your license number"
                />
              </FormGroup>
            </>
          )}

          <Button type="submit">Create Account</Button>
        </Form>
        
        <LinkContainer>
          Already have an account? <StyledLink to="/login">Sign in</StyledLink>
        </LinkContainer>
      </RegisterCard>
    </RegisterPageContainer>
  );
};

export default Register;