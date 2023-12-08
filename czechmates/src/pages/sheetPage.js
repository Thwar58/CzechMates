
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
import { db } from '../firebase';
import { child, get, ref, set, push, update, onValue } from "firebase/database";
// this component has all of the character information, uneditable
// input: all of the info for a character
const SheetPage = ({ sheetInfo, charId, userTheme }) => {

    // var left = arr.slice(0, 8);
    var [leftSkills, setLeftSkills] = useState();
    var [rightSkills, setRightSkills] = useState();
    var [leftAttr, setLeftAttr] = useState();
    var [rightAttr, setRightAttr] = useState();
    var [statusEffectsOne, setStatusEffectsOne] = useState([]);
    var [statusEffectsTwo, setStatusEffectsTwo] = useState([]);
    var [statusEffectsThree, setStatusEffectsThree] = useState([]);
    var [ imgSrc, setImgSrc ] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC')

    useEffect(() => {
        if (charId !== undefined){
            // console.log("check char id in sub", charId);
            // use this path and onValue monitors for changes
            console.log(charId);
        const charRef = ref(db, 'Characters/' + charId);
        onValue(charRef, (snapshot) => {
            // setCharInfo(snapshot.val());
            console.log("LOOK HERE");
            console.log(snapshot.val().General.ImageURL);
            setImgSrc(snapshot.val().General.ImageURL);
        });  
        }
    }, [charId])

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
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1  className={"text-center body_"+userTheme}>
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
                        <img width='200vh' src={imgSrc}/>
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