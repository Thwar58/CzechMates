// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, child, update, get } from "firebase/database";
import { db } from '../../firebase';

// a component for the confirmation modal
function ConfirmationPopup({ name, type, action }) {
  // sets the default state of the modal
  const [show, setShow] = useState(false);

  // handles opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const worldRef = ref(db);



  function removal() {

    console.log("triggered ", type);
    console.log(action);
    const updates = {};

    if (type === "removeChara") {
      console.log("remove one of your characters");
      get(child(worldRef, `Characters/${action.charId}/Participation`)).then((snapshot) => {
        if (snapshot.exists()) {
          // remove the character from the world they are in
          updates[`Worlds/${snapshot.val()}/Members/${action.charId}`] = null;
          // remove the world from the user relationship in worlds they joined?
          updates[`WorldUserRel/${action.userId}/Joined/${snapshot.val()}`] = null;
          // remove the world from the user relationship in worlds they created?
          updates[`WorldUserRel/${action.userId}/Created/${snapshot.val()}`] = null;
        } else {
          console.log("No data available");
        }
        // remove the character from the characters list
        updates[`Characters/${action.charId}`] = null;
        // remove the character from the user character relationship
        updates[`CharacterUserRel/${action.userId}/${action.charId}`] = null;


        console.log("remove the information in these places ", updates);
        // update(worldRef, updates);




      }).catch((error) => {
        console.error(error);
      });

    }
    else if (type === "removeWorld") {
      console.log("remove a world as an owner");
      console.log("action ", action);
      get(child(worldRef, `Worlds/${action.worldId}/Members`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          for (const [key, value] of Object.entries(snapshot.val())) {
            console.log(key, value);
            // remove this world from the members characters participating
            updates[`Character/${key}/Participating`] = null;
            // remove this world from the members joined world section
            updates[`WorldUserRel/${value.CreatorId}/Joined/${action.worldId}`] = null;
          }
          // remove this world from the current user's created worlds
          updates[`World/${action.userId}/Created/${action.worldId}`] = null;
          // remove this world from the worlds section
          updates[`World/${action.worldId}`] = null;

        } else {
          console.log("No data available");
        }
        console.log("remove the information in these places ", updates);
        // update(worldRef, updates);
      }).catch((error) => {
        console.error(error);
      });

    }
    else if (type === "leaveWorld") {
      console.log("leave a world as a member");
      console.log("action", action);
      get(child(worldRef, `Worlds/${action.worldId}/Members`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          for (const [key, value] of Object.entries(snapshot.val())) {
            console.log(key, value);
            if (value.CreatorId==action.userId){
              console.log("this member is leaving", value.Name);
              // set the character participating to null
              updates[`Character/${key}/Participating`] = null;
              // remove the link world from the owners joined field
              updates[`WorldUserRel/${value.CreatorId}/Joined/${action.worldId}`] = null;
              // remove them from the world members list
              updates[`World/${action.worldId}/Members/${key}`] = null;
            }
          }

        } else {
          console.log("No data available");
        }
        console.log("remove the information in these places ", updates);
        // update(worldRef, updates);




      }).catch((error) => {
        console.error(error);
      });

    }
    else if (type === "removeMember"){
        // console.log("worldId ", worldId);
        // console.log("charId ", charId);
        const updates = {};
        // use the path to the specific property that this form field maps to in the database
        // and set it to the value in the form
        // console.log("this is the id right? ", worldId);
        // remove the character from the world members list
        updates[`Worlds/${action.worldId}/Members/${action.charId}`] = null;
        // remove the participation role from this character
        updates[`Characters/${action.charId}/Participation`] = null;
        // remove the world from the user assosciation
        // this might fix it
        updates[`WorldUserRel/${action.creatorId}/${action.charId}`] = null;

        // }
        console.log("remove in db at these places ", updates);
        // update(worldRef, updates);
        // 

    }



    handleClose();
  }

  // returns a div with the button that triggers the modal as well as the modal content
  return (
    <>
      {/* the button that triggers the modal */}
      <Button id={"ModalButton" + name} variant="primary" onClick={handleShow}>
        {name}
      </Button>
      {/* the modal with the information */}
      <Modal id={"Modal" + name} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* modal title */}
          <Modal.Title>Confirm (action)</Modal.Title>
        </Modal.Header>
        {/* modal body */}
        <Modal.Body>
          <p>(Message asking if the user is sure of their choice)</p>
        </Modal.Body>
        {/* modal footer with the closing buttons */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={removal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationPopup;