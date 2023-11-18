import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { remove } from 'firebase/database';
import { ref, update } from "firebase/database";
import { db } from '../../firebase';

// a component for an uneditable form input field with two buttons
// input: the value of the form, the creator id for later, and the labels for the buttons
function UEWithTwoButtons({ charId, creatorId, worldId, charName, button1, button2 }) {
    const worldRef = ref(db);



    // when view clicked, open up that characters character sheet
    // on click get character from db with the character id
    // make a sheetpage and open in popup? idek man we should talk to stuetzle about that one
    function removeChar() {
        // console.log("worldId ", worldId);
        // console.log("charId ", charId);
        const updates = {};
        // use the path to the specific property that this form field maps to in the database
        // and set it to the value in the form
        // console.log("this is the id right? ", worldId);
        // remove the character from the world members list
        updates[`Worlds/${worldId}/Members/${charId}`] = null;
        // remove the participation role from this character
        updates[`Characters/${charId}/Participation`] = null;
        // remove the world from the user assosciation
        // this might fix it
        updates[`WorldUserRel/${creatorId}/${charId}`] = null;

        // }
        console.log("remove in db at these places ", updates);
        // update(worldRef, updates);
        // 

    }


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
                <Button  onClick={removeChar} variant="outline-secondary" id="button-addon2">
                    {button2}
                </Button>
            </InputGroup>
        </>
    );
}

export default UEWithTwoButtons;