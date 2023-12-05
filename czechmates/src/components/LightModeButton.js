
import Button from 'react-bootstrap/Button';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';
import { useEffect } from 'react';


function LightModeButton({userId, userTheme, setUserTheme}) {
  
  // const userRef = ref(db);

    return (
      <Button 
      onClick={()=>{
        // if (mode) {
        //   document.body.classList.add('dark');
        // } else {
        //   document.body.classList.remove('dark');
        // }
        // const updates = {};
        if(userTheme === 'dark'){
          setUserTheme('light')
          var btnElements = document.querySelectorAll('.btn');
          btnElements.forEach(function(btn) {
            // Add a new class "newClass" to each button element
            btn.classList.remove('dark');
            btn.classList.add('light');
        });
          // updates[`Users/${userId}/Light_Mode`] = userTheme;
        }else{
          setUserTheme('dark')
          var btnElements = document.querySelectorAll('.btn');
          btnElements.forEach(function(btn) {
            // Add a new class "newClass" to each button element
            btn.classList.remove('light');
            btn.classList.add('dark');
        });
          // updates[`Users/${userId}/Light_Mode`] = userTheme;
        }
      console.log("Toggled theme");
      // update(userRef, updates);
    }}>
        Light Mode
      </Button>
    );
  }
  
  export default LightModeButton;