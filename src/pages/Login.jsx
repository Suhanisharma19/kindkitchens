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

const LoginPageContainer = styled.div`
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

const LoginCard = styled.div`
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

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  padding-right: 2.5rem;
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

const EyeIcon = styled.span`
  position: absolute;
  right: 12px;
  cursor: pointer;
  font-size: 1rem;
  color: #757575;
  user-select: none;
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

const SocialLoginContainer = styled.div`
  margin: 1rem 0;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out 0.5s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const SocialTitle = styled.p`
  color: #757575;
  margin-bottom: 0.6rem;
  position: relative;
  font-size: 0.8rem;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: #ddd;
  }
  
  &::before {
    left: 0;
  }
  
  &::after {
    right: 0;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }
`;

const GoogleButton = styled(SocialButton)`
  background: #fff;
  color: #DB4437;
  border: 1px solid #ddd;
`;

const FacebookButton = styled(SocialButton)`
  background: #4267B2;
  color: white;
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', {
        email,
        password
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
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // This would typically redirect to your backend OAuth endpoint
      window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/google`;
    } catch (err) {
      setError('Failed to initiate Google login');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // This would typically redirect to your backend OAuth endpoint
      window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/auth/facebook`;
    } catch (err) {
      setError('Failed to initiate Facebook login');
    }
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <LogoSection>
          <Logo>KindKitchens</Logo>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to continue</Subtitle>
        </LogoSection>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
          <FormGroup $delay="0.1s">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </FormGroup>

          <FormGroup $delay="0.2s">
            <Label>Password</Label>
            <InputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙊' : '🐵'}
              </EyeIcon>
            </InputContainer>
          </FormGroup>

          <Button type="submit">Sign In</Button>
        </Form>
        
        <SocialLoginContainer>
          <SocialTitle>Or sign in with</SocialTitle>
          <SocialButtons>
            <GoogleButton onClick={handleGoogleLogin}>
              <span>G</span>
            </GoogleButton>
            <FacebookButton onClick={handleFacebookLogin}>
              <span>f</span>
            </FacebookButton>
          </SocialButtons>
        </SocialLoginContainer>
        
        <LinkContainer>
          Don't have an account? <StyledLink to="/register">Create one</StyledLink>
        </LinkContainer>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default Login;