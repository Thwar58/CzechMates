import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";

// a component used for the social portion of the profile page
// future: subject to revamp later to use reuable elements
const Social = () => {
    return (
            <div style={{ backgroundColor: "lightblue" }}>
                <p>Label<input type="text" placeholder="some information" />
                    <ConfirmationPopup name={"Remove"} />
                </p>
            </div>
    );
};

export default Social;