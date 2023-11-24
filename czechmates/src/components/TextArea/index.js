// https://mdbootstrap.com/docs/b4/react/forms/textarea/

import React from "react";

const TextareaPage = ({title}) => {




  return (
    <div className="form-group">
      <label htmlFor="exampleFormControlTextarea1">{title}</label>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="5"
      />
    </div>
  );
};

export default TextareaPage;