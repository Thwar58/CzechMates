// https://react-bootstrap.netlify.app/docs/components/modal/
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ref, onValue } from "firebase/database";
import { db } from '../../firebase';
import SheetPage from '../../pages/sheetPage';
import { useEffect } from 'react';

/**
 * Purpose: pops up the character sheet for members in a world
 * Params: 
 * setAlign: function, sets the alignment of the popup (left, right, center)
 * charId: the character id for this member
 * userId: the current user's id
 * userTheme: the user's color theme
 */
function ViewCharaPopup({ setAlign, charId, userId, userTheme }) {
  // useStates to hide and show the popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // useState to track the character information
  var [charInfo, setCharInfo] = useState("");

  /**
   * Purpose: gets the character information for the member being displayed
   * Params/Dependencies: 
   * userId
   * charId
   */
  useEffect(() => {
    if (charId !== undefined) {
      const charRef = ref(db, 'Characters/' + charId);
      onValue(charRef, (snapshot) => {
        setCharInfo(snapshot.val());
      });
    }

  }, [userId, charId]);

  /**
   * Purpose: realigns the manage or view world popup to the center when the view member is closed
   * Params/Dependencies: 
   * setAlign
   */
  function closeAndAlign() {
    handleClose();
    setAlign("mwPopupCenter");
  }

  /**
   * Purpose: aligns the manage or view world popup to the left when the view member is opened
   * Params/Dependencies: 
   * setAlign
   */
  function openAndAlign() {
    handleShow();
    setAlign("mwPopupLeft");
  }


  /**
   * Purpose: renders the view member popup
   * Params/Dependencies: 
   * userTheme
   * charId
   * userId
   */
  return (
    <>
      {/* the button that triggers the popup */}
      <Button className={"btn_" + userTheme} id={"ModalButton" + "name"} onClick={openAndAlign}>
        {"View"}
      </Button>
      {/* the popup with the information, styled to align to the right side */}
      <Modal dialogClassName={"mwPopupRight modal-90w "} id={"Modal" + "name"} show={show} onHide={closeAndAlign}>
        <Modal.Header className={"body_" + userTheme} closeButton>
          {/* popup title */}
          <Modal.Title>{charInfo.General.Name}</Modal.Title>
        </Modal.Header>
        {/* popup body, it contains a full sheet for the member's character */}
        <Modal.Body className={"body_" + userTheme}>
          <SheetPage className={"body_" + userTheme} sheetInfo={charInfo} charId={charId} userId={userId} />
        </Modal.Body>
        {/* popup footer with the closing buttons */}
        <Modal.Footer className={"body_" + userTheme}>
          <Button className={"btn_" + userTheme} onClick={closeAndAlign}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewCharaPopup;