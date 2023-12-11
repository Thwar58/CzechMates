import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { ref } from "firebase/database";
import { db } from '../../firebase';
import ConfirmationPopup from '../ConfirmationPopup';
import ViewCharaPopup from '../ViewCharaPopup';

/**
 * Purpose: a component used to display the members of a world in the manage world popup
 * Params: 
 * charCreatorId: string, the user id of the member 
 * charId: string, the character id of the member
 * creatorId: string, the user id of the world
 * worldId: string, the id of the world
 * charName: string, the character's name
 * setAlign: function, sets the alignment of the popups (center, left, right)
 * userTheme: the user's color theme
 */
function UEWithTwoButtons({ charCreatorId, charId, creatorId, worldId, charName, setAlign, userTheme }) {

    /**
     * Purpose: renders the input field and buttons
     * Params/Dependencies: 
     * charName
     * userTheme
     * setAlign
     * charid
     * creatorId
     * worldId
     * charCreatorId
     */
    return (
        <>
            {/* set the member name and disable the input field */}
            <InputGroup className="mb-3">
                <Form.Control
                    value={charName}
                    disabled={true}
                />
                {/* the view character popup */}
                <ViewCharaPopup
                    userTheme={userTheme}
                    setAlign={setAlign}
                    charId={charId}
                    userId={creatorId}
                >
                </ViewCharaPopup>
                {/* the remove member confirmation popup */}
                <ConfirmationPopup
                    userTheme={userTheme}
                    name={"Remove"}
                    type={"removeMember"}
                    action={{ worldId, creatorId, charId, charCreatorId }}
                    title={`Removing a member...`}
                    content={`Are you sure you want to remove ${charName} from the world?`}
                >
                </ConfirmationPopup>
            </InputGroup>
        </>
    );
}

export default UEWithTwoButtons;