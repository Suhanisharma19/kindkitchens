import React from 'react';
import styled from 'styled-components';

const AboutUsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Poppins', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
`;

const Title = styled.h1`
  color: #4CAF50;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #4CAF50;
    margin-top: 0.5rem;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  color: #4CAF50;
  margin-top: 0;
`;

const CardContent = styled.p`
  color: #666;
  line-height: 1.6;
`;

const MissionVisionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const MissionCard = styled.div`
  background: linear-gradient(135deg, #4CAF50 0%, #2c3e50 100%);
  color: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
`;

const VisionCard = styled.div`
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  color: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const TeamSection = styled.section`
  text-align: center;
  margin: 3rem 0;
`;

const TeamMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const MemberName = styled.h4`
  color: #2c3e50;
  margin: 1rem 0 0.5rem 0;
`;

const MemberRole = styled.p`
  color: #4CAF50;
  font-weight: 600;
`;

const StatsSection = styled.section`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #4CAF50;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 1.1rem;
`;

const AboutUs = () => {
  return (
    <AboutUsContainer>
      <Header>
        <Title>About KindKitchens</Title>
        <Subtitle>
          Connecting communities through food sharing to reduce waste and fight hunger
        </Subtitle>
      </Header>

      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <Content>
          <Card>
            <CardTitle>Founded with Purpose</CardTitle>
            <CardContent>
              KindKitchens was born from a simple yet powerful idea: surplus food should never go to waste while people go hungry. 
              Our founders witnessed the stark contrast between food waste in restaurants and events, and the pressing need in local communities.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Growing Impact</CardTitle>
            <CardContent>
              Since our inception, we've connected hundreds of food donors with NGOs and community organizations, 
              facilitating the redistribution of thousands of meals to those in need. Our platform has become a vital bridge 
              between generosity and necessity.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Technology for Good</CardTitle>
            <CardContent>
              We leverage cutting-edge technology to streamline the food donation process. Our platform makes it easy for 
              donors to list surplus food and for NGOs to locate and claim donations based on location and urgency.
            </CardContent>
          </Card>
        </Content>
      </Section>

      <MissionVisionContainer>
        <MissionCard>
          <CardIcon>🎯</CardIcon>
          <h3>Our Mission</h3>
          <p>
            To create a world where no edible food goes to waste and no person goes hungry, 
            by connecting food donors with communities in need through innovative technology.
          </p>
        </MissionCard>
        <VisionCard>
          <CardIcon>🌟</CardIcon>
          <h3>Our Vision</h3>
          <p>
            A sustainable future where food redistribution is seamless, efficient, and accessible to all, 
            contributing to zero hunger and zero food waste communities.
          </p>
        </VisionCard>
      </MissionVisionContainer>

      <Section>
        <SectionTitle>How It Works</SectionTitle>
        <Content>
          <Card>
            <CardTitle>For Donors</CardTitle>
            <CardContent>
              Restaurants, event organizers, and individuals can easily list surplus food on our platform. 
              Simply provide details about the food type, quantity, and location, and our system will notify 
              nearby NGOs who can collect the donation.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>For NGOs</CardTitle>
            <CardContent>
              NGOs and community organizations can browse available donations in their area, claim items that 
              match their needs, and coordinate pickup times. Our system helps prioritize urgent donations 
              to ensure food reaches those in need quickly.
            </CardContent>
          </Card>
          <Card>
            <CardTitle>Quality & Safety</CardTitle>
            <CardContent>
              We maintain strict food safety standards with our quality check system. All donations are 
              evaluated for safety, and our urgency scoring ensures perishable items are distributed quickly. 
              We provide guidelines and support to ensure safe food handling throughout the process.
            </CardContent>
          </Card>
        </Content>
      </Section>

      <StatsSection>
        <SectionTitle>Our Impact</SectionTitle>
        <StatsContainer>
          <StatItem>
            <StatNumber>5,000+</StatNumber>
            <StatLabel>Meals Distributed</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>200+</StatNumber>
            <StatLabel>Food Donors</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>85+</StatNumber>
            <StatLabel>Community Partners</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>12</StatNumber>
            <StatLabel>Cities Served</StatLabel>
          </StatItem>
        </StatsContainer>
      </StatsSection>

      <TeamSection>
        <SectionTitle>Our Team</SectionTitle>
        <p>
          Dedicated professionals working together to make a difference in our communities
        </p>
        <TeamMembers>
          <TeamMember>
            <CardIcon>👩‍💼</CardIcon>
            <MemberName>Suhani Kumari</MemberName>
            <MemberRole>Founder & CEO</MemberRole>
          </TeamMember>
          <TeamMember>
            <CardIcon>👩‍💻</CardIcon>
            <MemberName>Sneha Singh</MemberName>
            <MemberRole>CTO</MemberRole>
          </TeamMember>
        </TeamMembers>
      </TeamSection>
    </AboutUsContainer>
  );
};

export default AboutUs;