import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// a component for the attributes of the character, given the name of that attribute
function AttributesComp({name, value}) {
    // returns a div with a disabled input group that displays the name and value
    return (
        <div>
        <InputGroup id={"AttributeComp" + name} className="mb-3">
          {/* sets the name and disables */}
        <Form.Control
          value ={name}
          disabled={true}
        />
        {/* add the portion that shows the value for this attribute */}
        <InputGroup.Text id={"AttributeComp" + name}>{value}</InputGroup.Text>
      </InputGroup>
        </div>
    );
}

export default AttributesComp;