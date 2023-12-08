import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AddWorldPopup from './components/AddWorldPopup';
import AttributesComp from './components/AttributesComp';
import Character from './components/Character';
import ConfirmationPopup from './components/ConfirmationPopup';
import DropDownShowsValue from './components/DropDownShowsValue';
import EquipmentDropdown from './components/EquipmentDropdowns';
import InputWithLabel from './components/InputWithLabel';
import JoinCodePopup from './components/JoinCodePopup';
import { Router } from 'react-router-dom';

//renders components from the components folder
it('Render Components', () => {
  //creates a div that we can put the rendered components into
  const div = document.createElement('div');

  //renders the AddWorldPopup
  ReactDOM.render(<AddWorldPopup userTheme='light' userId='User1' title="World Name" button="Add World" />, div);
  
  //renders the AttributesComp
  ReactDOM.render(<AttributesComp />, div);

  //renders the Character
  // ReactDOM.render(<Character  charName="char1" charId="character1" userId="User1" userTheme="light"  />, div); 

  //renders the ConfirmationPopup
  ReactDOM.render(<ConfirmationPopup />, div);

  //renders the DropDownShowsValue
  ReactDOM.render(<DropDownShowsValue />, div);

  //renders the EquipmentDropdown
  ReactDOM.render(<EquipmentDropdown userTheme={'dark'} type={"Weapon"} userId={'User1'} charId={'charId'} options={["option 1","option 2","option 3"]} text={["option 1","option 2","option 3"]}/>, div);

  //renders the InputWithLabel
  ReactDOM.render(<InputWithLabel />, div);
  
});

