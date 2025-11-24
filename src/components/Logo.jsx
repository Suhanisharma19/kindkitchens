import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <LogoIcon>K</LogoIcon>
      <LogoText>KindKitchens</LogoText>
    </LogoContainer>
  );
};

export default Logo;