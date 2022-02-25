import React from 'react';
import { FirebaseProps } from '../config/firebaseProps';
import { AdminScreen } from '../routes/AdminScreen';

const AdminPage = () => (
  <FirebaseProps>
    <AdminScreen />
  </FirebaseProps>
);

export default AdminPage;
