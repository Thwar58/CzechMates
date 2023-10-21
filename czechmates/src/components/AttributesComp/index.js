import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AttributesComp({ value }) {

    return (
        <>
        <InputGroup className="mb-3">
        <Form.Control
          value ={value}
          aria-describedby="basic-addon2"
          disabled={true}
        />
        <InputGroup.Text id="basic-addon2">number</InputGroup.Text>
      </InputGroup>
        </>
    );
}

export default AttributesComp;