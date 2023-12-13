// https://react-bootstrap.netlify.app/docs/components/modal/
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TypeAhead from '../TypeAhead';
import UEWithTwoButtons from '../UEWithTwoButtons';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, get, onValue, update } from "firebase/database";
import DBFunctions from "../../utils/firebaseQueries";
import InputGroup from 'react-bootstrap/InputGroup';
const worldTemplate = require('../../utils/worldTemplate.json');

/**
 * Purpose: This popup allows the user to create a new world
 * Params:
 * title: string, title of the popup
 * userId: string, the current userId
 * button: string, the text for the trigger button
 * userTheme: string, the color mode (light/dark)
 */
function AddWorldPopup({ title, userId, button, userTheme }) {

  // useStates for opening and closing the popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useStates regarding information about the world
  var [worldId, setWorldId] = useState();
  var [worldInfo, setWorldInfo] = useState();
  var [mems, setMems] = useState();
  var [name, setName] = useState();
  var [schedule, setSchedule] = useState();
  var [inviteCode, setInviteCode] = useState();
  var [friendInfo, setFriendInfo] = useState();

  // useState for the loading screen
  var [loading, setLoading] = useState(true);

  // reference to the database
  const worldRef = ref(db);


  /**
   * Purpose: Adds a world to the database
   * Params: none
   */
  function addWorld() {
    // creates a new world with a random code, belonging to the current user
    if (userId !== undefined) {
      setWorldId(DBFunctions.createNewWorld(worldTemplate, userId, Math.floor(100000 + Math.random() * 900000)));
      
      console.log("Refreshed 3");
    }
  }

  /**
   * Purpose: any time the worldId changes, this is triggered and it gets the new world information
   * and all of the user's friends
   * Params/Dependencies:
   * worldId
   */
  useEffect(() => {
    if (worldId !== undefined) {
      // get the world information from the database for this user, continue listening with onValue
      const worldRef = ref(db, 'Worlds/' + worldId);
      onValue(worldRef, (snapshot) => {
        setWorldInfo(snapshot.val());
      });

      // get the user's friends to populate the invite typeahead, continue listening with onValue
      const userFriendRef = ref(db, 'Users/' + userId + "/Friends");
      onValue(userFriendRef, (snapshot) => {
        setFriendInfo(snapshot.val());
      });

      // open up the popup
      handleShow();
      if(name!='' && schedule!=''){
        setName('');
        setSchedule('');
      }
      console.log("Refreshed 2");
    }
  }, [worldId]);



  /**
   * Purpose: any time the worldInfo changes, this is triggered and it updates the world information
   * and all of the user's friends
   * Params/Dependencies:
   * worldInfo
   */
  useEffect(() => {
    if (worldInfo !== undefined && worldInfo !== null) {
      // set the loading screen to false if information is loading correctly
      setLoading(false);

      // loop through the world members if they exist and add them to the members section as UEWithTwoButton comps
      var arr = [];
      if (worldInfo.Members != null && worldInfo.Members !== undefined) {
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Members)) {
          arr.push(<UEWithTwoButtons key={key} charId={key} charName={value} />);
        }
        setMems(arr);
      }
      // if the world has no members, indicte that to the user
      else {
        setMems(<h4>You have no members yet</h4>)
      }
      setInviteCode(worldInfo.Invite_Code);
    }

  }, [worldInfo]);

  /**
   * Purpose: any time the name or schedule changes, this is triggered and it updates the database
   * Params/Dependencies: 
   * name
   * schedule
   */
  useEffect(() => {
    if (name !== undefined || schedule !== undefined) {
      const updates = {};
      // set each of the paths to update in the database using the information in this page
      updates[`Worlds/${worldId}/Name`] = name;
      updates[`Worlds/${worldId}/Schedule`] = schedule;
      updates[`WorldUserRel/${userId}/Created/${worldId}`] = name;
      // actually update the database
      update(worldRef, updates);
    }

  }, [name, schedule]);



  /**
  * Purpose: only renders the button, not the popup, if the user information isn't loading correctly
  * Params/Dependencies:
  * loading: boolean, whether or not the information is still loading
  */
  if (loading) {
    return (
      // the button that would have triggered the modal if it was loaded, purely visual
      <Button className={"btn_" + userTheme}  onClick={addWorld}>
        {button}
      </Button>
    )
  }

  /**
   * Purpose: this renders whenever all of the world information is correctly loaded
   * Params/Dependencies:
   * name
   * schedule
   * members
   * inviteCode
   */
  return (
    <>
      {/* the button that triggers the popup */}
      <Button className={"btn_" + userTheme} onClick={addWorld}>
        {button}
      </Button>
      {/* the popup itself */}
      <Modal show={show} onHide={handleClose}>
        {/* the title of the popup */}
        <Modal.Header className={"body_" + userTheme} closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"body_" + userTheme}>
          <Form>
            {/* the world name */}
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>World Name</Form.Label>
              <Form.Control
                value={name}
                placeholder='Add World Name'
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            {/* the schedule */}
            <Form.Group className="mb-3" controlId="Schedule">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                value={schedule}
                placeholder='Add Schedule'
                onChange={e => setSchedule(e.target.value)}
              />
            </Form.Group>
            {/* the members */}
            <Form.Label>Members</Form.Label>
            {
              mems
            }
            {/* the typeahead of all the user's friends */}
            <Form.Group className="mb-3" controlId="Friends">
              <Form.Label>Invite Friends</Form.Label>
              <TypeAhead worldCode={inviteCode} userId={userId} action={"sendWorldInvite"} optionInfo={friendInfo} />
            </Form.Group>
            {/* the code */}
            <Form.Group className="mb-3" controlId="Code">
              <Form.Label>Invite Code</Form.Label>
              <InputGroup>
                <Form.Control
                  value={inviteCode}
                  disabled={true}
                />
                {/* the button that copies to code to the clipboard */}
                {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard */}
                <Button className={"btn_" + userTheme}
                  onClick={() => navigator.clipboard.writeText(inviteCode)}
                >
                  Copy
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* the footer with the close button */}
        <Modal.Footer className={"body_" + userTheme}>
          <Button className={"btn_" + userTheme} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWorldPopup;