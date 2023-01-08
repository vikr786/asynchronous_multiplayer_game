import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Notification = () => {
  const { notification } = useAuth();

  return (
    <div className="notification">
      {notification && <div className="message">{notification}</div>}
    </div>
  );
};

export default Notification;
