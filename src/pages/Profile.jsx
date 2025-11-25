import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { isAuthenticated } from '../utils/auth';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', 'Poppins', sans-serif;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const ProfileTitle = styled.h1`
  color: #4CAF50;
  margin-bottom: 0.5rem;
`;

const ProfileSubtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DetailCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const DetailTitle = styled.h3`
  color: #4CAF50;
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const DetailItem = styled.div`
  margin-bottom: 0.8rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
`;

const DetailValue = styled.span`
  color: #666;
`;

const ActionButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 1rem;

  &:hover {
    background: #45a049;
    transform: translateY(-2px);
  }
`;

const BackButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
  }
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = isAuthenticated();
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await api.get('/auth/profile');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile data');
        setLoading(false);
        console.error('Profile fetch error:', err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleBack = () => {
    // Navigate back to the appropriate dashboard based on user role
    if (user) {
      switch (user.role) {
        case 'donor':
          navigate('/donor');
          break;
        case 'ngo':
          navigate('/ngo');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Loading Profile...</ProfileTitle>
        </ProfileHeader>
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer>
        <ProfileHeader>
          <ProfileTitle>Error</ProfileTitle>
          <ProfileSubtitle>{error}</ProfileSubtitle>
        </ProfileHeader>
        <div style={{ textAlign: 'center' }}>
          <BackButton onClick={handleBack}>Back to Dashboard</BackButton>
        </div>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>My Profile</ProfileTitle>
        <ProfileSubtitle>View and manage your account information</ProfileSubtitle>
      </ProfileHeader>

      <ProfileDetails>
        <DetailCard>
          <DetailTitle>Personal Information</DetailTitle>
          <DetailItem>
            <DetailLabel>Name:</DetailLabel>
            <DetailValue>{user?.name}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Email:</DetailLabel>
            <DetailValue>{user?.email}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Phone:</DetailLabel>
            <DetailValue>{user?.phone || 'Not provided'}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Role:</DetailLabel>
            <DetailValue>{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</DetailValue>
          </DetailItem>
        </DetailCard>

        <DetailCard>
          <DetailTitle>Account Information</DetailTitle>
          <DetailItem>
            <DetailLabel>Member Since:</DetailLabel>
            <DetailValue>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Last Updated:</DetailLabel>
            <DetailValue>
              {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Status:</DetailLabel>
            <DetailValue>
              <span style={{ color: user?.isActive ? '#4CAF50' : '#f44336' }}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </span>
            </DetailValue>
          </DetailItem>
        </DetailCard>

        {user?.role === 'ngo' && (
          <DetailCard>
            <DetailTitle>Organization Information</DetailTitle>
            <DetailItem>
              <DetailLabel>Organization Name:</DetailLabel>
              <DetailValue>{user?.organizationName || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>License Number:</DetailLabel>
              <DetailValue>{user?.licenseNumber || 'Not provided'}</DetailValue>
            </DetailItem>
          </DetailCard>
        )}

        {user?.address && (
          <DetailCard>
            <DetailTitle>Address Information</DetailTitle>
            <DetailItem>
              <DetailLabel>Street:</DetailLabel>
              <DetailValue>{user.address.street || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>City:</DetailLabel>
              <DetailValue>{user.address.city || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>State:</DetailLabel>
              <DetailValue>{user.address.state || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Pincode:</DetailLabel>
              <DetailValue>{user.address.pincode || 'Not provided'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Country:</DetailLabel>
              <DetailValue>{user.address.country || 'Not provided'}</DetailValue>
            </DetailItem>
          </DetailCard>
        )}
      </ProfileDetails>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <ActionButton onClick={() => navigate('/edit-profile')}>Edit Profile</ActionButton>
        <BackButton onClick={handleBack}>Back to Dashboard</BackButton>
      </div>
    </ProfileContainer>
  );
};

export default Profile;