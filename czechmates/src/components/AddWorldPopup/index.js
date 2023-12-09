// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TypeAhead from '../TypeAhead';
import UEWithTwoButtons from '../UEWithTwoButtons';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update } from "firebase/database";
import DBFunctions from "../../utils/firebaseQueries";
const worldTemplate = require('../../utils/worldTemplate.json');

// a function for the manage/add world modal, you pass in the title and the button display
// input: the title of the popup, the button to trigger the modal, and the members to display
function AddWorldPopup({ title, userId, button, userTheme }) {
  // sets the initial state of the modal to hidden
  const [show, setShow] = useState(false);
  // handles the opening and closing of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // a variable to set and track the members of a world

  var [worldId, setWorldId] = useState();
  var [worldInfo, setWorldInfo] = useState();
  var [mems, setMems] = useState();
  var [loading, setLoading] = useState(true);
  var [name, setName] = useState();
  var [schedule, setSchedule] = useState();
  var [inviteCode, setInviteCode] = useState();
  var [friendInfo, setFriendInfo] = useState();
  const worldRef = ref(db);

  function addWorld() {
    // console.log("add a world")
    if (userId !== undefined) {
      setWorldId(DBFunctions.createNewWorld(worldTemplate, userId, "placeholdercode"));

    }
  }

  

  useEffect(() => {
    // console.log("world id changed");
    // console.log("check world info ", worldInfo);
    // check that members is not undefined otherwise it will throw an error
    if (worldId !== undefined) {
       // use this path and onValue monitors for changes
       const worldRef = ref(db, 'Worlds/' + worldId);
       onValue(worldRef, (snapshot) => {
         setWorldInfo(snapshot.val());
       });
      //  console.log("world info ", worldInfo)
      const userFriendRef = ref(db, 'Users/' + userId + "/Friends");
      onValue(userFriendRef, (snapshot) => {
        setFriendInfo(snapshot.val());
      });

 
       handleShow();

    }
  }, [worldId]);

  

  // when members changes, this is triggered
  useEffect(() => {
    // console.log("check world info ", worldInfo);
    // check that members is not undefined otherwise it will throw an error
    if (worldInfo !== undefined && worldInfo !== null) {
      setLoading(false);
      console.log(worldInfo);
      // console.log("check world info ", worldInfo);
      // loop through the members objects and create components to display them, set the members array at the end
      var arr = [];
      // console.log("check WI for members ", worldInfo);
      if (worldInfo.Members != null && worldInfo.Members !== undefined) {
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Members)) {
          // console.log("check name ", value);
          // pass in the key, the character name, and the id of who created the character
          arr.push(<UEWithTwoButtons key={key} charId={key} charName={value} />);
        }
        setMems(arr);
      
      }
      else{
        setMems(<h1>You have no members yet</h1>)
    }
        // console.log("set them ", worldInfo.Name, worldInfo.Schedule);
        setName(worldInfo.Name);
        setSchedule(worldInfo.Schedule);
        setInviteCode(worldInfo.Invite_Code);
        // console.log("check them ", name, schedule);



    }
  }, [worldInfo]);

  // // // when the form value changes, this is triggered
  useEffect(() => {
    if (name !== undefined && schedule !== undefined) {
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
      <Button  className={"btn_"+userTheme} onClick={addWorld}>
        {button}
      </Button>
    )
  }


  return (
    <>
      {/* the button that triggers the modal */}
      <Button  className={"btn_"+userTheme} onClick={addWorld}>
        {button}
      </Button>

      {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        {/* set the modal header */}
        <Modal.Header className={"body_"+userTheme} closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {/* the modal body with the world information (editable by the user) */}
        <Modal.Body className={"body_"+userTheme}>
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
            
              <TypeAhead worldCode={inviteCode} userId={userId} action={"sendWorldInvite"} optionInfo={friendInfo}/> 
            </Form.Group>
            {/* the search code */}
            <Form.Group className="mb-3" controlId="Code">
              <Form.Label>Invite Code</Form.Label>
              <Form.Control
                value={inviteCode}
                disabled={true}
            />
            </Form.Group>
          </Form>
          {/* the footer with the close button */}
        </Modal.Body>
        <Modal.Footer className={"body_"+userTheme}>
          <Button className={"btn_"+userTheme} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWorldPopup;