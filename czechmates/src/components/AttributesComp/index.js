import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const descriptions = require('../../utils/attributeDesc.json');





// a component for the attributes of the character
// input: the attribute name and value
function AttributesComp({ name, value }) {

  var desc;
    console.log(descriptions);
    for (let i = 0; i < descriptions.length; i++) {
      if (descriptions[i].Name === name){
        desc = descriptions[i].Description;
      }
    }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{name}</Popover.Header>
      <Popover.Body>
      {desc}
      </Popover.Body>
    </Popover>
  );

  
  // returns a div with a disabled input group that displays the name and value
  return (
    <div>
      {/* assigns the attribute to id for this input group */}
      <OverlayTrigger placement="top" overlay={popover}>
      <InputGroup id={"AttributeComp" + name} className="mb-3">
      {/* <StyledTooltip></StyledTooltip> */}
        {/* sets the name and disables it so the user cannot change it */}
        <Form.Control
          value={name}
          disabled={true}
        />
        {/* add the portion that shows the value for this attribute */}
        <InputGroup.Text id={"AttributeComp" + name}>{value}</InputGroup.Text>
      </InputGroup>
      </OverlayTrigger>
    </div>
  );
}

export default AttributesComp;