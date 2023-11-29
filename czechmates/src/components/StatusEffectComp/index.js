import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { db } from '../../firebase';
import { ref, update } from "firebase/database";
import { useEffect } from 'react';

const StatusEffect = ({checked, statusName, charId, disabled}) =>  {
    var [checked, setChecked] = useState(checked);

    useEffect(() => {
        // if the form does not match the new input, then the form gets set to this new content
        // this is to prevent the database and input from cycling in an infinite update loop
        if (checked != checked) {
            setChecked(checked);
        }
    
    }, [checked]);


    const handleToggle = () => {
        const charRef = ref(db);
        const updates = {};
        updates[`Characters/${charId}/Status_Effects/${statusName}`] = !checked;
        setChecked(!checked);
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
      {/* might be able to use this for disabling without greying it out */}
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