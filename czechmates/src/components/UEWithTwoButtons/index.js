import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// a component for an uneditable form input field with two buttons
// input: the value of the form, the creator id for later, and the labels for the buttons
function UEWithTwoButtons({ charId, charName, button1, button2 }) {

    return (
        <>
            {/* set the value and disable the input field */}
            <InputGroup className="mb-3">
                <Form.Control
                    value={charName}
                    disabled={true}
                />
                {/* set the first button */}
                <Button variant="outline-secondary" id="button-addon2">
                    {button1}
                </Button>
                {/* set the second button */}
                <Button variant="outline-secondary" id="button-addon2">
                    {button2}
                </Button>
            </InputGroup>
        </>
    );
}

export default UEWithTwoButtons;