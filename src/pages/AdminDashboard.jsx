import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import DashboardLayout from '../components/DashboardLayout';
import api from '../utils/api';

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
    transform: translateX(30px);
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
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 0.8s ease-out;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${slideIn} 0.8s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
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
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #2c3e50;
  margin: 1.5rem 0;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${pulse} 3s infinite;
`;

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.8s ease-out 0.3s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const TableHead = styled.thead`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(248, 249, 250, 0.5);
  }
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.1);
  }
`;

const TableHeader = styled.th`
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  font-size: 1.1rem;
`;

const TableCell = styled.td`
  padding: 1.2rem;
  border-bottom: 1px solid rgba(238, 238, 238, 0.5);
  color: #2c3e50;
  font-size: 1rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: ${props => {
    switch (props.status) {
      case 'available': return '#e8f5e9';
      case 'claimed': return '#fff3e0';
      case 'pickedup': return '#e3f2fd';
      case 'delivered': return '#f3e5f5';
      case 'expired': return '#ffebee';
      default: return '#eeeeee';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'available': return '#27ae60';
      case 'claimed': return '#f39c12';
      case 'pickedup': return '#3498db';
      case 'delivered': return '#9b59b6';
      case 'expired': return '#e74c3c';
      default: return '#7f8c8d';
    }
  }};
  text-transform: capitalize;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
`;

const ActionButton = styled.button`
  background: ${props => {
    switch (props.type) {
      case 'block': return 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
      case 'unblock': return 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
      default: return 'linear-gradient(135deg, #3498db 0%, #2c3e50 100%)';
    }
  }};
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-right: 0.7rem;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    animation: ${pulse} 2s infinite;
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin: 2rem 0 1.5rem 0;
  background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeIn} 0.8s ease-out;
`;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    totalNgos: 0,
    deliveredDonations: 0,
    recentDeliveries: 0,
    peopleServed: 0
  });
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);

  const sidebarItems = [
    { label: 'Dashboard', action: () => setActiveTab(0) },
    { label: 'Users', action: () => setActiveTab(1) },
    { label: 'Donations', action: () => setActiveTab(2) }
  ];

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    if (activeTab === 0) {
      fetchStats();
    }
  }, [activeTab]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    if (activeTab === 1) {
      fetchUsers();
    }
  }, [activeTab]);

  // Fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/admin/donations');
        setDonations(res.data);
      } catch (err) {
        console.error('Error fetching donations:', err);
      }
    };

    if (activeTab === 2) {
      fetchDonations();
    }
  }, [activeTab]);

  const handleToggleUserStatus = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(`/admin/users/${userId}/toggle`, {});
      
      // Update the UI
      setUsers(users.map(user => 
        user._id === userId ? res.data.user : user
      ));
      
      alert(res.data.message);
    } catch (err) {
      alert('Error updating user status: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      sidebarItems={sidebarItems} 
      activeItem={activeTab}
    >
      {activeTab === 0 && (
        <div>
          <SectionTitle>Impact Dashboard</SectionTitle>
          <StatsContainer>
            <StatCard delay="0.1s">
              <StatNumber>{stats.totalDonations}</StatNumber>
              <StatLabel>Total Donations</StatLabel>
            </StatCard>
            
            <StatCard delay="0.2s">
              <StatNumber>{stats.totalDonors}</StatNumber>
              <StatLabel>Total Donors</StatLabel>
            </StatCard>
            
            <StatCard delay="0.3s">
              <StatNumber>{stats.totalNgos}</StatNumber>
              <StatLabel>Total NGOs</StatLabel>
            </StatCard>
            
            <StatCard delay="0.4s">
              <StatNumber>{stats.deliveredDonations}</StatNumber>
              <StatLabel>Delivered Donations</StatLabel>
            </StatCard>
            
            <StatCard delay="0.5s">
              <StatNumber>{stats.peopleServed}</StatNumber>
              <StatLabel>People Served (Estimate)</StatLabel>
            </StatCard>
          </StatsContainer>
        </div>
      )}

      {activeTab === 1 && (
        <div>
          <SectionTitle>Users Management</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.role === 'donor' ? 'available' : user.role === 'ngo' ? 'claimed' : 'delivered'}>
                      {user.role}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.isActive ? 'available' : 'expired'}>
                      {user.isActive ? 'Active' : 'Blocked'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionButton 
                      type={user.isActive ? 'block' : 'unblock'}
                      onClick={() => handleToggleUserStatus(user._id)}
                    >
                      {user.isActive ? 'Block' : 'Unblock'}
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {activeTab === 2 && (
        <div>
          <SectionTitle>All Donations</SectionTitle>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Food Type</TableHeader>
                <TableHeader>Donor</TableHeader>
                <TableHeader>Quantity</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Created</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {donations.map((donation, index) => (
                <TableRow key={donation._id}>
                  <TableCell>{donation.foodType}</TableCell>
                  <TableCell>{donation.donor?.name}</TableCell>
                  <TableCell>{donation.quantity} {donation.unit}</TableCell>
                  <TableCell>
                    <StatusBadge status={donation.status}>
                      {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;