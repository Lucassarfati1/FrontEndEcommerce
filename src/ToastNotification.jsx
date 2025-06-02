// src/components/ToastNotification.jsx
import React, { useEffect } from 'react';

const ToastNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
      {message}
    </div>
  );
};

export default ToastNotification;
