import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

interface BootstrapCardProps {
  title: string;
  text: string;
  image?: string;
  badges?: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const BootstrapCard: React.FC<BootstrapCardProps> = ({
  title,
  text,
  image,
  badges = [],
  buttonText,
  onButtonClick,
  className = ''
}) => {
  return (
    <Card className={`shadow-sm ${className}`}>
      {image && (
        <Card.Img variant="top" src={image} alt={title} />
      )}
      <Card.Body>
        <Card.Title className="h5">{title}</Card.Title>
        <Card.Text className="text-muted">{text}</Card.Text>
        
        {badges.length > 0 && (
          <div className="mb-3">
            {badges.map((badge, index) => (
              <Badge key={index} bg="secondary" className="me-1">
                {badge}
              </Badge>
            ))}
          </div>
        )}
        
        {buttonText && onButtonClick && (
          <Button variant="primary" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default BootstrapCard;
