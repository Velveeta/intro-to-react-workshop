import { Link } from 'react-router-dom';
import { Container, Dropdown, Nav } from 'react-bootstrap';
import React, { useCallback, useContext, useState } from 'react';

import { Context } from './context';
import lessons from './lessons';

import './index.css';

export const RouterLink = ({ children, href }) => <Link className="nav-link" to={href}>{children}</Link>;

const Navigation = () => {
  const [show, setShow] = useState(false);
  const { navLinks } = useContext(Context);

  const onToggle = useCallback((isOpen) => {
    setShow(isOpen);
  }, [setShow]);

  const onClick = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <Container>
      <Nav className="flex-nowrap">
        <Nav.Item className="text-nowrap">
          <Nav.Link as={RouterLink} href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item className="text-nowrap">
          <Nav.Link href="https://reactjs.org/docs/react-api.html" rel="noopener noreferrer" target="_blank">React API</Nav.Link>
        </Nav.Item>
        {Object.keys(navLinks).map(url => (
          <Nav.Item className="text-nowrap" key={url}>
            <Nav.Link href={url} rel="noopener noreferrer" target="_blank">{navLinks[url]}</Nav.Link>
          </Nav.Item>
        ))}
        <Dropdown className="text-right lessons-dropdown" as={Nav.Item} show={show} onToggle={onToggle}>
          <Dropdown.Toggle as={Nav.Link}>Lessons</Dropdown.Toggle>
          <Dropdown.Menu alignRight={true}>
            {Object.keys(lessons).map(url => (
              <div key={url} className="dropdown-item" data-toggle="lessons-dropdown" onClick={onClick}>
                <Dropdown.Item as={RouterLink} href={`/${url}`}>{lessons[url]}</Dropdown.Item>
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Container>
  );
};

export default Navigation;
