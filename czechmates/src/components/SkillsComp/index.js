import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { db } from '../../firebase';
import { increment, ref, update } from "firebase/database";
import { useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// the JSON object with the skill descriptions for the tooltips
const descriptions = require('../../utils/skillDesc.json');


/**
 * Purpose: the component that displays the skills and their tooltips
 * Params: 
 * value: int, the number of points in the skill
 * name: string, the name of the skill
 * charId: string, the character id
 * skills: JSON object, all of the user's skills
 * userId: the user's id
 * attributes: JSON object, all of the user's skills
 * level: int, the character's level
 * userTheme: the user's color theme
 */
function SkillsComp({ value, name, charId, skills, userId, attributes, level, userTheme }) {
    // the reference the the database
    const charRef = ref(db);

    // gets the tooltip description for the skill being displayed
    var desc;
    for (let i = 0; i < descriptions.length; i++) {
        if (descriptions[i].Name === name) {
            desc = descriptions[i].Description;
        }
    }

    /**
     * Purpose: functions for calculating all of the attributes
     * Params/Dependencies:
     * skills
     * attributes
     * level
     */
    // https://stackoverflow.com/questions/18899873/multiple-functions-inside-variable
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
            // Knowledge = skills.Alchemy + skills.Engineering + 2 * skills.Lore
            // Endurance = 2 * skills.Athletics + skills.Fight + skills.Survival
            return { 'Max_Action_Points_AP': 2 + Math.floor((((skills.Alchemy + skills.Engineering + 2 * skills.Lore)+5) +
             ((2 * skills.Athletics + skills.Fight + skills.Survival)+5)) * .2) };
        },
        calcMaxVigor: function () {
            // Magic_Reach = skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will
            // Endurance = 2 * skills.Athletics + skills.Fight + skills.Survival
            return { "Max_Vigor": 2 * (((skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will)+5) + 
            ((2 * skills.Athletics + skills.Fight + skills.Survival)+5)) + level };
        },
        calcMaxResolve: function () {
            // skills.Alchemy + skills.Physique + 2 * skills.Survival = health
            return { "Max_Resolve": 2 * ((skills.Alchemy + skills.Physique + 2 * skills.Survival)+5) + 3 * level };
        },
        calcMagicRange: function () {
            // Magic_Reach = skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will
            return { "Magic_Range": Math.floor(((skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will)+5) * .5) };
        },
        calcMovement: function () {
            return { "Movement": Math.floor(2 + (attributes.Awareness + attributes.Charisma + attributes.Endurance) * .1) };
        }
    }


    /**
     * Purpose: increases the skill level by 1
     * Params/Dependencies:
     * name
     * charId
     * value
     * userId
     */
    // https://firebase.google.com/docs/database/web/read-and-write
    function increase() {
        // limits the value to 8 and updates the appropriate skill and the character level
        if (value < 8) {
            const updates = {};
            updates['Characters/' + charId + "/Skills/" + name] = (value + 1);
            updates[`Characters/${charId}/General/Level`] = increment(1);
            updates[`CharacterUserRel/${userId}/${charId}/Level`] = increment(1);
            update(charRef, updates);
        }
    }

    /**
     * Purpose: decreases the skill level by 1
     * Params/Dependencies:
     * name
     * charId
     * value
     * userId
     */
    // https://firebase.google.com/docs/database/web/read-and-write
    function decrease() {
        // limits the value to 0 and updates the appropriate skill and the character level
        if (value > 0) {
            const updates = {};
            updates['Characters/' + charId + "/Skills/" + name] = (value - 1);
            updates[`Characters/${charId}/General/Level`] = increment(-1);
            updates[`CharacterUserRel/${userId}/${charId}/Level`] = increment(-1);
            update(charRef, updates);

        }


    }

    /**
     * Purpose: determined what attributes to recalculate when a skill or the level is changed
     * Params/Dependencies:
     * attributes
     * level
     * name
     * charId
     */
    useEffect(() => {
        if (level !== undefined) {
            const recalc = {};
            // a function that maps each of the functions and used them to determine what to recalculate
            // https://stackoverflow.com/questions/49552862/is-there-a-way-to-call-all-functions-inside-an-object-in-javascript
            var callAll = function () {
                Object.values(Func).map(value => {
                    // get the formula for this calc function
                    // https://stackoverflow.com/questions/573145/get-everything-after-the-dash-in-a-string-in-javascript
                    const formula = value.toString().split(':').pop();
                    // check if this attribute function contains the level or the name of the skill changing
                    if ((typeof value === 'function') && (formula.includes("level") ||  formula.includes(name))) {
                        // if it does then call the recalc function
                        var result = value.call();
                        // for the result of the function (a JSON object with the attribute name and new value)
                        for (const [key, value] of Object.entries(result)) {
                            // if the calculated value plus the default value of 5 doesnt match the current matching attributes
                            if (value + 5 !== attributes[`${key}`]) {
                                // update the attribute in the database
                                recalc[`Characters/${charId}/Attributes/${key}`] = 5 + value;
                                // below are two edge cases for attributes that rely on other attributes in their calculations
                                // if this attribute is charisma, awareness, or endurance, then recalc movement as well
                                if (key.localeCompare("Charisma" === 0) ||
                                    key.localeCompare("Awareness" === 0) ||
                                    key.localeCompare("Endurance" === 0)) {
                                    var calc = Func.calcMovement();
                                    recalc[`Characters/${charId}/Attributes/Movement`] = 5 + calc.Movement;
                                }
                                // if this attribute is magic reach, recalc magic range as well
                                if (key.localeCompare("Magic_Reach" === 0)) {
                                    var calc = Func.calcMagicRange();
                                    recalc[`Characters/${charId}/Attributes/Magic_Range`] = 5 + calc["Magic_Range"];
                                }
                            }
                        }
                    }
                })
            };
            // call the above function and update the skills
            callAll();
            update(charRef, recalc);
        }
    }, [level, attributes, skills, value]);


    /**
     * Purpose: the content for the tooltip
     * Params/Dependencies:
     * name
     * desc
     */
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{name}</Popover.Header>
            <Popover.Body>
                {desc}
            </Popover.Body>
        </Popover>
    );


    /**
     * Purpose: renders the skill component and the tooltip associated with it
     * Params/Dependencies:
     * name
     * userTheme
     * value
     */
    return (
        <>
            <InputGroup className="mb-3">
                {/* the overlay for the tooltip */}
                <OverlayTrigger placement="top" overlay={popover}>
                    {/* input the value and disable the input */}
                    <Form.Control
                        value={name}
                        disabled={true}
                    />
                </OverlayTrigger>
                {/* the button that increases the skill */}
                <Button className={"btn_" + userTheme} onClick={increase} variant="outline-secondary" id="button-addon2">
                    up
                </Button>
                {/* the display for the skill amount */}
                <InputGroup.Text id="basic-addon2">{value}</InputGroup.Text>
                {/* the button that decreased the skill */}
                <Button className={"btn_" + userTheme} onClick={decrease} variant="outline-secondary" id="button-addon2">
                    down
                </Button>
            </InputGroup>

        </>
    );
}

export default SkillsComp;