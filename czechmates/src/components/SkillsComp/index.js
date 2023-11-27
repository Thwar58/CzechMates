import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";
import { db } from '../../firebase';
import { increment, ref, update } from "firebase/database";
import { useEffect } from 'react';
import { useState } from 'react';
// import Func from '../../utils/attributeFunctions';



// a component to display character skills, it is given the value and two button labels
// input: the value for the skill, the name of the skill, the character id and the user id
function SkillsComp({ value, name, charId, skills, attributes, level }) {
    // the reference the the database
    const charRef = ref(db);
    // var [recalcRequired, setRecalcRequired] = useState(false);

    // FUTURE: We should add limits to these
    // https://stackoverflow.com/questions/18899873/multiple-functions-inside-variable
    // these all use the global skills and attributes for ease right now, that will change in the future
    // future: decide how to map these functions to attributes and recalculating
    var Func = {
        calcAwareness: function () {
            return { "Awareness": skills.Burglary + skills.Hunting + 2 * skills.Shooting };
        },
        calcCharisma: function () {
            return { "Charisma": skills.Burglary + skills.Deceive + skills.Rapport + skills.Stealth };
        },
        calcDefense: function () {
            return { "Defense": skills.Engineering + skills.Fight + skills.Physique + skills.Stealth };
        },
        calcEndurance: function () {
            return { "Endurance": 2 * skills.Athletics + skills.Fight + skills.Survival };
        },
        calcHealth: function () {
            return { "Health": skills.Alchemy + skills.Physique + 2 * skills.Survival };
        },
        calcKnowledge: function () {
            return { "Knowledge": skills.Alchemy + skills.Engineering + 2 * skills.Lore };
        },
        calcMagicAttack: function () {
            return { 'Magic_Attack': skills.Arcana + skills.Deceive + skills.Rapport + skills.Will };
        },
        calcMagicDefense: function () {
            return { "Magic_Defense": skills.Arcana + skills.Engineering + skills.Lore + skills.Will };
        },
        calcMagicHeal: function () {
            return { 'Magic_Heal': skills.Alchemy + skills.Deceive + 2 * skills.Empathy };
        },
        calcMagicReach: function () {
            return { 'Magic_Reach': skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will };
        },
        calcMeleeAttack: function () {
            return { 'Melee_Attack': skills.Fight + skills.Hunting + skills.Physique + skills.Survival };
        },
        calcRangedAttack: function () {
            return { 'Ranged_Attack': skills.Athletics + skills.Burglary + skills.Hunting + skills.Shooting };
        },
        calcMaxAP: function () {
            return { 'Max_Action_Points_(AP)': 2 + Math.floor((attributes.Knowledge + attributes.Endurance) * .2) };
        },
        calcMaxVigor: function () {
            // console.log("check level in vigor", level);
            // console.log("check magic reach in vigor", attributes['Magic_Reach']);
            // console.log("check endurance in vigor", attributes.Endurance);
            return { "Max_Vigor": 2 * (attributes['Magic_Reach'] + attributes.Endurance) + level };
        },
        calcMaxResolve: function () {
            // console.log("check level in resolve", level);
            // console.log("check health in resolve", attributes.Health);
            return { "Max_Resolve": 2 * attributes.Health + 3 * level };
        },
        calcMagicRange: function () {
            // console.log("check magic reach in magic range", attributes["Magic_Reach"]);
            return { "Magic_Range": Math.floor(attributes['Magic_Reach'] * .5) };
        },
        calcMovement: function () {
            // console.log("check awareness in movement", attributes.Awareness);
            // console.log("check charisma in movement", attributes.Charisma);
            // console.log("check endurance in movement", attributes.Endurance);
            return { "Movement": Math.floor(2 + (attributes.Awareness + attributes.Charisma + attributes.Endurance) * .1) };
        }
    }


    // increases the value for the specific skill in the database
    // https://firebase.google.com/docs/database/web/read-and-write
    function increase() {
        if (value < 8) {
            const updates = {};
            // const recalc = {};
            updates['Characters/' + charId + "/Skills/" + name] = increment(1);
            updates[`Characters/${charId}/General/Level`] = increment(1);
            update(charRef, updates);
            // console.log("INCREASE, NEEDS A RECALC");
            // setRecalcRequired(true);
        }

    }

    // decreases the skill for the specific skill in the database
    // https://firebase.google.com/docs/database/web/read-and-write
    function decrease() {
        if (value > 0) {
            const updates = {};
            // const recalc = {};
            updates['Characters/' + charId + "/Skills/" + name] = increment(-1);
            updates[`Characters/${charId}/General/Level`] = increment(-1);
            update(charRef, updates);
            // console.log("DECREASE, NEEDS A RECALC");
            // setRecalcRequired(true);

        }


    }

    useEffect(() => {
        
        // recalcRequired === true
        if (level !== undefined) {
            
            // console.log(level);
            // console.log("BEGIN RECALC");
            const recalc = {};
            // recalc attr
            // set to false
            // https://stackoverflow.com/questions/49552862/is-there-a-way-to-call-all-functions-inside-an-object-in-javascript
            var callAll = function () {
                Object.values(Func).map(value => {
                    //  console.log(value);
                    // https://stackoverflow.com/questions/573145/get-everything-after-the-dash-in-a-string-in-javascript
                    const formula = value.toString().split(':').pop();
                    //  console.log("Formula", formula);
                    if ((typeof value === 'function') && (formula.includes("level") || formula.includes(name))) {
                        // console.log(value);
                        // console.log("name is: ", name);
                        var result = value.call();
                        // console.log("got it?", result);
                        for (const [key, value] of Object.entries(result)) {
                            // console.log("new value should be ", key, value + 5);
                            if (value + 5 !==  attributes[`${key}`]) {
                                console.log(`update the db for ${key}`, value + 5, attributes[`${key}`]);
                                recalc[`Characters/${charId}/Attributes/${key}`] = 5 + value;
                                // console.log("check of 3 triggers", key);
                                if (key.localeCompare("Charisma" === 0) ||
                                    key.localeCompare("Awareness" === 0) ||
                                    key.localeCompare("Endurance" === 0)) {
                                    var calc = Func.calcMovement();
                                    // console.log("check what's being set", calc);
                                    recalc[`Characters/${charId}/Attributes/Movement`] = 5 + calc.Movement;
                                }
                                if (key.localeCompare("Magic_Reach" === 0)) {
                                    var calc = Func.calcMagicRange();
                                    // console.log(calc);
                                    recalc[`Characters/${charId}/Attributes/Magic_Range`] = 5 + calc["Magic_Range"];
                                }

                            }

                        }

                    }
                })
            };
            callAll();
            update(charRef, recalc);
            // setRecalcRequired(false);
            // console.log("END RECALC");

        }


    }, [level, attributes]);



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