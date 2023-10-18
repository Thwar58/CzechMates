import React from "react";

const Character = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                Character Name
                <button type="button" className="btn btn-primary">Copy</button>
                <button type="button" className="btn btn-primary">Edit</button>
                <button type="button" className="btn btn-primary">Remove</button>
                <button type="button" className="btn btn-primary">Print</button>
            </div>

        </div>
    );
};

export default Character;