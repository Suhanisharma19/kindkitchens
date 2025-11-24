// Utility functions for authentication

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role;
};

export const isAdmin = () => {
  return getUserRole() === 'admin';
};

export const isDonor = () => {
  return getUserRole() === 'donor';
};

export const isNGO = () => {
  return getUserRole() === 'ngo';
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};