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
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

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
  const [isGenerating, setIsGenerating] = useState(false);

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
    console.log("Saving happening")
    setIsGenerating(true)
    downloadPdf().then(
      handleClose()
    )
    console.log("happened")
    setIsGenerating(false)
  }

  const options = {
    filename: props.name+'.pdf',
    method: "download",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "portrait"
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      //y
      mimeType: "image/jpeg",
      qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    // overrides: {
    //   // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    //   pdf: {
    //     compress: true
    //   },
    //   // see https://html2canvas.hertzen.com/configuration for more options
    //   canvas: {
    //     useCORS: true
    //   }
    // }
  };

  const getTargetElement = () => document.getElementById("container");

  const downloadPdf = () => generatePDF(getTargetElement, options);

  return (
    <>
      {/* the button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        Print
      </Button>

      {/* the modal */}
      <Modal show={show} size='xl' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button disabled={isGenerating} variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button disabled={isGenerating} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <div id="container">
        <SheetPage sheetInfo={charInfo} charId={charId}/>
        </div>
          <Button disabled={isGenerating} variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button disabled={isGenerating} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintPopup;