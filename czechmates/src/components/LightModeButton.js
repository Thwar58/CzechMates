
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function LightModeButton() {
const [mode,setMode] = useState(false);
useEffect(() => {
  if (mode) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
}, [mode]);
    return (
      <Button 
      onClick={()=>{if(mode){setMode(false)}else{setMode(true)}
      console.log("Toggled theme");
    }}
      checked={mode}>
        Light Mode
      </Button>
    );
  }
  
  export default LightModeButton;