// https://ericgio.github.io/react-bootstrap-typeahead/

import { useState } from 'react';
// import {Form} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';

const TypeAhead = () => {
    const [singleSelections, setSingleSelections] = useState([]);
    // const [multiSelections, setMultiSelections] = useState([]);
    const options = ["Friend1", "Friend2", "Friend3"];

    return (
      <>
        <Form.Group>
          <Form.Label>Search here</Form.Label>
          <Typeahead
            id="basic-typeahead-single"
            labelKey="name"
            onChange={setSingleSelections}
            options={options}
            placeholder="Choose a friend..."
            selected={singleSelections}
          />
        </Form.Group>
      </>
    );
  }

  export default TypeAhead;