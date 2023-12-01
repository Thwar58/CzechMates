
import InputWithLabel from "../components/InputWithLabel";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewTable from "../components/NewTable";
import TextareaPage from "../components/TextArea";
import { useState } from "react";
import { useEffect } from "react";
import StatusEffect from "../components/StatusEffectComp";
import NavWithDD from '../components/NavWithDropdown';
// this component has all of the character information, uneditable
// input: all of the info for a character
const SheetPage = ({ sheetInfo, userId }) => {

    // var left = arr.slice(0, 8);
    var [leftSkills, setLeftSkills] = useState();
    var [rightSkills, setRightSkills] = useState();
    var [leftAttr, setLeftAttr] = useState();
    var [rightAttr, setRightAttr] = useState();
    var [statusEffectsOne, setStatusEffectsOne] = useState([]);
    var [statusEffectsTwo, setStatusEffectsTwo] = useState([]);
    var [statusEffectsThree, setStatusEffectsThree] = useState([]);


    // when the skills information changes, this is triggered
    useEffect(() => {
        // console.log(sheetInfo.Skills);
        if (sheetInfo !== undefined) {
            // loop through all the character's skills and make components for them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(sheetInfo.Skills)) {
                // console.log(`${key}: `, value);
                if (key != "Learned_Abilities") {
                    arr.push({ key, value });
                }

            }
            // splice the array for positioning
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
            // assign the positioning variable
            setLeftSkills(left);
            setRightSkills(right);
        }

        if (sheetInfo !== undefined) {
            // loop through all the character's skills and make components for them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(sheetInfo.Attributes)) {
                // console.log(`${key}: `, value);
                arr.push({ key, value });
            }
            // splice the array for positioning
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
            // assign the positioning variable
            setLeftAttr(left);
            setRightAttr(right);
        }

    }, [sheetInfo.Skills]);

    useEffect(() => {
        // loop through the characters information and make components for them
        var arr = [];
        if (sheetInfo.Status_Effects !== undefined) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(sheetInfo.Status_Effects)) {
                // console.log(key, value);
                if (value === true) {
                    arr.push(<StatusEffect disabled={true} key={key} checked={value} statusName={key} />);
                }

            }
            if (arr.length>0){
                // console.log(arr);
                var one = arr.slice(0, arr.length*.4);
                var two = arr.slice(arr.length*.4, arr.length*.7);
                var three = arr.slice(arr.length*.7);
    
                setStatusEffectsOne(one);
                setStatusEffectsTwo(two);
                setStatusEffectsThree(three);
            }
            else{
                setStatusEffectsOne("")
                setStatusEffectsTwo("No effects are active");
                setStatusEffectsThree("");
            }
          

        }

    }, [sheetInfo.Status_Effects]);


    return (
        <div>
            <NavWithDD userId={userId}></NavWithDD>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Sheet
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col style={{ textAlign: "center", borderStyle: "solid" }}>
                        <p>Image here</p>
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
                        <InputWithLabel category={"General"} label={"Level"} content={sheetInfo?.Level} disabled={true} />

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"High Concept"} content={sheetInfo?.General?.High_Concept} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"Trouble"} content={sheetInfo?.General?.Trouble} disabled={true} />


                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"Aspect 1"} content={sheetInfo?.General?.Aspect_1} disabled={true} />

                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"Aspect 2"} content={sheetInfo?.General?.Aspect_2} disabled={true} />

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"Fate Points"} content={sheetInfo?.General?.Fate_Points} disabled={true} />
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