import React from 'react';
import { Accordion } from 'react-bootstrap';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultActive?: boolean;
}

interface BootstrapAccordionProps {
  items: AccordionItem[];
  defaultActiveKey?: string;
  alwaysOpen?: boolean;
  flush?: boolean;
  className?: string;
}

const BootstrapAccordion: React.FC<BootstrapAccordionProps> = ({
  items,
  defaultActiveKey,
  alwaysOpen = false,
  flush = false,
  className = ''
}) => {
  return (
    <Accordion 
      defaultActiveKey={defaultActiveKey}
      alwaysOpen={alwaysOpen}
      flush={flush}
      className={className}
    >
      {items.map((item, index) => (
        <Accordion.Item 
          key={item.id}
          eventKey={item.id}
        >
          <Accordion.Header>
            {item.title}
          </Accordion.Header>
          <Accordion.Body>
            {item.content}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default BootstrapAccordion;
