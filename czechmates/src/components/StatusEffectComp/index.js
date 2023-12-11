import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { db } from '../../firebase';
import { ref, update } from "firebase/database";
import { useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// a JSON object with the status effect descriptions
const descriptions = require('../../utils/StatusDescJSON.json');

/**
 * Purpose: a component for the character status effects
 * Params: 
 * checked: boolean, whether the status effect is active or not
 * statusName: string, the name of the status effect
 * charId: string, the character id
 * disabled: boolean, whether the toggle is editable or not
 */
const StatusEffect = ({ checked, statusName, charId, disabled }) => {
  // a useState for if the statusEffect is checked or not
  var [checked, setChecked] = useState(checked);

  /**
    * Purpose: checks if the incoming value of checked is the same on the page as in the database
    * this prevents infinite update loops
    * Params/Dependencies: 
    * checked
    */
  useEffect(() => {
    if (checked != checked) {
      setChecked(checked);
    }

  }, [checked]);

  /**
   * Purpose: activates and deactivates the status effect
   * Params/Dependencies: 
   * checked
   * charId
   * statusName
   */
  const handleToggle = () => {
    const charRef = ref(db);
    const updates = {};
    updates[`Characters/${charId}/Status_Effects/${statusName}`] = !checked;
    setChecked(!checked);
    update(charRef, updates);
  }

  // gets the description for the status effect from the JSON object
  var desc;
  for (let i = 0; i < descriptions.length; i++) {
    if (descriptions[i].Name === statusName) {
      desc = descriptions[i].Description;
    }
  }


  /**
   * Purpose: the content for the tooltip
   * Params/Dependencies: 
   * statusName
   * desc
   */
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{statusName}</Popover.Header>
      <Popover.Body>
        {desc}
      </Popover.Body>
    </Popover>
  );

  /**
   * Purpose: renders the status effect toggle and the tooltip associated with it
   * Params/Dependencies: 
   */
  return (
    // the tooltip
    <OverlayTrigger placement="top" overlay={popover}>
      <Form >
        {/* a toggle or switch with the status name, it's checked status, and whether it is disabled or not */}
        <Form.Check
          type="switch"
          id={statusName}
          label={statusName}
          onChange={handleToggle}
          checked={checked} // this handles the on off state
          disabled={disabled}
        />
      </Form>
    </OverlayTrigger>
  );
}

export default StatusEffect;