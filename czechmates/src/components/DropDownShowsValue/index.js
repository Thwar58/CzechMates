// https://react-bootstrap.netlify.app/docs/components/dropdowns/
// https://www.pluralsight.com/guides/how-to-capture-the-value-of-dropdown-lists-with-react-bootstrap

import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { db } from '../../firebase';
import { ref, onValue } from "firebase/database";

// a dropdown that updates the text of the dropdown button with the selected option
function DropDownShowsValue({worlds, setWorldDisplay, chars, setChars, type, actions, text, userTheme }) {

  // sets the default value of the dropdown button
  const [value, setValue] = useState(text);
  // changes the button to match the selection
  const handleSelect = (e) => {
    setValue(e)
  }
 
  useEffect(()=>{
    if(userTheme === 'dark'){
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function(btn) {
        // Add a new class "newClass" to each button element
        btn.classList.remove('light');
        btn.classList.add('dark');
    });
      // updates[`Users/${userId}/Light_Mode`] = userTheme;
    }else{
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function(btn) {
        // Add a new class "newClass" to each button element
        btn.classList.remove('dark');
        btn.classList.add('light');
    });
  }
  },[userTheme]);

  function alphaCharaSort() {
    var newOrder = [...chars];
    setChars(newOrder.sort((a, b) => a.props.charName.localeCompare(b.props.charName)));
  }

  function lastUsedCharaSort() {
    var newOrder = [...chars];
    setChars(newOrder.sort((a, b) => b.props.lastUsed - a.props.lastUsed));
  }

  function alphaWorldSort() {
    var newOrder = [...worlds];
    setWorldDisplay(newOrder.sort((a, b) => a.props.worldName.localeCompare(b.props.worldName)));
  }

  function ownWorldSort() {
    var newOrder = [...worlds];
    console.log(newOrder);
    for (let i = 0; i < newOrder.length; i++) {
      console.log(i);
      if (newOrder[i].props.type == "joined"){
        console.log("not my world", newOrder[i]);
        newOrder.splice(i, 1);
        i--;
      }
    }
    console.log(newOrder);
    setWorldDisplay(newOrder);
  }

  function joinWorldSort() {
    var newOrder = [...worlds];
    console.log(newOrder);
    for (let i = 0; i < newOrder.length; i++) {
      console.log(i);
      if (newOrder[i].props.type == "created"){
        newOrder.splice(i, 1);
        i--;
      }
    }
    console.log(newOrder);
    setWorldDisplay(newOrder);
  }

  function levelSort(){
    var newOrder = [...chars];
    console.log(newOrder);
    setChars(newOrder.sort((a, b) => b.props.lvl - a.props.lvl ));
   
  }

  useEffect(() => {
    if (type === "character") {
      if (value == "alphabetically" ){
        alphaCharaSort();
      }
      else if (value == "level"){
        levelSort();
      }
      else if (value == "recently used"){
        lastUsedCharaSort();
      }
    }
    else if (type === "world") {
      if (value == "Alphabetically" ){
        alphaWorldSort();
      }
      else if (value == "Owned"){
        ownWorldSort();
      }
      else if (value == "Participating"){
        joinWorldSort();
      }
    }
    else if (type === "availableCharacters"){
      console.log("available characters");
      console.log(actions);
      // do something with it?
    }

  }, [value]);



  // returns a div with the button and it's options according to the actions that are passed in
  return (
    <div>
      {/* adds the title and the onSelect function */}
      <Dropdown onSelect={handleSelect} as={ButtonGroup}>
      <Dropdown.Toggle className={"btn_"+userTheme} id="dropdown-custom-1">{value}</Dropdown.Toggle>
      
      <Dropdown.Menu className={"btn_"+userTheme}>
      {/* <Dropdown title={value} onSelect={handleSelect}> */}
        {/* maps each of the options passed in to a dropdown option with the appropriate keys */}
        {actions?.map((name) => (
          <Dropdown.Item className={"btn_"+userTheme} key={name} eventKey={name}>{name}
          </Dropdown.Item>
        ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DropDownShowsValue;

