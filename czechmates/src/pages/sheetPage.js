
import InputWithLabel from "../components/InputWithLabel";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewTable from "../components/NewTable";
import TextareaPage from "../components/TextArea";
import { useState } from "react";
import { useEffect } from "react";
import StatusEffect from "../components/StatusEffectComp";
const attrDesc = require('../utils/attributeDesc.json');
const skillDesc = require('../utils/skillDesc.json');

/**
 * Purpose: this component has all of the character information, uneditable
 * Params/Dependencies: 
 * sheetInfo: object, all the character info to be displayed
 * charId: string, the id of the character being viewed
 * userTheme: string, either light or dark based off the users preference
 */
const SheetPage = ({ sheetInfo, charId, userTheme }) => {

    //the skills arrays for making them in two columns
    var [leftSkills, setLeftSkills] = useState();
    var [rightSkills, setRightSkills] = useState();

    //the attribute columns so they appear in two columns
    var [leftAttr, setLeftAttr] = useState();
    var [rightAttr, setRightAttr] = useState();

    //the status effects so they appear in three columns and appear nicely
    var [statusEffectsOne, setStatusEffectsOne] = useState([]);
    var [statusEffectsTwo, setStatusEffectsTwo] = useState([]);
    var [statusEffectsThree, setStatusEffectsThree] = useState([]);

    //the source for the image of the character stored as a URL
    var [imgSrc, setImgSrc] = useState(sheetInfo.General.ImageURL)

    /**
     * Purpose: before the component renders, grab the image URL or when it updates in the database
     * Params/Dependencies: 
     * charId
     * SheetInfo
     */
    useEffect(() => {
        if (charId !== undefined) {
            setImgSrc(sheetInfo.General.ImageURL);
        }
    }, [charId, sheetInfo])

    /**
     * Purpose: when the skills information changes, this is triggered
     * Params/Dependencies: 
     * sheetInfo.Skills
     */
    useEffect(() => {
        //this is for all the skills being put in their components then rows
        if (sheetInfo !== undefined) {
            // loop through all the character's skills and make components for them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(sheetInfo.Skills)) {
                if (key != "Learned_Abilities") {
                    var desc;
                    for (let i = 0; i < skillDesc.length; i++) {
                        if (skillDesc[i].Name === key) {
                            desc = skillDesc[i].Description;
                        }
                    }
                    arr.push({ key, value, desc });
                }
            }
            // splice the array for positioning
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
            // assign the positioning variable
            setLeftSkills(left);
            setRightSkills(right);
        }

        //this loop is for all the attributes being put int their components then rows
        if (sheetInfo !== undefined) {
            // loop through all the character's attributes and make components for them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key1, value] of Object.entries(sheetInfo.Attributes)) {
                var desc;
                for (let i = 0; i < attrDesc.length; i++) {
                    if (attrDesc[i].Name === key1) {
                        desc = attrDesc[i].Description;
                    }
                }
                var key = key1.replace(/_/g, " ");
                arr.push({ key, value, desc });
            }
            // splice the array for positioning
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
            // assign the positioning variable
            setLeftAttr(left);
            setRightAttr(right);
        }
    }, [sheetInfo.Skills]);

    /**
     * Purpose: when the status effect information changes, this is triggered
     * Params/Dependencies: 
     * sheetInfo.Status_Effect
     */
    useEffect(() => {
        // loop through the characters information and make components for them
        var arr = [];
        if (sheetInfo.Status_Effects !== undefined) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(sheetInfo.Status_Effects)) {
                if (value === true) {
                    arr.push(<StatusEffect disabled={true} key={key} checked={value} statusName={key} />);
                }
            }
            if (arr.length > 0) {
                var one = arr.slice(0, arr.length * .4);
                var two = arr.slice(arr.length * .4, arr.length * .7);
                var three = arr.slice(arr.length * .7);

                setStatusEffectsOne(one);
                setStatusEffectsTwo(two);
                setStatusEffectsThree(three);
            }
            else {
                setStatusEffectsOne("")
                setStatusEffectsTwo("No effects are active");
                setStatusEffectsThree("");
            }
        }
    }, [sheetInfo.Status_Effects]);

    /**
     * Purpose: build the sheet page component
     * Params/Dependencies: 
     * sheetInfo
     * imgSrc
     * userTheme
     */
    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 className={"text-center body_" + userTheme}>
                            Sheet
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    {/* the image from the url in the database stored in imgSrc */}
                        <img style={{ textAlign: "center", borderStyle: "solid" }} width='200vh' src={imgSrc} />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                {/* general information */}
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"Name"} content={sheetInfo?.General?.Name} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"Level"} content={sheetInfo?.General.Level} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel tooltip={true} category={"General"} label={"High Concept"} content={sheetInfo?.General?.High_Concept} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel tooltip={true} category={"General"} label={"Trouble"} content={sheetInfo?.General?.Trouble} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel tooltip={true} category={"General"} label={"Aspect 1"} content={sheetInfo?.General?.Aspect_1} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel tooltip={true} category={"General"} label={"Aspect 2"} content={sheetInfo?.General?.Aspect_2} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel tooltip={true} category={"General"} label={"Fate Points"} content={sheetInfo?.General?.Fate_Points} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"Money"} content={sheetInfo?.General?.Money} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <InputWithLabel category={"General"} label={"Physical Appearance"} content={sheetInfo?.General?.Physical_Appearance} disabled={true} />
                    <InputWithLabel category={"General"} label={"Background"} content={sheetInfo?.General?.Background} disabled={true} />
                    <InputWithLabel category={"General"} label={"Major Relationships"} content={sheetInfo?.General?.Major_Relationships} disabled={true} />
                    <InputWithLabel category={"General"} label={"Other"} content={sheetInfo?.General?.Other} disabled={true} />
                </Row>
                {/* Status effects being shown in their 3 rows */}
                <p style={{ textAlign: "center" }}>Status Effects</p>
                <Row>
                    <Col>
                        {
                            statusEffectsOne
                        }
                    </Col>
                    <Col>
                        {
                            statusEffectsTwo
                        }
                    </Col>
                    <Col>
                        {
                            statusEffectsThree
                        }
                    </Col>
                </Row>
                {/* equipment information */}
                <p style={{ textAlign: "center" }}>Equipment</p>
                <Row>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Equipped Weapon"} content={sheetInfo?.Equipment?.Weapon_Equipped} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel type={"Weapon"} category={"Equipment"} label={"Slot 1"} content={sheetInfo?.Equipment?.Weapon_Modification_Slots.Slot_1} disabled={true} />
                        <InputWithLabel type={"Weapon"} category={"Equipment"} label={"Slot 2"} content={sheetInfo?.Equipment?.Weapon_Modification_Slots.Slot_2} disabled={true} />
                        <InputWithLabel type={"Weapon"} category={"Equipment"} label={"Slot 3"} content={sheetInfo?.Equipment?.Weapon_Modification_Slots.Slot_3} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Equipped Shield"} content={sheetInfo?.Equipment?.Shield_Equipped} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel type={"Shield"} category={"Equipment"} label={"Slot 1"} content={sheetInfo?.Equipment?.Shield_Modification_Slots.Slot_1} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Equipped Armor"} content={sheetInfo?.Equipment?.Armor_Equipped} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel type={"Armor"} category={"Equipment"} label={"Slot 1"} content={sheetInfo?.Equipment?.Armor_Modification_Slots.Slot_1} disabled={true} />
                        <InputWithLabel type={"Armor"} category={"Equipment"} label={"Slot 2"} content={sheetInfo?.Equipment.Armor_Modification_Slots.Slot_2} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextareaPage disabled={true} content={sheetInfo?.Equipment.Inventory} title={"Inventory"}></TextareaPage>
                    </Col>
                </Row>
                <Row>
                    {/* skills information in a table */}
                    <p style={{ textAlign: "center" }}>Skills</p>
                    <Col>
                        <NewTable data={leftSkills} type={"Skills"}></NewTable>
                    </Col>
                    <Col>
                        <NewTable data={rightSkills} type={"Skills"}></NewTable>
                    </Col>
                    <TextareaPage disabled={true} content={sheetInfo?.Skills.Learned_Abilities} title={"Learned Abilities"}></TextareaPage>
                </Row>
                <Row>
                    <p style={{ textAlign: "center" }}>Equipment</p>
                    <Col>
                        <NewTable type={"Attribute"} data={leftAttr}></NewTable>
                    </Col>
                    <Col>
                        <NewTable type={"Attribute"} data={rightAttr}></NewTable>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SheetPage;