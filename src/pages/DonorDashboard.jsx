import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import DashboardLayout from '../components/DashboardLayout';
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

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
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
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  margin-bottom: 2rem;
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

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.7rem;
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
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
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-right: 1rem;
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
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

const SecondaryButton = styled.button`
  background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 25px rgba(149, 165, 166, 0.3);
  animation: ${fadeIn} 0.8s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(149, 165, 166, 0.4);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const DonationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const DonationCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 1.8rem;
  border-left: 5px solid ${props => {
    switch (props.$status) {
      case 'available': return '#27ae60';
      case 'claimed': return '#f39c12';
      case 'pickedup': return '#3498db';
      case 'delivered': return '#9b59b6';
      default: return '#95a5a6';
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${slideIn} 0.8s ease-out;
  animation-delay: ${props => props.$delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const DonationTitle = styled.h3`
  margin-top: 0;
  color: #2c3e50;
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DonationInfo = styled.div`
  margin: 0.7rem 0;
  display: flex;
  align-items: center;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #2c3e50;
  min-width: 120px;
  display: inline-block;
  font-size: 1rem;
`;

const InfoValue = styled.span`
  color: #7f8c8d;
  margin-left: 0.7rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.$status) {
      case 'available': return '#e8f5e9';
      case 'claimed': return '#fff3e0';
      case 'pickedup': return '#e3f2fd';
      case 'delivered': return '#f3e5f5';
      default: return '#eeeeee';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'available': return '#27ae60';
      case 'claimed': return '#f39c12';
      case 'pickedup': return '#3498db';
      case 'delivered': return '#9b59b6';
      default: return '#7f8c8d';
    }
  }};
  text-transform: capitalize;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-top: 1.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} 0.8s ease-out;
  
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

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(236, 240, 241, 0.5);
  animation: ${fadeIn} 0.8s ease-out;
`;

const DashboardTitle = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    unit: 'kg',
    expirationDate: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    },
    image: null
  });

  const sidebarItems = [
    { label: 'Post Donation', action: () => setActiveTab(0) },
    { label: 'My Donations', action: () => setActiveTab(1) }
  ];

  // Fetch donor's donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await api.get('/donations');
        setDonations(res.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    if (activeTab === 1) {
      fetchDonations();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('foodType', formData.foodType);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('unit', formData.unit);
      formDataToSend.append('expirationDate', formData.expirationDate);
      formDataToSend.append('address', JSON.stringify(formData.address));
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const res = await api.post('/donations', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Donation posted successfully!');
      setFormData({
        foodType: '',
        quantity: '',
        unit: 'kg',
        expirationDate: '',
        address: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India'
        },
        image: null
      });
      
      // Refresh donations list
      const donationsRes = await api.get('/donations');
      setDonations(donationsRes.data);
    } catch (err) {
      alert('Error posting donation: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <DashboardLayout 
      title="Donor Dashboard" 
      sidebarItems={sidebarItems} 
      activeItem={activeTab}
    >
      {activeTab === 0 && (
        <Card>
          <DashboardHeader>
            <DashboardTitle>Post New Donation</DashboardTitle>
          </DashboardHeader>
          <Form onSubmit={handleSubmit}>
            <FormGroup $delay="0.1s">
              <Label>Food Type</Label>
              <Input
                type="text"
                name="foodType"
                value={formData.foodType}
                onChange={handleChange}
                required
                placeholder="e.g., Rice and Curry, Bread and Jam"
                $delay="0.1s"
              />
            </FormGroup>

            <FormGroup $delay="0.2s">
              <Label>Quantity</Label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter quantity"
                $delay="0.2s"
              />
            </FormGroup>

            <FormGroup $delay="0.3s">
              <Label>Unit</Label>
              <Select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                $delay="0.3s"
              >
                <option value="kg">Kilograms</option>
                <option value="grams">Grams</option>
                <option value="pieces">Pieces</option>
                <option value="liters">Liters</option>
                <option value="packets">Packets</option>
              </Select>
            </FormGroup>

            <FormGroup $delay="0.4s">
              <Label>Expiration Date & Time</Label>
              <Input
                type="datetime-local"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                required
                $delay="0.4s"
              />
            </FormGroup>

            <FormGroup $delay="0.5s">
              <Label>Street Address</Label>
              <Input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                required
                placeholder="Enter street address"
                $delay="0.5s"
              />
            </FormGroup>

            <FormGroup $delay="0.6s">
              <Label>City</Label>
              <Input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
                $delay="0.6s"
              />
            </FormGroup>

            <FormGroup $delay="0.7s">
              <Label>State</Label>
              <Input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                required
                placeholder="Enter state"
                $delay="0.7s"
              />
            </FormGroup>

            <FormGroup $delay="0.8s">
              <Label>Pincode</Label>
              <Input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                required
                placeholder="Enter pincode"
                $delay="0.8s"
              />
            </FormGroup>

            <FormGroup $delay="0.9s">
              <Label>Upload Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Button type="submit" $delay="1s">Post Donation</Button>
              <SecondaryButton type="button" $delay="1.1s" onClick={() => {
                setFormData({
                  foodType: '',
                  quantity: '',
                  unit: 'kg',
                  expirationDate: '',
                  address: {
                    street: '',
                    city: '',
                    state: '',
                    pincode: '',
                    country: 'India'
                  },
                  image: null
                });
              }}>
                Clear Form
              </SecondaryButton>
            </div>
          </Form>
        </Card>
      )}

      {activeTab === 1 && (
        <div>
          <DashboardHeader>
            <DashboardTitle>My Donations</DashboardTitle>
          </DashboardHeader>
          
          {donations.length === 0 ? (
            <EmptyState>
              <p>You haven't posted any food donations yet. Start making a difference by sharing your surplus food with those in need.</p>
              <Button onClick={() => setActiveTab(0)} style={{ marginTop: '1.5rem' }} $delay="0.3s">
                Post Your First Donation
              </Button>
            </EmptyState>
          ) : (
            <DonationList>
              {donations.map((donation, index) => (
                <DonationCard key={donation._id} $status={donation.status} $delay={`${0.1 * index}s`}>
                  <DonationTitle>{donation.foodType}</DonationTitle>
                  
                  <DonationInfo>
                    <InfoLabel>Quantity:</InfoLabel>
                    <InfoValue>{donation.quantity} {donation.unit}</InfoValue>
                  </DonationInfo>
                  
                  <DonationInfo>
                    <InfoLabel>Expires:</InfoLabel>
                    <InfoValue>{new Date(donation.expirationDate).toLocaleString()}</InfoValue>
                  </DonationInfo>
                  
                  <DonationInfo>
                    <InfoLabel>Location:</InfoLabel>
                    <InfoValue>{donation.address.city}, {donation.address.state} ({donation.address.pincode})</InfoValue>
                  </DonationInfo>
                  
                  <DonationInfo>
                    <InfoLabel>Status:</InfoLabel>
                    <InfoValue>
                      <StatusBadge $status={donation.status}>
                        {donation.status}
                      </StatusBadge>
                    </InfoValue>
                  </DonationInfo>
                  
                  {donation.claimedBy && (
                    <DonationInfo>
                      <InfoLabel>Claimed by:</InfoLabel>
                      <InfoValue>{donation.claimedBy?.organizationName || donation.claimedBy?.name}</InfoValue>
                    </DonationInfo>
                  )}
                </DonationCard>
              ))}
            </DonationList>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default DonorDashboard;