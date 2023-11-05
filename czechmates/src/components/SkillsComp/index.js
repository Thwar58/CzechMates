import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";
// import { getDatabase, ref, runTransaction } from "firebase/database";
import { db } from '../../firebase';
import { increment, ref, update } from "firebase/database";



// a component to display character skills, it is given the value and two button labels
// future: pass in a number, change value to name, change buttons to arrow icons
function SkillsComp({ value, name, charId, userId }) {
    const charRef = ref(db);
    
    // https://firebase.google.com/docs/database/web/read-and-write
    function increase() {
        const updates = {};
        updates['Characters/' + userId + "/" + charId + "/Skills/" + name] = increment(1);
        update(charRef, updates);
    }

    // https://firebase.google.com/docs/database/web/read-and-write
    function decrease() {
        const updates = {};
        updates['Characters/' + userId + "/" + charId + "/Skills/" + name] = increment(-1);
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