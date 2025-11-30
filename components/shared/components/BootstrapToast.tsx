import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

interface ToastItem {
  id: string;
  title: string;
  message: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  delay?: number;
  autohide?: boolean;
}

interface BootstrapToastProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
  position?: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
  className?: string;
}

const BootstrapToast: React.FC<BootstrapToastProps> = ({
  toasts,
  onClose,
  position = 'top-end',
  className = ''
}) => {
  const getVariantClass = (variant?: string) => {
    switch (variant) {
      case 'success': return 'bg-success';
      case 'danger': return 'bg-danger';
      case 'warning': return 'bg-warning';
      case 'info': return 'bg-info';
      case 'primary': return 'bg-primary';
      case 'secondary': return 'bg-secondary';
      default: return 'bg-primary';
    }
  };

  return (
    <ToastContainer position={position} className={`p-3 ${className}`}>
      {toasts.map((toast) => (
        <Toast 
          key={toast.id}
          onClose={() => onClose(toast.id)}
          show={true}
          delay={toast.delay || 5000}
          autohide={toast.autohide !== false}
          bg={toast.variant || 'primary'}
          className="text-white"
        >
          <Toast.Header 
            className={getVariantClass(toast.variant)}
            closeVariant="white"
          >
            <strong className="me-auto">{toast.title}</strong>
            <small>الآن</small>
          </Toast.Header>
          <Toast.Body>
            {toast.message}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default BootstrapToast;
