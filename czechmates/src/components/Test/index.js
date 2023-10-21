// https://react-bootstrap.netlify.app/docs/components/dropdowns/
// https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

// we should edit this later so that the selection is indicated in the new text
function Test({actions }) {

  const [value, setValue] = useState('select here');
  const handleSelect = (e) => {
    setValue(e)
  }

  return (
    <div>
      <DropdownButton title= {value} onSelect={handleSelect}>
      {actions?.map((name) => (
              <Dropdown.Item key={name} eventKey={name}>{name}
              </Dropdown.Item>
          ))}
      </DropdownButton>
    </div>
  );
}

export default Test;

