
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';


function LightModeButton({userId, userTheme, setUserTheme}) {

  //runs before the button is rendered in
  useEffect(()=>{
     //if its dark mode
    if(userTheme === 'dark'){
      //we get every rendered component that has the btn class
      let btnElements = document.querySelectorAll('.btn');
      //then for each of the btn class components remove the light attribute and add the dark attribute
      btnElements.forEach(function(btn) {
        btn.classList.remove('light');
        btn.classList.add('dark');
    });
    //otherwise remove the dark attribute of each button component and add the light
    }else{
      let btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function(btn) {
        btn.classList.remove('dark');
        btn.classList.add('light');
    });
  }
  },[userTheme]);

    return (
      <Button 
      //when clicked the button checks the current user's theme and changes it
      onClick={()=>{
        if(userTheme === 'dark'){
          //if its dark, set it to light and remove the dark css theme from all btn components then add light to them all
          setUserTheme('light')
          let btnElements = document.querySelectorAll('.btn');
          btnElements.forEach(function(btn) {
            btn.classList.remove('dark');
            btn.classList.add('light');
        });
        }else{
          //if its light then do the opposite and set it all to dark
          setUserTheme('dark')
          let btnElements = document.querySelectorAll('.btn');
          btnElements.forEach(function(btn) {
            btn.classList.remove('light');
            btn.classList.add('dark');
        });
        }
    }}>
        Light Mode
      </Button>
    );
  }
  
  export default LightModeButton;