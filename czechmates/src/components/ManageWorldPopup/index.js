// https://react-bootstrap.netlify.app/docs/components/modal/
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TypeAhead from '../TypeAhead';
import UEWithTwoButtons from '../UEWithTwoButtons';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update } from "firebase/database";
import InputGroup from 'react-bootstrap/InputGroup';

/**
 * Purpose: this component is for the manage world popup for world owners
 * Params: 
 * userId: string, the user's id
 * button: string, the label for the button
 * worldId: string, the id of the world that is being edited
 * userTheme: string, the user's color theme
 */
function MWPopup({ userId, button, worldId, userTheme }) {
  // useStates for opening and closing the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // useStates that store the world information
  var [worldInfo, setWorldInfo] = useState();
  var [mems, setMems] = useState();
  var [name, setName] = useState();
  var [inviteCode, setInviteCode] = useState();
  var [schedule, setSchedule] = useState();

  // useState to populate the invite friends typeahead
  var [friendInfo, setFriendInfo] = useState();

  // useState for formatting the popups positioning
  var [align, setAlign] = useState("mwPopupCenter");

  // useState to deal with data loading delays
  var [loading, setLoading] = useState(true);

  // the database reference
  const worldRef = ref(db);


  /**
  * Purpose: triggers when the world id changes, gets the world info and the friend info for this user and world
  * Params/Dependencies: 
  * worldId
  */
  useEffect(() => {
    // get the information for the world with this id
    if (worldId !== undefined) {
      const worldRef = ref(db, 'Worlds/' + worldId);
      onValue(worldRef, (snapshot) => {
        setWorldInfo(snapshot.val());
      });
    // get the friend information for this user
    const userFriendRef = ref(db, 'Users/' + userId + "/Friends");
    onValue(userFriendRef, (snapshot) => {
      setFriendInfo(snapshot.val());
    });
    }

  }, [worldId]);



  /**
  * Purpose: adds the members of the world when the worldInfo changes
  * Params/Dependencies: 
  * userTheme
  * worldInfo
  */
  useEffect(() => {
    if (worldInfo !== undefined && worldInfo !== null) {
      // sets loading to false when the information is loaded correctly
      setLoading(false);
      // loop through the members objects and create components to display them, set the members array at the end
      var arr = [];
      if (worldInfo.Members !== null && worldInfo.Members !== undefined) {
        // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Members)) {
          arr.push(<UEWithTwoButtons charCreatorId={value.CreatorId} userTheme={userTheme} key={key} charId={key} worldId={worldId} charName={value.Name} creatorId={value.CreatorId}
            setAlign={setAlign} />);
        }
        setMems(arr);
        // if the world has no members then indicate that to the user
      } else {
        setMems(<h4>You have no members yet</h4>)
      }
      // set all of the world information 
      setName(worldInfo.Name);
      setSchedule(worldInfo.Schedule);
      setInviteCode(worldInfo.Invite_Code);

    }
    // if the world info has been reset, go back to loading
    else {
      setLoading(true);
    }
  }, [worldInfo, userTheme]);

  /**
  * Purpose: updates the name and schedule of the world when they are edited
  * Params/Dependencies: 
  * name
  * schedule
  */
  useEffect(() => {
    // update the world name and schedule in the database when they are changed
    if (name !== undefined && schedule !== undefined) {
      const updates = {};
      updates[`Worlds/${worldId}/Name`] = name;
      updates[`Worlds/${worldId}/Schedule`] = schedule;
      // update the name of the world for the creator
      updates[`WorldUserRel/${userId}/Created/${worldId}`] = name;
      update(worldRef, updates);
    }

  }, [name, schedule]);



  /**
  * Purpose: loads a blank screen if information is not loaded properly yet
  * Params/Dependencies: 
  * loading
  */
  if (loading) {
    return (
      <div></div>
    )
  }

  /**
   * Purpose: renders the manage world popup when information has been loaded
   * Params/Dependencies: 
   * userTheme
   * button
   * name
   * schedule
   * inviteCode
   * align
   * mems
   * friendInfo
   */
  return (
    <>
      {/* the button that triggers the popup */}
      <Button className={"btn_" + userTheme} onClick={handleShow}>
        {button}
      </Button>

      {/* the popup */}
      <Modal dialogClassName={align} show={show} onHide={handleClose}>
        {/* set the popup header */}
        <Modal.Header className={"body_" + userTheme} closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        {/* the popup body with the world information (editable by the user) */}
        <Modal.Body className={"body_" + userTheme}>
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
            <Form.Label>Members</Form.Label>
            {/* the array of members components */}
            {
              mems
            }
            {/* the typeahead for the user's freinds to be invited */}
            <Form.Group className="mb-3" controlId="Friends">
              <Form.Label>Invite Friends</Form.Label>
              <TypeAhead action={"sendWorldInvite"} optionInfo={friendInfo} userId={userId} worldCode={inviteCode} />
            </Form.Group>
            {/* the join code */}
            <Form.Group className="mb-3" controlId="Code">
              <Form.Label>Invite Code</Form.Label>
              <InputGroup>
                <Form.Control
                  value={inviteCode}
                  disabled={true}
                />
                {/* a button that copies the join code to clipboard */}
                {/* https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard */}
                <Button className={"btn_" + userTheme}
                  onClick={() => navigator.clipboard.writeText(inviteCode)}
                >
                  Copy
                </Button>
              </InputGroup>

            </Form.Group>
          </Form>
          {/* the footer with the close button */}
        </Modal.Body>
        <Modal.Footer className={"body_" + userTheme}>
          <Button className={"btn_" + userTheme} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MWPopup;