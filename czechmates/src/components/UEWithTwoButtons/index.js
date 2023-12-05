import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { remove } from 'firebase/database';
import { ref, update } from "firebase/database";
import { db } from '../../firebase';
import ConfirmationPopup from '../ConfirmationPopup';
import ViewCharaPopup from '../ViewCharaPopup';

// a component for an uneditable form input field with two buttons
// input: the value of the form, the creator id for later, and the labels for the buttons
function UEWithTwoButtons({ charId, creatorId, worldId, charName, setAlign, userTheme}) {
    const worldRef = ref(db);
    // console.log("setAlign in UETB", setAlign);


    return (
        <>
            {/* set the value and disable the input field */}
            <InputGroup className="mb-3">
                <Form.Control
                    value={charName}
                    disabled={true}
                />
                {/* set the first button */}
                
                <ViewCharaPopup
                 userTheme={userTheme}
                 setAlign={setAlign}
                 charId={charId}
                 userId={creatorId}
                >
                   
                </ViewCharaPopup>
                {/* set the second button */}
                <ConfirmationPopup
                userTheme={userTheme}
                name={"Remove"}
                type={"removeMember"}
                action={{worldId, creatorId, charId}}
                title={`Removing a member...`}
                content={`Are you sure you want to remove ${charName} from the world?`}
                >

                </ConfirmationPopup>
                
            </InputGroup>
        </>
    );
}

export default UEWithTwoButtons;