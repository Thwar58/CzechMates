import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { db } from '../../firebase';
import { ref, update } from "firebase/database";
import { useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// import statusArray from '../../utils/convertCSVToJSON';
const descriptions = require('../../utils/StatusDescJSON.json');

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

    var desc;
    // console.log(descriptions);
    for (let i = 0; i < descriptions.length; i++) {
      if (descriptions[i].Name === statusName){
        desc = descriptions[i].Description;
      }
    }


    const popover = (

      <Popover id="popover-basic">
        <Popover.Header as="h3">{statusName}</Popover.Header>
        <Popover.Body>
          {desc}
        </Popover.Body>
      </Popover>
    );


  return (
    <OverlayTrigger placement="top" overlay={popover}>
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
    </OverlayTrigger>
  );
}

export default StatusEffect;