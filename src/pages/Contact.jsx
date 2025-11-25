import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
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

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const InfoCard = styled.div`
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardContent = styled.p`
  color: #666;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-top: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Inter', 'Poppins', sans-serif;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: 'Inter', 'Poppins', sans-serif;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const MapContainer = styled.div`
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    background: #45a049;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <ContactContainer>
      <Header>
        <Title>Contact Us</Title>
        <Subtitle>
          Have questions or want to learn more about KindKitchens? Get in touch with us!
        </Subtitle>
      </Header>

      <Content>
        <InfoCard>
          <CardTitle>📍 Address</CardTitle>
          <CardContent>
            KindKitchens Headquarters<br />
            Beta 1, Sector 1<br />
            Greater Noida, Uttar Pradesh 201308<br />
            India
          </CardContent>
        </InfoCard>

        <InfoCard>
          <CardTitle>📞 Phone</CardTitle>
          <CardContent>
            General Inquiries: (123) 456-7890<br />
            Support: (123) 456-7891<br />
            Partnership: (123) 456-7892
          </CardContent>
        </InfoCard>

        <InfoCard>
          <CardTitle>✉️ Email</CardTitle>
          <CardContent>
            General: info@kindkitchens.org<br />
            Support: support@kindkitchens.org<br />
            Partnership: partner@kindkitchens.org<br />
            Media: media@kindkitchens.org
          </CardContent>
        </InfoCard>
      </Content>

      <InfoCard>
        <CardTitle>🕒 Office Hours</CardTitle>
        <CardContent>
          Monday - Friday: 9:00 AM - 6:00 PM<br />
          Saturday: 10:00 AM - 4:00 PM<br />
          Sunday: Closed
        </CardContent>
        
        <SocialLinks>
          <SocialLink href="#" aria-label="Facebook">f</SocialLink>
          <SocialLink href="#" aria-label="Twitter">t</SocialLink>
          <SocialLink href="#" aria-label="Instagram">i</SocialLink>
          <SocialLink href="#" aria-label="LinkedIn">in</SocialLink>
        </SocialLinks>
      </InfoCard>

      <ContactForm onSubmit={handleSubmit}>
        <h2>Send us a Message</h2>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>

      <MapContainer>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1451601234567!2d77.4898233!3d28.6267173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5402c2d9f9f%3A0x2c971f3d4d4d4d4d!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          title="KindKitchens Location"
        ></iframe>
      </MapContainer>
    </ContactContainer>
  );
};

export default Contact;