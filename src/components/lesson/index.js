import { Button, Container, Modal } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';

import './index.css';

const Lesson = ({ children, tips }) => {
  const [show, setShow] = useState(false);

  const onHide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const onClick = useCallback(() => {
    setShow(true);
  }, [setShow]);

  return (
    <Container>
      {tips && (
        <div className="button-container">
          <Button variant="primary" onClick={onClick}>Show Tips</Button>
        </div>
      )}
      <div>{children}</div>
      <Modal size="lg" centered={true} show={show} onHide={onHide}>
        <Modal.Body>{tips}</Modal.Body>
      </Modal>
    </Container>
  );
}

export default Lesson;
