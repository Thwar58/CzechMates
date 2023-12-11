// https://react-bootstrap.netlify.app/docs/components/dropdowns/
// https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

/**
  * Purpose: this is a dropdown component used for sorting and equipment
  * Params:
  * worlds: array, an array of world components
  * setWorldDisplay: function, sets the world display array on the world page
  * chars: array, an array of character components
  * setChars: function, sets the characters array in the character page
  * type: string, designates what actions to take
  * actions: the options in the dropdown
  * text: the initial text of the dropdown
  * userTheme: the user's color theme
  */
function DropDownShowsValue({ worlds, setWorldDisplay, chars, setChars, type, actions, text, userTheme }) {
  // useState for the current selection in the dropdown
  const [value, setValue] = useState(text);
  // aids the setValue function when a selection is chosen from the dropdown
  const handleSelect = (e) => {
    setValue(e)
  }

  /**
  * Purpose: sets the color for the dropdown and it's options
  * Params/Dependencies:
  * userTheme
  */
  useEffect(() => {
    // sets the elements to dark mode
    if (userTheme === 'dark') {
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function (btn) {
        // Add a new class "newClass" to each button element
        btn.classList.remove('light');
        btn.classList.add('dark');
      });
      // sets the elements to light mode
    } else {
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function (btn) {
        // Add a new class "newClass" to each button element
        btn.classList.remove('dark');
        btn.classList.add('light');
      });
    }
  }, [userTheme]);

  /**
   * Purpose: sorts the characters alphabetically
   * Params/Dependencies: none
   */
  function alphaCharaSort() {
    var newOrder = [...chars];
    setChars(newOrder.sort((a, b) => a.props.charName.localeCompare(b.props.charName)));
  }

  /**
  * Purpose: sorts the characters by last used
  * Params/Dependencies: none
  */
  function lastUsedCharaSort() {
    var newOrder = [...chars];
    setChars(newOrder.sort((a, b) => b.props.lastUsed - a.props.lastUsed));
  }

  /**
  * Purpose: sorts the worlds alphabetically
  * Params/Dependencies: none
  */
  function alphaWorldSort() {
    var newOrder = [...worlds];
    setWorldDisplay(newOrder.sort((a, b) => a.props.worldName.localeCompare(b.props.worldName)));
  }

  /**
  * Purpose: sorts the worlds by worlds the user owns
  * Params/Dependencies: none
  */
  function ownWorldSort() {
    var newOrder = [...worlds];
    for (let i = 0; i < newOrder.length; i++) {
      // filters out the worlds that don't belong to the user
      if (newOrder[i].props.type == "joined") {
        newOrder.splice(i, 1);
        i--;
      }
    }
    setWorldDisplay(newOrder);
  }

  /**
  * Purpose: sorts the worlds by worlds the  user does not own
  * Params/Dependencies: none
  */
  function joinWorldSort() {
    var newOrder = [...worlds];
    for (let i = 0; i < newOrder.length; i++) {
      // filter out the worlds that belong to the user
      if (newOrder[i].props.type == "created") {
        newOrder.splice(i, 1);
        i--;
      }
    }
    setWorldDisplay(newOrder);
  }

  /**
  * Purpose: sorts the characters by level
  * Params/Dependencies: none
  */
  function levelSort() {
    var newOrder = [...chars];
    setChars(newOrder.sort((a, b) => b.props.lvl - a.props.lvl));

  }

  /**
  * Purpose: applies the appropriate sorting function when a selection is made
  * Params/Dependencies:
  * value
  */
  useEffect(() => {
    if (type === "character") {
      if (value == "alphabetically") {
        alphaCharaSort();
      }
      else if (value == "level") {
        levelSort();
      }
      else if (value == "recently used") {
        lastUsedCharaSort();
      }
    }
    else if (type === "world") {
      if (value == "Alphabetically") {
        alphaWorldSort();
      }
      else if (value == "Owned") {
        ownWorldSort();
      }
      else if (value == "Participating") {
        joinWorldSort();
      }
    }

  }, [value]);



  /**
   * Purpose: renders the dropdown 
   * Params/Dependencies:
   * userTheme
   * value
   * name
   * actions
   */
  return (
    <div>
      {/* adds the title and the onSelect function */}
      <Dropdown onSelect={handleSelect} as={ButtonGroup}>
        <Dropdown.Toggle className={"btn_" + userTheme} id="dropdown-custom-1">{value}</Dropdown.Toggle>
        <Dropdown.Menu className={"btn_" + userTheme}>
          {/* maps each of the options passed in to a dropdown option with the appropriate keys */}
          {actions?.map((name) => (
            <Dropdown.Item className={"btn_" + userTheme} key={name} eventKey={name}>{name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownShowsValue;

