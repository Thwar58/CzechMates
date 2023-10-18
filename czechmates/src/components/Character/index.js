import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";

const Character = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                Character Name
                <button type="button" className="btn btn-primary">Copy</button>
                <button type="button" className="btn btn-primary">Edit</button>
                <ConfirmationPopup name="Remove"/>
                <button type="button" className="btn btn-primary">Print</button>
            </div>

        </div>
    );
};

export default Character;