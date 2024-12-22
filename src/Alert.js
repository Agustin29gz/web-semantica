import React from 'react';
import './Alert.css';

const Alert = ({ message, type }) => {
  return <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'}`}>{message}</div>;
};

export default Alert;
