
import Button from 'react-bootstrap/Button';
import { db } from '../firebase';
import { ref, update } from 'firebase/database';


function LightModeButton({userId, userTheme, setUserTheme}) {
  
  // const userRef = ref(db);

    return (
      <Button 
      onClick={()=>{
        // const updates = {};
        if(userTheme === 'dark'){
          setUserTheme('light')
          // updates[`Users/${userId}/Light_Mode`] = userTheme;
        }else{
          setUserTheme('dark')
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