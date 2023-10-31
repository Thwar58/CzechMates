import Form from 'react-bootstrap/Form';

// component to display an input that is not editable
// given the value to display
function UEInput({ value }) {
    return (
        <>
            {/* set the value and disable the form input */}
            <Form.Control
                value={value}
                disabled={true}
            />
        </>
    );
}

export default UEInput;