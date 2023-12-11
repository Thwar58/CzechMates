import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import SheetPage from '../pages/sheetPage';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import "./themes.css"

// a component that makes a button that pops up the preview for printing a character sheet
function PrintPopup(props) {
  // set the default state of the modal to hidden
  const [show, setShow] = useState(false);

  // functions to handle opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //the character info being displayed but starts off empty see below for when its initia;ized in the useEffect
  var [charInfo, setCharInfo] = useState("");
  //characer's id is passed in from props
  var [charId] = useState(props.charId);
  //users's id is passed in from props
  const [userId, setUserId] = useState(props.userId);
  //this is used to stop the user from clicking the button too quickly
  const [isGenerating, setIsGenerating] = useState(false);

  //before the component renders, it fills in the character info if the is undefined
  useEffect(() => {
    if (charId !== undefined) {
      console.log("check char id in sub", charId);
      // use this path and onValue monitors for changes
      const charRef = ref(db, 'Characters/' + charId);
      onValue(charRef, (snapshot) => {
        setCharInfo(snapshot.val());
      });

    }
  }, [userId, charId]);

  //The method that handles downloading the component as a pdf
  const handlePrint = () => {
    //start off by setting the flag to true so then the close and print buttons cannot be clicked twice in a row
    setIsGenerating(true)
    //download the pdf before closing otherwise race condition may result in black pdf without info
    downloadPdf().then(
      handleClose()
    )
    //re enable the print and close button for the next time the pop up is opened
    setIsGenerating(false)
  }

  //options for downloading the pdf DONT TOUCH
  const options = {
    filename: props.name + '.pdf',
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

  //function that grabs the component with the id given
  const getTargetElement = () => document.getElementById("printable-container");

  //dowwnloads the pdf
  const downloadPdf = () => generatePDF(getTargetElement, options);

  return (
    <>
      {/* the button that triggers the modal */}
      <Button className={"btn_" + props.userTheme} onClick={handleShow}>
        Print
      </Button>

      {/* the modal */}
      <Modal show={show} size='xl' onHide={handleClose}>
        <Modal.Header className={"body_light"} closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"body_light"}>
          <Button className={"btn_light"} disabled={isGenerating} variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button className={"btn_light"} disabled={isGenerating} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* This div is the printed component so only the sheet page */}
          <div id="printable-container"> 
            <SheetPage userTheme={'light'} sheetInfo={charInfo} charId={charId} />
          </div>
          <Button className={"btn_light"} disabled={isGenerating} variant="primary" onClick={handlePrint}>
            Print
          </Button>
          <Button className={"btn_light"} disabled={isGenerating} variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PrintPopup;