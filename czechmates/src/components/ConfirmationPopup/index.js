// https://react-bootstrap.netlify.app/docs/components/modal/
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ref, child, update, get } from "firebase/database";
import { db } from '../../firebase';

/**
 * Purpose: This component displays a confirmation popup when a user tries to make a decision that is 
 * not easily reversible
 * Params:
 * title: string, the title of the popup
 * content: string, the body of the popup
 * name: string, the text for the trigger button
 * type: string, indicates what action is being performed
 * action: object, carries useful information for whatever action is being performed
 * userTheme: the user's color theme
 */
function ConfirmationPopup({ title, content, name, type, action, userTheme }) {
  // useStates for opening and closing the popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // the database reference
  const worldRef = ref(db);


  /**
   * Purpose: this function handles the action to be taken if the user confirms their choice
   * Params/Dependencies:
   * action
   * type
   */
  function removal() {
    const updates = {};
    // if the user is removing a character
    if (type === "removeChara") {
      // get the participation of the character to see if a world needs to be updated when they are removed
      get(child(worldRef, `Characters/${action.charId}/Participation`)).then((snapshot) => {
        // if they are in a world, then remove them from the world
        if (snapshot.exists()) {
          // remove the character from the world they are in
          updates[`Worlds/${snapshot.val()}/Members/${action.charId}`] = null;
          // remove the world from the user relationship in worlds they joined?
          updates[`WorldUserRel/${action.userId}/Joined/${snapshot.val()}`] = null;
          // remove the world from the user relationship in worlds they created?
          updates[`WorldUserRel/${action.userId}/Created/${snapshot.val()}`] = null;
        }
        // remove the character from the characters list
        updates[`Characters/${action.charId}`] = null;
        // remove the character from the user character relationship
        updates[`CharacterUserRel/${action.userId}/${action.charId}`] = null;
        update(worldRef, updates);
      }).catch((error) => {
        console.error(error);
      });

    }
    // if the user is removing a world
    else if (type === "removeWorld") {
      // get the world members in order to update them accordingly
      get(child(worldRef, `Worlds/${action.worldId}/Members`)).then((snapshot) => {
        if (snapshot.exists()) {
          // go through each of the members and reset any information connecting the character
          // or user to this world
          for (const [key, value] of Object.entries(snapshot.val())) {
            updates[`Characters/${key}/Participation`] = null;
            updates[`WorldUserRel/${value.CreatorId}/Joined/${action.worldId}`] = null;
            updates[`CharacterUserRel/${value.CreatorId}/${key}/Participation`] = null;
          }

        }
        // remove this world from the current user's created worlds
        updates[`WorldUserRel/${action.userId}/Created/${action.worldId}`] = null;
        // remove this world from the worlds section
        updates[`Worlds/${action.worldId}`] = null;
        update(worldRef, updates);

      }).catch((error) => {
        console.error(error);
      });

    }
    // if the user is leaving a world
    else if (type === "leaveWorld") {
      // get the members of this world if they exist (they should)
      get(child(worldRef, `Worlds/${action.worldId}/Members`)).then((snapshot) => {
        if (snapshot.exists()) {
          // loop through the members until you get the member that matches the current user
          for (const [key, value] of Object.entries(snapshot.val())) {
            if (value.CreatorId == action.userId) {
              // set the character participating to null in both places
              updates[`Characters/${key}/Participation`] = null;
              updates[`CharacterUserRel/${action.userId}/${key}/Participation`] = null;
              // remove the link world from the owners joined field
              updates[`WorldUserRel/${value.CreatorId}/Joined/${action.worldId}`] = null;
              // remove them from the world members list
              updates[`Worlds/${action.worldId}/Members/${key}`] = null;
            }
          }

        }
        update(worldRef, updates);

      }).catch((error) => {
        console.error(error);
      });

    }
    // if the user is removing a member from a world
    else if (type === "removeMember") {
      const updates = {};
      // remove the character from the world members list
      updates[`Worlds/${action.worldId}/Members/${action.charId}`] = null;
      // remove the participation role from this character in both places
      updates[`Characters/${action.charId}/Participation`] = null;
      updates[`CharacterUserRel/${action.creatorId}/${action.charId}/Participation`] = null;
      // remove the world from the user assosciation
      updates[`WorldUserRel/${action.creatorId}/Joined/${action.worldId}`] = null;

      update(worldRef, updates);

    }
    //  if the user is removing a follower
    else if (type === "Following") {
      // edit the following and follower information for the two users involved
      const userRef = ref(db);
      const updates = {};
      updates[`Users/${action.userId}/Following/${action.socialId}`] = null;
      updates[`Users/${action.userId}/Followers/${action.socialId}`] = null;
      updates[`Users/${action.socialId}/Following/${action.userId}`] = null;
      update(userRef, updates);

    }
    // if the usre is unfriending someone
    else if (type === "Friend") {
      // put the users in the correct following/followers section
      // remove the user's from each others friends list
      const userRef = ref(db);
      const updates = {};
      updates[`Users/${action.userId}/Followers/${action.socialId}`] = action.content;
      updates[`Users/${action.socialId}/Following/${action.userId}`] = action.userName;
      updates[`Users/${action.userId}/Friends/${action.socialId}`] = null;
      updates[`Users/${action.socialId}/Friends/${action.userId}`] = null;
      update(userRef, updates);

      // now we need to edit their world relationships and character participation
      var thisUsersWorldRels;
      var otherUsersWorldRels;
      // get the world user relation for both users so we can use them to cross reference to find the worlds
      // they are both related to
      get(child(worldRef, `WorldUserRel/${action.userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          thisUsersWorldRels = snapshot.val();
          get(child(worldRef, `WorldUserRel/${action.socialId}`)).then((snapshot) => {
            if (snapshot.exists()) {
              otherUsersWorldRels = snapshot.val();

              // go through the results of both above queries to find the worlds to update
              var sharedWorlds = [];
              const updates = {};
              // check that the users have joined and created worlds, we don't need to do anything if they don't
              if (thisUsersWorldRels.Joined !== undefined && otherUsersWorldRels.Created !== undefined) {
                // for each world the current user has joined, if the other user is the creator then mark the
                // joined relationship to be deleted and record the world id for later
                for (const [key, value] of Object.entries(thisUsersWorldRels.Joined)) {
                  if (otherUsersWorldRels.Created[key] !== undefined) {
                    sharedWorlds.push(key);
                    updates[`WorldUserRel/${action.userId}/Joined/${key}`] = null;
                  }
                }
              }
              // check again that the two results exist
              if (thisUsersWorldRels.Created !== undefined && otherUsersWorldRels.Joined !== undefined) {
                // for each world the current user has created, if the other user has joined it then mark the
                // joined relationship to be deleted and record the world id for later
                for (const [key, value] of Object.entries(thisUsersWorldRels.Created)) {
                  if (otherUsersWorldRels.Joined[key] !== undefined) {
                    sharedWorlds.push(key);
                    updates[`WorldUserRel/${action.socialId}/Joined/${key}`] = null;
                  }
                }
              }
              // go through each of the world id's we marked earlier and update the correct member info
              for (let index = 0; index < sharedWorlds.length; index++) {
                const worldId = sharedWorlds[index];
                // get the members for the world and check each member
                get(child(worldRef, `Worlds/${worldId}/Members`)).then((snapshot) => {
                  for (const [key, value] of Object.entries(snapshot.val())) {
                    // if the member is affiliated with the current user, then we need to remove 
                    // the user from the world and update the character's participation
                    if (value.CreatorId === action.userId){
                      updates[`Worlds/${worldId}/Members/${key}`] = null;
                      updates[`Characters/${key}/Participation`] = null;
                      updates[`CharacterUserRel/${action.userId}/${key}/Participation`] = null;
                    }
                    // if the member is affiliated with the other user, then we need to remove 
                    // the user from the world and update the character's participation
                    else if (value.CreatorId === action.socialId){
                      updates[`Worlds/${worldId}/Members/${key}`] = null;
                      updates[`Characters/${key}/Participation`] = null;
                      updates[`CharacterUserRel/${action.socialId}/${key}/Participation`] = null;
                    }
                  }
                  update(userRef, updates);
                }).catch((error) => {
                  console.error(error);
                });

              }
            }
          }).catch((error) => {
            console.error(error);
          });
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    // close the confirmation popup since the action is done
    handleClose();
  }

  /**
  * Purpose: renders the confirmation popup
  * Params/Dependencies:
  * name
  * userTheme
  * title
  * content
  */
  return (
    <div className={"btn_" + userTheme}>
      {/* the button that triggers the modal */}
      <Button className={"btn_" + userTheme} id={"ModalButton" + name} onClick={handleShow}>
        {name}
      </Button>
      {/* the modal with the information */}
      <Modal id={"Modal" + name} show={show} onHide={handleClose}>
        <Modal.Header className={"body_" + userTheme} closeButton>
          {/* modal title */}
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {/* modal body */}
        <Modal.Body className={"body_" + userTheme}>
          {content}
        </Modal.Body>
        {/* modal footer with the closing buttons */}
        <Modal.Footer className={"body_" + userTheme}>
          <Button className={"btn_" + userTheme} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={"btn_" + userTheme} variant="primary" onClick={removal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConfirmationPopup;