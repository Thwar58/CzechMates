// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UEInput from '../UEInput';
import { useEffect } from 'react';

// a component for viewing world information (not editable by the user)
function VWPopup({ name, members }) {
  // set the default state of the modal to hidden
  const [show, setShow] = useState(false);

  // functions to handle opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [mems, setMems] = useState([]);

  useEffect(() => {
    if (members !== undefined) {
      // console.log(charInfo);
      var arr = [];
      // https://flexiple.com/javascript/loop-through-object-javascript
      Object.values(members).forEach(val =>
        arr.push(<UEInput key={val} value={val}></UEInput>));
      setMems(arr);
    }
  }, [members]);


  return (
    <>
      {/* the button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        {/* the body has all of the world information */}
        <Modal.Body>
          <Form>
            {/* world name */}
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>World Name</Form.Label>
              <UEInput value={"Example Name"} />
            </Form.Group>
            {/* schedule */}
            <Form.Group className="mb-3" controlId="Schedule">
              <Form.Label>Schedule</Form.Label>
              <UEInput value={"Meeting day"} />
            </Form.Group>
            {/* members */}
            {/* future: add view character button here */}
            {/* future: generate dynamically instead of hardcoding */}
            <Form.Group className="mb-3" controlId="Members">
              <Form.Label>Members</Form.Label>
              {
                mems
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* the modal footer with the button to close it */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VWPopup;