// https://react-bootstrap.netlify.app/docs/components/dropdowns/
// https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

// a dropdown that updates the text of the dropdown button with the selected option
function DropDownShowsValue({actions, text}) {

  // sets the default value of the dropdown button
  const [value, setValue] = useState(text);
  // changes the button to match the selection
  const handleSelect = (e) => {
    setValue(e)
  }

  // returns a div with the button and it's options according to the actions that are passed in
  return (
    <div>
      {/* adds the title and the onSelect function */}
      <DropdownButton title= {value} onSelect={handleSelect}>
      {/* maps each of the options passed in to a dropdown option with the appropriate keys */}
      {actions?.map((name) => (
              <Dropdown.Item key={name} eventKey={name}>{name}
              </Dropdown.Item>
          ))}
      </DropdownButton>
    </div>
  );
}

export default DropDownShowsValue;

