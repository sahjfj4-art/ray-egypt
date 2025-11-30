import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface BootstrapModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl' | undefined;
  footer?: React.ReactNode;
  centered?: boolean;
}

const BootstrapModal: React.FC<BootstrapModalProps> = ({
  show,
  onHide,
  title,
  children,
  size,
  footer,
  centered = false
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size={size || undefined}
      centered={centered}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      {footer && (
        <Modal.Footer>
          {footer}
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default BootstrapModal;
