import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";
import { db } from '../../firebase';
import { increment, ref, update } from "firebase/database";



// a component to display character skills, it is given the value and two button labels
// input: the value for the skill, the name of the skill, the character id and the user id
function SkillsComp({ value, name, charId }) {
    // the reference the the database
    const charRef = ref(db);

    // FUTURE: We should add limits to these

    // increases the value for the specific skill in the database
    // https://firebase.google.com/docs/database/web/read-and-write
    function increase() {
        const updates = {};
        updates['ZaraTest/Characters/'+ charId + "/Skills/" + name] = increment(1);
        update(charRef, updates);
    }

    // decreases the skill for the specific skill in the database
    // https://firebase.google.com/docs/database/web/read-and-write
    function decrease() {
        const updates = {};
        updates['ZaraTest/Characters/' + charId + "/Skills/" + name] = increment(-1);
        update(charRef, updates);
    }

    return (
        <>
            <InputGroup className="mb-3">
                {/* input the value and disable the input */}
                <Form.Control
                    value={name}
                    disabled={true}
                />
                {/* first button */}
                <Button onClick={increase} variant="outline-secondary" id="button-addon2">
                    up
                </Button>
                {/* display the number */}
                <InputGroup.Text id="basic-addon2">{value}</InputGroup.Text>
                {/* second button */}
                <Button onClick={decrease} variant="outline-secondary" id="button-addon2">
                    down
                </Button>
            </InputGroup>
        </>
    );
}

export default SkillsComp;