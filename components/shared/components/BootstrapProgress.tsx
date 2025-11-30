import React from 'react';
import { ProgressBar, Badge } from 'react-bootstrap';

interface BootstrapProgressProps {
  value: number;
  max?: number;
  label?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  striped?: boolean;
  animated?: boolean;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BootstrapProgress: React.FC<BootstrapProgressProps> = ({
  value,
  max = 100,
  label,
  variant = 'primary',
  striped = false,
  animated = false,
  showPercentage = true,
  size = 'md',
  className = ''
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: '',
    md: '',
    lg: 'progress-lg'
  };

  return (
    <div className={className}>
      {label && (
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-medium">{label}</span>
          {showPercentage && (
            <Badge bg={variant} className="px-2 py-1">
              {percentage}%
            </Badge>
          )}
        </div>
      )}
      
      <ProgressBar 
        now={value}
        max={max}
        variant={variant}
        striped={striped}
        animated={animated}
        className={sizeClasses[size]}
      />
    </div>
  );
};

export default BootstrapProgress;
