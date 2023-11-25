// https://react-bootstrap.netlify.app/docs/components/dropdowns/
// https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

// a dropdown that updates the text of the dropdown button with the selected option
function EquipmentDropdown({charId, options, text, type }) {

  // sets the default value of the dropdown button
  const [value, setValue] = useState(text);
  const [ddOptions, setDdOptions] = useState();
  const charRef = ref(db);

  // changes the button to match the selection
  const handleSelect = (e) => {
    setValue(e)
    
  }

  useEffect(() => {
    // loop through the characters information and make components for them
    var arr = [];
    if (ddOptions !== null) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(options)) {
            arr.push(<Dropdown.Item key={key} eventKey={key}>{value}</Dropdown.Item>);
        }
        // console.log(arr);
        setDdOptions(arr);
    }

}, [options]);

useEffect(() => {
  // loop through the characters information and make components for them
  if (value !== null) {
    const updates = {};

    if (type == "Weapon"){
      updates[`Characters/${charId}/Equipment/Weapon_Equipped`] = value;
    }
    else if (type == "Shield"){
      updates[`Characters/${charId}/Equipment/Shield_Equipped`] = value;
    }
    else if (type == "Armor"){
      updates[`Characters/${charId}/Equipment/Armor_Equipped`] = value;
    }
    update(charRef, updates);
   
  }

}, [value]);
  


  


  // returns a div with the button and it's options according to the actions that are passed in
  return (
    <div>
      {/* adds the title and the onSelect function */}
      <DropdownButton className="dropdown" title={value} onSelect={handleSelect}>
        {/* maps each of the options passed in to a dropdown option with the appropriate keys */}
       {ddOptions}
      </DropdownButton>
    </div>
  );
}

export default EquipmentDropdown;

