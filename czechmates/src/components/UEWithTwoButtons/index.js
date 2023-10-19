import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function Member({ value }) {

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    value={value}
                    disabled="true"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    View
                </Button>
                <Button variant="outline-secondary" id="button-addon2">
                    Remove
                </Button>
            </InputGroup>
        </>
    );
}

export default Member;