import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

interface BootstrapNavbarProps {
  brand: string;
  links: { label: string; href: string; active?: boolean }[];
  dropdown?: { title: string; items: { label: string; href: string }[] };
  buttons?: { label: string; variant: string; onClick: () => void }[];
  bg?: string;
  variant?: 'light' | 'dark';
  sticky?: boolean;
}

const BootstrapNavbar: React.FC<BootstrapNavbarProps> = ({
  brand,
  links,
  dropdown,
  buttons = [],
  bg = 'light',
  variant = 'light',
  sticky = true
}) => {
  return (
    <Navbar 
      bg={bg} 
      variant={variant} 
      expand="lg" 
      sticky={sticky ? 'top' : undefined}
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand href="#home">{brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((link, index) => (
              <Nav.Link 
                key={index}
                href={link.href}
                active={link.active}
              >
                {link.label}
              </Nav.Link>
            ))}
            
            {dropdown && (
              <NavDropdown title={dropdown.title} id="basic-nav-dropdown">
                {dropdown.items.map((item, index) => (
                  <NavDropdown.Item key={index} href={item.href}>
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
          </Nav>
          
          {buttons.length > 0 && (
            <div className="d-flex gap-2">
              {buttons.map((button, index) => (
                <Button 
                  key={index}
                  variant={button.variant as any}
                  onClick={button.onClick}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BootstrapNavbar;
