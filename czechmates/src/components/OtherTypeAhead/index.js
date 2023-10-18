// https://codesandbox.io/s/rbt-validation-feedback-example-4w01px4z6x?file=/src/index.js:41-939

import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import "react-bootstrap-typeahead/css/Typeahead.css";

const options = ["Friend1", "Friend2", "Friend3"];

const OtherTypeAhead = () => {
  return (
    <>
      <Form.Group>
        <Typeahead
          className="is-valid"
          id="valid-styles-example"
          // isValid
          options={options}
        />
        <Form.Control.Feedback type="valid">Feedback</Form.Control.Feedback>
      </Form.Group>
      {/* <Form.Group>
        <Typeahead
          className="is-invalid"
          id="invalid-styles-example"
          // isInvalid
          options={options}
        />
        <Form.Control.Feedback type="invalid">Feedback</Form.Control.Feedback>
      </Form.Group> */}
    </>
  );
}

export default OtherTypeAhead;