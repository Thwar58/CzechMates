// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { db } from '../firebase';
import { child, get, ref, set, push, onValue } from "firebase/database";
import SheetPage from '../pages/sheetPage';

// a component for viewing world information (not editable by the user)
// input: the name of the world and the members
function PrintPopup(props) {
  // set the default state of the modal to hidden
  const [show, setShow] = useState(false);

  // functions to handle opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [charInfo, setCharInfo] = useState("");
  var [charId] = useState(props.charId);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(props.userId);

  useEffect(() => {
    if (charInfo !== undefined){
        console.log("check char info ", charInfo);
        var copy = charInfo;
        console.log("check copy ", copy);
    }
  
}, [charInfo]);

useEffect(() => {
  if (charId !== undefined){
      console.log("check char id in sub", charId);
       // use this path and onValue monitors for changes
  const charRef = ref(db, 'Characters/' + charId);
  onValue(charRef, (snapshot) => {
      setCharInfo(snapshot.val());
  });

  }
 

}, [userId, charId]);

  const handlePrint = ()=>{
    console.log("Printing happening")
    handleClose()
  }

  return (
    <>
      {/* the button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        Print
      </Button>

      {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <SheetPage sheetInfo={charInfo} charId={charId}/>
          <Button variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintPopup;