import React from "react";

const User = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                <p>Label<input type="text" placeholder="some information" />
            <button type="button" className="btn btn-primary">Edit/delete</button>
            </p>
            </div>

        </div>
    );
};

export default User;