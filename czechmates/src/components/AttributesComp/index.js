import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// a component for the attributes of the character
// input: the attribute name and value
function AttributesComp({ name, value }) {
  // returns a div with a disabled input group that displays the name and value
  return (
    <div>
      {/* assigns the attribute to id for this input group */}
      <InputGroup id={"AttributeComp" + name} className="mb-3">
        {/* sets the name and disables it so the user cannot change it */}
        <Form.Control
          value={name}
          disabled={true}
        />
        {/* add the portion that shows the value for this attribute */}
        <InputGroup.Text id={"AttributeComp" + name}>{value}</InputGroup.Text>
      </InputGroup>
    </div>
  );
}

export default AttributesComp;