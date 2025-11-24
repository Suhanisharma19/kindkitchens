import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const DonationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const DonationCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1.5rem;
  border-left: 4px solid ${props => {
    switch (props.status) {
      case 'available': return '#4caf50';
      case 'claimed': return '#ff9800';
      case 'pickedup': return '#2196f3';
      case 'delivered': return '#9c27b0';
      default: return '#9e9e9e';
    }
  }};
`;

const DonationTitle = styled.h3`
  margin-top: 0;
  color: #333;
`;

const DonationInfo = styled.p`
  margin: 0.5rem 0;
  color: #666;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'available': return '#e8f5e9';
      case 'claimed': return '#fff3e0';
      case 'pickedup': return '#e3f2fd';
      case 'delivered': return '#f3e5f5';
      default: return '#eeeeee';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'available': return '#2e7d32';
      case 'claimed': return '#ef6c00';
      case 'pickedup': return '#1565c0';
      case 'delivered': return '#6a1b9a';
      default: return '#616161';
    }
  }};
`;

const ActionButton = styled.button`
  background-color: ${props => props.color || '#4caf50'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${props => props.hoverColor || '#45a049'};
  }
`;

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [availableDonations, setAvailableDonations] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [searchPincode, setSearchPincode] = useState('');

  const sidebarItems = [
    { label: 'Available Donations', action: () => setActiveTab(0) },
    { label: 'My Claims', action: () => setActiveTab(1) }
  ];

  // Fetch available donations
  useEffect(() => {
    const fetchAvailableDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/donations/available?pincode=${searchPincode}`);
        setAvailableDonations(res.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    if (activeTab === 0) {
      fetchAvailableDonations();
    }
  }, [activeTab, searchPincode]);

  // Fetch NGO's claimed donations
  useEffect(() => {
    const fetchMyDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/donations/ngo');
        setMyDonations(res.data);
      } catch (err) {
        console.error('Error fetching my donations:', err);
      }
    };

    if (activeTab === 1) {
      fetchMyDonations();
    }
  }, [activeTab]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The effect will automatically re-fetch when searchPincode changes
  };

  const handleClaimDonation = async (donationId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`/donations/${donationId}/claim`, {});
      
      // Update the UI
      setAvailableDonations(availableDonations.filter(d => d._id !== donationId));
      alert('Donation claimed successfully!');
    } catch (err) {
      alert('Error claiming donation: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  const handleUpdateStatus = async (donationId, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`/donations/${donationId}/status`, 
        { status }
      );
      
      // Update the UI
      setMyDonations(myDonations.map(d => 
        d._id === donationId ? res.data : d
      ));
      
      alert(`Status updated to ${status} successfully!`);
    } catch (err) {
      alert('Error updating status: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <DashboardLayout 
      title="NGO Dashboard" 
      sidebarItems={sidebarItems} 
      activeItem={activeTab}
    >
      {activeTab === 0 && (
        <div>
          <Card>
            <h2>Find Available Donations</h2>
            <Form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Enter pincode to search"
                value={searchPincode}
                onChange={(e) => setSearchPincode(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </Form>
          </Card>

          <h2>Available Donations</h2>
          {availableDonations.length === 0 ? (
            <p>No available donations found. Try searching with a different pincode.</p>
          ) : (
            <DonationList>
              {availableDonations.map(donation => (
                <DonationCard key={donation._id} status={donation.status}>
                  <DonationTitle>{donation.foodType}</DonationTitle>
                  <DonationInfo><strong>Quantity:</strong> {donation.quantity} {donation.unit}</DonationInfo>
                  <DonationInfo><strong>Expires:</strong> {new Date(donation.expirationDate).toLocaleString()}</DonationInfo>
                  <DonationInfo><strong>Location:</strong> {donation.address.street}, {donation.address.city}, {donation.address.pincode}</DonationInfo>
                  <DonationInfo>
                    <strong>Status:</strong> 
                    <StatusBadge status={donation.status}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </StatusBadge>
                  </DonationInfo>
                  <DonationInfo>
                    <strong>Urgency:</strong> 
                    <StatusBadge status={donation.urgencyScore > 7 ? 'claimed' : donation.urgencyScore > 4 ? 'pickedup' : 'available'}>
                      {donation.urgencyScore > 7 ? 'High Priority' : donation.urgencyScore > 4 ? 'Medium Priority' : 'Low Priority'}
                    </StatusBadge>
                  </DonationInfo>
                  <ActionButton onClick={() => handleClaimDonation(donation._id)}>
                    Claim Donation
                  </ActionButton>
                </DonationCard>
              ))}
            </DonationList>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <h2>My Claimed Donations</h2>
          {myDonations.length === 0 ? (
            <p>You haven't claimed any donations yet.</p>
          ) : (
            <DonationList>
              {myDonations.map(donation => (
                <DonationCard key={donation._id} status={donation.status}>
                  <DonationTitle>{donation.foodType}</DonationTitle>
                  <DonationInfo><strong>Quantity:</strong> {donation.quantity} {donation.unit}</DonationInfo>
                  <DonationInfo><strong>Expires:</strong> {new Date(donation.expirationDate).toLocaleString()}</DonationInfo>
                  <DonationInfo><strong>Donor:</strong> {donation.donor?.name} ({donation.donor?.phone})</DonationInfo>
                  <DonationInfo><strong>Location:</strong> {donation.address.street}, {donation.address.city}, {donation.address.pincode}</DonationInfo>
                  <DonationInfo>
                    <strong>Status:</strong> 
                    <StatusBadge status={donation.status}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </StatusBadge>
                  </DonationInfo>
                  
                  {donation.status === 'claimed' && (
                    <ActionButton 
                      color="#2196f3" 
                      hoverColor="#1976d2"
                      onClick={() => handleUpdateStatus(donation._id, 'pickedup')}
                    >
                      Mark as Picked Up
                    </ActionButton>
                  )}
                  
                  {donation.status === 'pickedup' && (
                    <ActionButton 
                      color="#9c27b0" 
                      hoverColor="#7b1fa2"
                      onClick={() => handleUpdateStatus(donation._id, 'delivered')}
                    >
                      Mark as Delivered
                    </ActionButton>
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

export default NGODashboard;