import Form from 'react-bootstrap/Form';

function UEInput({ value }) {

    return (
        <>
            <Form.Control
                value={value}
                disabled="true"
            />
        </>
    );
}

export default UEInput;