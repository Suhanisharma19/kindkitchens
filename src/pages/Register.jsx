import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import backgroundImage from '../assets/res.jpg';

// Animations
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
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const RegisterPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1rem;
`;

const RegisterCard = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 14px;
  padding: 1.2rem;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.15);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(6px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #81C784, #4CAF50);
    background-size: 200% 200%;
    animation: ${pulse} 3s ease-in-out infinite;
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 1.2rem;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
  color: #4CAF50;
  font-weight: 800;
  animation: ${float} 3s ease-in-out infinite;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #2E7D32;
  margin-bottom: 0.1rem;
  font-weight: 700;
  font-size: 1.3rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const Subtitle = styled.p`
  color: #757575;
  font-size: 0.8rem;
  animation: ${fadeIn} 0.6s ease-out 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  animation: ${slideIn} 0.5s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  color: #424242;
  font-weight: 500;
  font-size: 0.85rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%);
  color: white;
  border: none;
  padding: 0.8rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.3rem;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
  animation: ${fadeIn} 0.6s ease-out 0.4s;
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(76, 175, 80, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  background-color: #ffebee;
  padding: 0.7rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  border-left: 2px solid #f44336;
  animation: ${fadeIn} 0.3s ease-out;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  animation: ${fadeIn} 0.6s ease-out 0.6s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const StyledLink = styled(Link)`
  color: #4CAF50;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #2E7D32;
    text-decoration: underline;
  }
`;

const RoleSelector = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1rem;
  animation: ${slideIn} 0.5s ease-out 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const RoleOption = styled.div`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid ${props => props.selected ? '#4CAF50' : '#ddd'};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
  box-shadow: ${props => props.selected ? '0 4px 12px rgba(76, 175, 80, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    border-color: #4CAF50;
    background: rgba(76, 175, 80, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(76, 175, 80, 0.25);
  }
  
  ${props => props.selected && `
    transform: translateY(-2px);
  `}
`;

const RoleTitle = styled.div`
  font-weight: 600;
  color: #2E7D32;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
`;

const RoleDescription = styled.div`
  font-size: 0.75rem;
  color: #757575;
  line-height: 1.4;
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

    // Prepare the data to send
    const requestData = {
      name,
      email,
      password,
      role,
      phone,
      organizationName: role === 'ngo' ? organizationName : undefined,
      licenseNumber: role === 'ngo' ? licenseNumber : undefined
    };

    console.log('Sending registration data:', requestData);
    console.log('Stringified data:', JSON.stringify(requestData));

    try {
      const res = await api.post('/auth/register', requestData);

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
      console.error('Registration error:', err);
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
          <FormGroup $delay="0.1s">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </FormGroup>

          <FormGroup $delay="0.2s">
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </FormGroup>

          <FormGroup $delay="0.3s">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Create a strong password"
            />
          </FormGroup>

          <FormGroup $delay="0.4s">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
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
              <FormGroup $delay="0.5s">
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

              <FormGroup $delay="0.6s">
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