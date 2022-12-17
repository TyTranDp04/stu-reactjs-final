import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ModalRequestChange(props) {
  const {showRequestChange, setShowRequestChange} = props.handle
  const data = props.data
  const type = props.type
  return (
      <Modal show={showRequestChange}>
        <Modal.Header>
          <Modal.Title>Request change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label style={{fontSize: '20px'}}>Reason for change</Form.Label>
              <Form.Control placeholder='Need more detail' as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' variant="secondary" onClick={()=> setShowRequestChange(false)}>
            Cancel
          </Button>
          <Button type='button' variant="primary" onClick={''}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalRequestChange