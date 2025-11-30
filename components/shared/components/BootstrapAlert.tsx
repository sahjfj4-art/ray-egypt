import React from 'react';
import { Alert } from 'react-bootstrap';

interface BootstrapAlertProps {
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  heading?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
  className?: string;
}

const BootstrapAlert: React.FC<BootstrapAlertProps> = ({
  variant,
  heading,
  children,
  dismissible = false,
  onClose,
  className = ''
}) => {
  return (
    <Alert 
      variant={variant} 
      dismissible={dismissible}
      onClose={onClose}
      className={className}
    >
      {heading && <Alert.Heading>{heading}</Alert.Heading>}
      {children}
    </Alert>
  );
};

export default BootstrapAlert;
