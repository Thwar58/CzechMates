// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
// import TypeAheadWithButton from "../TypeAheadWithButton";
import TypeAhead from '../TypeAhead';
import EUWithButtons from '../UEWithTwoButtons';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update } from "firebase/database";

// a function for the manage/add world modal, you pass in the title and the button display
// input: the title of the popup, the button to trigger the modal, and the members to display
function MWPopup({ title, userId, button, worldId }) {
  // sets the initial state of the modal to hidden
  const [show, setShow] = useState(false);
  // handles the opening and closing of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // a variable to set and track the members of a world

  var [worldId] = useState(worldId);
  var [worldInfo, setWorldInfo] = useState();
  var [mems, setMems] = useState();
  var [loading, setLoading] = useState(true);
  var [name, setName] = useState();
  var [schedule, setSchedule] = useState();
  var [friendInfo, setFriendInfo] = useState();
  const worldRef = ref(db);



  useEffect(() => {
    if (worldId !== undefined) {
      // use this path and onValue monitors for changes
      const worldRef = ref(db, 'Worlds/' + worldId);
      onValue(worldRef, (snapshot) => {
        setWorldInfo(snapshot.val());
      });

      const userFriendRef = ref(db, 'Users/' + userId + "/Friends");
      onValue(userFriendRef, (snapshot) => {
        setFriendInfo(snapshot.val());
      });


    }


  }, [worldId]);



  // when members changes, this is triggered
  useEffect(() => {
    // console.log("check world info ", worldInfo);
    // check that members is not undefined otherwise it will throw an error
    if (worldInfo !== undefined) {
      setLoading(false);
      // console.log("check world info ", worldInfo);
      // loop through the members objects and create components to display them, set the members array at the end
      var arr = [];
      if (worldInfo.Members != null) {
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Members)) {
          // console.log("check name ", value);
          // pass in the key, the character name, and the id of who created the character
          arr.push(<EUWithButtons key={key} charId={key} charName={value} button1={"View"} button2={"Remove"} />);
        }
        setMems(arr);
      }

      // console.log("set them ", worldInfo.Name, worldInfo.Schedule);
      setName(worldInfo.Name);
      setSchedule(worldInfo.Schedule);
      // console.log("check them ", name, schedule);


    }
  }, [worldInfo]);

  // // when the form value changes, this is triggered
  useEffect(() => {
    if (name != undefined && schedule != undefined) {

      // take the label value and replace any spaces with underscores to match the db naming system
      // var underScoreAdded = label.replace(/ /g, "_");
      // ignore the modification slots for now (it is broken and needs to be fixed)
      // if (!underScoreAdded.includes("Slot")){
      // make an object to store the different paths that need to be updated
      const updates = {};
      // use the path to the specific property that this form field maps to in the database
      // and set it to the value in the form
      // console.log("this is the id right? ", worldId);
      // console.log("check name one more time ", schedule);
      updates[`Worlds/${worldId}/Name`] = name;
      updates[`Worlds/${worldId}/Schedule`] = schedule;
      updates[`WorldUserRel/${userId}/Created/${worldId}`] = name;
      // }
      update(worldRef, updates);
      // } 
    }


  }, [name, schedule]);



  // render the blank loading screen if loading is true
  if (loading) {
    return (
      <div></div>
    )
  }


  return (
    <>
      {/* the button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        {button}
      </Button>

      {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        {/* set the modal header */}
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {/* the modal body with the world information (editable by the user) */}
        <Modal.Body>
          <Form>
            {/* world name info */}
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>World Name</Form.Label>
              <Form.Control
                value={name}
                placeholder='Add World Name'
                onChange={e => setName(e.target.value)}
              />
              {/* world schedule */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Schedule">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                value={schedule}
                placeholder='Add Schedule'
                onChange={e => setSchedule(e.target.value)}
              />
            </Form.Group>
            {/* world members, which the user can view the character of or remove */}
            {/* future: add confirmation modal for remove */}
            <Form.Label>Members</Form.Label>
            {/* the array of members components */}
            {
              mems
            }
            {/* future: decide on search bar */}
            <Form.Group className="mb-3" controlId="Friends">
              <Form.Label>Invite Friends</Form.Label>
              <TypeAhead action={"sendWorldInvite"} friendInfo={friendInfo}/> 
            </Form.Group>
            {/* the search code */}
            <Form.Group className="mb-3" controlId="Code">
              <Form.Label>Invite Code</Form.Label>
              <Form.Control
                value={worldInfo.Invite_Code}
                disabled={true}
            />
            </Form.Group>
          </Form>
          {/* the footer with the close button */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MWPopup;