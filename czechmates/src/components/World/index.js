import React from "react";

const World = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                World Name
                {/* check if they own the world
                if they do then add a star
                set the button names accordingly */}
                <button type="button" class="btn btn-primary">Manage/View</button>
                <button type="button" class="btn btn-primary">Remove/Leave</button>
            </div>

        </div>
    );
};

export default World;