// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, child, update, get, onValue } from "firebase/database";
import { db } from '../../firebase';
import SheetPage from '../../pages/sheetPage';
import { useEffect } from 'react';

// a component for the confirmation modal
function ViewCharaPopup({setAlign, charId, userId, userTheme}) {
  // get char info in here with db query similar to sub pages for sheet
  console.log("set align in viewchara", setAlign);
  // sets the default state of the modal
  const [show, setShow] = useState(false);

  // handles opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [charInfo, setCharInfo] = useState("");

  useEffect(() => {
    if (charId !== undefined){
        // console.log("check char id in sub", charId);
         // use this path and onValue monitors for changes
    const charRef = ref(db, 'Characters/' + charId);
    onValue(charRef, (snapshot) => {
        setCharInfo(snapshot.val());
    });

    }
   

}, [userId, charId]);

  function closeAndAlign(){
    handleClose();
    setAlign("mwPopupCenter");
  }

  function openAndAlign(){
    handleShow();
    setAlign("mwPopupLeft");
  }


  // returns a div with the button that triggers the modal as well as the modal content
  return (
    <>
      {/* the button that triggers the modal */}
      <Button className={"btn_"+userTheme} id={"ModalButton" + "name"} onClick={openAndAlign}>
        {"View"}
      </Button>
      {/* the modal with the information */}
      <Modal dialogClassName={"mwPopupRight modal-90w "} id={"Modal" + "name"} show={show} onHide={closeAndAlign}>
        <Modal.Header className={"body_"+userTheme} closeButton>
          {/* modal title */}
          <Modal.Title>Confirm (action)</Modal.Title>
        </Modal.Header>
        {/* modal body */}
        <Modal.Body className={"body_"+userTheme}>
        <SheetPage className={"body_"+userTheme} sheetInfo={charInfo} charId={charId} userId={userId} />
        </Modal.Body>
        {/* modal footer with the closing buttons */}
        <Modal.Footer className={"body_"+userTheme}>
          <Button className={"btn_"+userTheme} onClick={closeAndAlign}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewCharaPopup;