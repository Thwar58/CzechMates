import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";

const World = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                World Name
                {/* check if they own the world
                if they do then add a star
                set the button names accordingly */}
                <button type="button" className="btn btn-primary">Manage/View</button>
                <ConfirmationPopup name={"Remove/Leave"}/>
            </div>

        </div>
    );
};

export default World;