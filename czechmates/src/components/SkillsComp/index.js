import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// a component to display character skills, it is given the value and two button labels
// future: pass in a number, change value to name, change buttons to arrow icons
function SkillsComp({ value, button1, button2 }) {
    return (
        <>
            <InputGroup className="mb-3">
                {/* input the value and disable the input */}
                <Form.Control
                    value={value}
                    disabled={true}
                />
                {/* first button */}
                <Button variant="outline-secondary" id="button-addon2">
                    {button1}
                </Button>
                {/* display the number */}
                <InputGroup.Text id="basic-addon2">number</InputGroup.Text>
                {/* second button */}
                <Button variant="outline-secondary" id="button-addon2">
                    {button2}
                </Button>
            </InputGroup>
        </>
    );
}

export default SkillsComp;