import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";

const User = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                <p>Label<input type="text" placeholder="some information" />
            <button type="button" className="btn btn-primary">Edit</button>
            </p>
            </div>

        </div>
    );
};

export default User;