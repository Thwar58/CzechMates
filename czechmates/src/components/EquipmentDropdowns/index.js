// https://react-bootstrap.netlify.app/docs/components/dropdowns/
// https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, update } from "firebase/database";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

/**
  * Purpose: a dropdown component used in the equipment page for weapons, armor, and shields
  * Params:
  * charId: string, the character id
  * options: JSON object, the list of options for this dropdown
  * text: string, the initial value for the dropdonw (whatever the character has equipped when the page loads)
  * type: string, the type of dropdown (weapon, armor, shield)
  * userTheme: the user's color theme
  */
function EquipmentDropdown({ charId, options, text, type, userTheme }) {

  // sets the default value of the dropdown button and the options
  const [value, setValue] = useState(text);
  const [ddOptions, setDdOptions] = useState();

  // database reference
  const charRef = ref(db);

  // changes the button to match the selection
  const handleSelect = (e) => {
    setValue(e)
  }

  /**
  * Purpose: updates the options in the dropdown when the options or userTheme changes
  * Params/Dependencies:
  * options
  * userTheme
  */
  useEffect(() => {
    var arr = [];
    // loop through the character information and make dropdown items for them
    if (ddOptions !== null) {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
      for (const [key, value] of Object.entries(options)) {
        arr.push(<Dropdown.Item className={"btn_" + userTheme} key={key} eventKey={key}>{value}</Dropdown.Item>);
      }
      setDdOptions(arr);
    }

  }, [options, userTheme]);


/**
* Purpose: updates the database for what weapon the character has equipped when value changes
* Params/Dependencies:
* value
*/
  useEffect(() => {
    if (value !== null) {
      const updates = {};
      //  update the datase in the correct place for each type
      if (type == "Weapon") {
        updates[`Characters/${charId}/Equipment/Weapon_Equipped`] = value;
      }
      else if (type == "Shield") {
        updates[`Characters/${charId}/Equipment/Shield_Equipped`] = value;
      }
      else if (type == "Armor") {
        updates[`Characters/${charId}/Equipment/Armor_Equipped`] = value;
      }
      update(charRef, updates);

    }

  }, [value]);


/**
 * Purpose: renders the dropdown
 * Params/Dependencies:
 * userTheme
 * value
 * ddOptions
 */
  return (
    <div>
      {/* adds the title and the onSelect function */}
      <Dropdown onSelect={handleSelect} as={ButtonGroup}>
        <Dropdown.Toggle className={"btn_" + userTheme} id="dropdown-custom-1">{value}</Dropdown.Toggle>
        <Dropdown.Menu className={"btn_" + userTheme}>
          {/* the dropdown options */}
          {ddOptions}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default EquipmentDropdown;

