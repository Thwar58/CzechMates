import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// the JSON object with the attributes descriptions
const descriptions = require('../../utils/attributeDesc.json');

/**
 * Purpose: This component displays the attributes
 * Params:
 * name: string, name of the attribute
 * value: int, value of the attribute
 */
function AttributesComp({ name, value }) {

  // loops through the JSON object with the attributes descriptions and finds
  // the appropriate one for this attribute
  var desc;
    for (let i = 0; i < descriptions.length; i++) {
      if (descriptions[i].Name === name){
        desc = descriptions[i].Description;
      }
    }

/**
 * Purpose: this popover is the content when you hover over the attribute component for a tooltip
 * Params/Dependencies:
 * desc: string, the description for this attribute
 */
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{name}</Popover.Header>
      <Popover.Body>
      {desc}
      </Popover.Body>
    </Popover>
  );

  
/**
 * Purpose: renders the attribute component wrapped in the popup
 * Params/Dependencies:
 * popover
 * name
 * value
 */
  return (
    <div>
      {/* the popup */}
      <OverlayTrigger placement="top" overlay={popover}>
      <InputGroup id={"AttributeComp" + name} className="mb-3">
        {/* the attribute label (disabled)*/}
        <Form.Control
          value={name}
          disabled={true}
        />
        {/* the attribute value */}
        <InputGroup.Text id={"AttributeComp" + name}>{value}</InputGroup.Text>
      </InputGroup>
      </OverlayTrigger>
    </div>
  );
}

export default AttributesComp;