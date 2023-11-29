import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { db } from '../../firebase';
import { ref, update } from "firebase/database";
import { useEffect } from 'react';

const StatusEffect = ({checked, statusName, charId, disabled}) =>  {
    var [checked, setChecked] = useState(checked);
    // var [checked2, setChecked2] = useState(checked2);
    // console.log("name", statusName);
    // console.log("state", checked);

    useEffect(() => {
        // if the form does not match the new input, then the form gets set to this new content
        // this is to prevent the database and input from cycling in an infinite update loop
        if (checked != checked) {
            setChecked(checked);
        }
    
    }, [checked]);



    const handleToggle = () => {
        const charRef = ref(db);
       
        // change in db here
        const updates = {};
        updates[`Characters/${charId}/Status_Effects/${statusName}`] = !checked;
        setChecked(!checked);
        // ignore the modification slots for now (it is broken and needs to be fixed)
        // if (!underScoreAdded.includes("Slot")){
        //     updates[`Characters/${charId}/${category}/${underScoreAdded}`] = formValue;
        // } 
        // else if (underScoreAdded.includes("Slot")){
        //     updates[`Characters/${charId}/${category}/${type}_Modification_Slots/${underScoreAdded}`] = formValue;
        // }
        // if (label === "Name"){
        //     updates[`CharacterUserRel/${userId}/${charId}/Name`] = formValue;
        //     // need to update world member names here?
        //     updates[`Worlds/${participation}/Members/${charId}/Name`] = formValue;
        // }

        // console.log(updates);
        update(charRef, updates);

    }


  return (
    <Form >
      <Form.Check // prettier-ignore
        type="switch"
        id={statusName}
        label={statusName}
        onChange={handleToggle}
        checked={checked} // this handles the on off state
        disabled={disabled}
      />
      {/* you might need this later, might just set value with no onchange and then supress/ignore the warning */}
      {/* <Form.Check // prettier-ignore
        disabled
        type="switch"
        label="disabled switch"
        id="disabled-custom-switch"
      /> */}
    </Form>
  );
}

export default StatusEffect;