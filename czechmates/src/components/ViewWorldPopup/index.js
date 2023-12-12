// https://react-bootstrap.netlify.app/docs/components/modal/
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UEInput from '../UEInput';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from "firebase/database";

/**
 * Purpose: the component for viewing a world
 * Params: 
 * worldId: string, the id of the world
 * userTheme: string, the user's color theme
 */
function VWPopup({ worldId, userTheme }) {
  // useStates to open and close the popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useStates to store the information for the popup
  var [mems, setMems] = useState([]);
  var [worldInfo, setWorldInfo] = useState();
  // useStates to track loading and the alignment of the popup
  var [loading, setLoading] = useState(true);
  var [align, setAlign] = useState("mwPopupCenter");

  /**
   * Purpose: loads the world information and listens for changes
   * Params/Dependencies: 
   * worldId
   */
  useEffect(() => {
    if (worldId !== undefined) {
      const worldRef = ref(db, 'Worlds/' + worldId);
      onValue(worldRef, (snapshot) => {
        setWorldInfo(snapshot.val());
      });
    }
  }, [worldId]);

  /**
   * Purpose: loads all of the members for the world
   * Params/Dependencies: 
   * worldInfo
   * userTheme
   */
  useEffect(() => {
    if (worldInfo !== undefined) {
      setLoading(false)
      var arr = [];
      // add uneditable inputs for each of the members
      if (worldInfo.Members != null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Members)) {
          arr.push(<UEInput userTheme={userTheme} charId={key} creatorId={value.CreatorId} setAlign={setAlign} key={key} value={value.Name} ></UEInput>);
        }
        setMems(arr);
      }
    }
  }, [worldInfo, userTheme]);

  /**
   * Purpose: sets the loading state when the worldInfo is loaded
   * Params/Dependencies: 
   * worldInfo
   */
  useEffect(() => {
    if (worldInfo !== undefined) {
      setLoading(false)
    }
  }, [worldInfo]);


  /**
   * Purpose: renders a blank screen if the component information isn't loaded
   * Params/Dependencies: 
   * loading
   */
  if (loading) {
    return (
      <div></div>
    )
  }


  /**
   * Purpose: renders the view world popup
   * Params/Dependencies: 
   * userTheme
   * worldInfo
   */
  return (
    <>
      {/* the button that triggers the modal */}
      <Button className={"btn_" + userTheme} variant="primary" onClick={handleShow}>
        View
      </Button>

      {/* the modal */}
      <Modal dialogClassName={align} show={show} onHide={handleClose}>
        <Modal.Header className={"body_" + userTheme} closeButton>
          <Modal.Title>{worldInfo.Name}</Modal.Title>
        </Modal.Header>
        {/* the body has all of the world information */}
        <Modal.Body className={"body_" + userTheme}>
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
        <Modal.Footer className={"body_" + userTheme}>
          <Button className={"btn_" + userTheme} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VWPopup;