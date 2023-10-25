import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";


const User = () => {
    return (
        <div>
            <div style={{ backgroundColor: "lightblue" }}>
                <p>Label<input type="text" placeholder="some information" />
                    <ConfirmationPopup name={"Remove"} />
                </p>
            </div>

        </div>
    );
};

export default User;