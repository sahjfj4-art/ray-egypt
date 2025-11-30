import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

interface CarouselItem {
  image: string;
  caption: string;
  title?: string;
}

interface BootstrapCarouselProps {
  items: CarouselItem[];
  controls?: boolean;
  indicators?: boolean;
  interval?: number;
  fade?: boolean;
  className?: string;
}

const BootstrapCarousel: React.FC<BootstrapCarouselProps> = ({
  items,
  controls = true,
  indicators = true,
  interval = 5000,
  fade = false,
  className = ''
}) => {
  return (
    <Carousel 
      controls={controls}
      indicators={indicators}
      interval={interval}
      fade={fade}
      className={className}
    >
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <Image 
            src={item.image} 
            alt={item.title || item.caption}
            fluid
            className="d-block w-100"
            style={{ height: '400px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BootstrapCarousel;
