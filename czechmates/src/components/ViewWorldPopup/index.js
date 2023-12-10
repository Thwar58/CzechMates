// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UEInput from '../UEInput';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from "firebase/database";

// a component for viewing world information (not editable by the user)
// input: the name of the world and the members
function VWPopup({ name, worldId, userTheme }) {
  // set the default state of the modal to hidden
  const [show, setShow] = useState(false);

  // functions to handle opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [mems, setMems] = useState([]);
  var [worldInfo, setWorldInfo] = useState();
  var [loading, setLoading] = useState(true);
  var [align, setAlign] = useState("mwPopupCenter");


  useEffect(() => {
    if (worldId !== undefined) {
      // use this path and onValue monitors for changes
      const worldRef = ref(db, 'Worlds/' + worldId);
      onValue(worldRef, (snapshot) => {
        setWorldInfo(snapshot.val());
      });

    }

  }, [worldId]);


  useEffect(() => {

    if (worldInfo !== undefined) {
      setLoading(false)
      var arr = [];
      if (worldInfo.Members != null) {
        // loop through the member objects and create new components containing their information
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Members)) {
          arr.push(<UEInput userTheme={userTheme} charId={key} creatorId={value.CreatorId} setAlign={setAlign} key={key} value={value.Name} ></UEInput>);
        }
        setMems(arr);
      }

    }
  }, [worldInfo, userTheme]);


  useEffect(() => {
    if (worldInfo !== undefined) {
      setLoading(false)
    }


  }, [worldInfo]);

  // render the blank loading screen if loading is true
  if (loading) {
    return (
      <div></div>
    )
  }


  return (
    <>
      {/* the button that triggers the modal */}
      <Button className={"btn_"+userTheme} variant="primary" onClick={handleShow}>
        View
      </Button>

      {/* the modal */}
      <Modal dialogClassName={align} show={show} onHide={handleClose}>
        <Modal.Header className={"body_"+userTheme} closeButton>
          <Modal.Title>{worldInfo.Name}</Modal.Title>
        </Modal.Header>
        {/* the body has all of the world information */}
        <Modal.Body className={"body_"+userTheme}>
          <Form>
            {/* world name */}
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>World Name</Form.Label>
              <Form.Control
                value={worldInfo.Name}
                disabled={true}
            />
            </Form.Group>
            {/* schedule */}
            <Form.Group className="mb-3" controlId="Schedule">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                value={worldInfo.Schedule}
                disabled={true}
            />
            </Form.Group>
            {/* members */}
            <Form.Group className="mb-3" controlId="Members">
              <Form.Label>Members</Form.Label>
              {/* the array of members components */}
              {
                mems
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* the modal footer with the button to close it */}
        <Modal.Footer className={"body_"+userTheme}>
          <Button className={"btn_"+userTheme} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VWPopup;