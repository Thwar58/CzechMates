import React from "react";

// a component used in the user portion of the profile page
// future: subject to revamp with reusable components
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