import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function UEWithTwoButtons({ value, button1, button2 }) {

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    value={value}
                    disabled={true}
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    {button1}
                </Button>
                <Button variant="outline-secondary" id="button-addon2">
                    {button2}
                </Button>
            </InputGroup>
        </>
    );
}

export default UEWithTwoButtons;