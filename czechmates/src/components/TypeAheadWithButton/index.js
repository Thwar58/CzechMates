// https://ericgio.github.io/react-bootstrap-typeahead/

import { useState } from 'react';
// import {Form} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const TypeAheadWithButton = () => {
  const [singleSelections, setSingleSelections] = useState([]);
  // const [multiSelections, setMultiSelections] = useState([]);
  const options = ["Friend1", "Friend2", "Friend3"];

  return (
    <>

      <InputGroup className="mb-3">
        {/* <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        /> */}
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          onChange={setSingleSelections}
          options={options}
          placeholder="Choose a friend..."
          selected={singleSelections}
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>
    </>
  );
}

export default TypeAheadWithButton;