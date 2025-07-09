import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminAuthContext } from './AdminAuthContext';

//perubahan adminUser ke admin
const PrivateRoute = ({ children }) => {
  const { admin } = useContext(AdminAuthContext);

  return admin ? children : <Navigate to="/logAdmin" />;
};

export default PrivateRoute;
