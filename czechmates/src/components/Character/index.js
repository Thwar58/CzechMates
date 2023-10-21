import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import {useNavigate } from 'react-router-dom';

const Character = () => {

    const navigate = useNavigate();

    const navigateToGeneral = () => {
        // 👇️ navigate to /contacts
        navigate('/subCharacterPages');
    }

    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                Character Name
                <button type="button" className="btn btn-primary">Copy</button>
                <button onClick={navigateToGeneral} type="button" className="btn btn-primary">Edit</button>
                <ConfirmationPopup name="Remove"/>
                <button type="button" className="btn btn-primary">Print</button>
            </div>

        </div>
    );
};

export default Character;