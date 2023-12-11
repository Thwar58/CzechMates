import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ViewCharaPopup from '../ViewCharaPopup';

/**
 * Purpose: a component used to display world members in the view world popup
 * Params: 
 * value: string, the name of the member
 * setAlign: function, sets the alignment for the view character popup (left, right, center)
 * userId: string, the current user's id
 * charId: string, the character id for this member
 * userTheme: string, the user's color theme
 */
function UEInput({ value, setAlign, userId, charId, userTheme }) {


    /**
     * Purpose: renders the input with the information
     * Params/Dependencies: 
     * value
     * userTheme
     * setAlign
     * charId
     * userId
     */
    return (
        <>
            {/* shows the member name and disables the form */}
            <InputGroup className="mb-3">
                <Form.Control
                    value={value}
                    disabled={true}
                />
                {/* the view member popup */}
                <ViewCharaPopup
                    userTheme={userTheme}
                    setAlign={setAlign}
                    charId={charId}
                    userId={userId}
                ></ViewCharaPopup>
            </InputGroup>
        </>
    );
}

export default UEInput;