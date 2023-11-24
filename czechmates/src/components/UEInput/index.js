import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import ViewCharaPopup from '../ViewCharaPopup';

// component to display an input that is not editable
// input: the value of the input and the creator id for later use
function UEInput({ value, setAlign, userId, charId }) {



    return (
        <>
            {/* set the value and disable the form input */}
            <InputGroup className="mb-3">
                <Form.Control
                    value={value}
                    disabled={true}
                />
                <ViewCharaPopup
                setAlign={setAlign}
                charId={charId}
                userId={userId}
                ></ViewCharaPopup>
            </InputGroup>
        </>
    );
}

export default UEInput;