
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextareaPage from "../components/TextArea";
import EquipmentDropdown from "../components/EquipmentDropdowns";
import NavWithDD from '../components/NavWithDropdown';
const equipmentInfo = require('./../utils/equipment.json');

// this component houses the content for the character equipment
// input: the equipment information for a character
const EquipmentPage = ({ equipInfo, charId, userId }) => {

    // future: pass in information instead of using dummy data

    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Equipment
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row style={{ borderBottom: "solid", borderTop: "solid" }}>
                    <Col>
                        {/* dropdown for the weapons */}
                        <Form.Label>Weapon</Form.Label>
                        {/* <DropDownShowsValue text="Equipped Weapon" actions={dummyWep} /> */}
                        <EquipmentDropdown type={"Weapon"} userId={userId} charId={charId} options={equipmentInfo.Weapons} text={equipInfo.Weapon_Equipped} ></EquipmentDropdown>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Weapon Modification Slots</Form.Label>
                        <InputWithLabel charId={charId} type={"Weapon"} category={"Equipment"} label={"Slot 1"} content={equipInfo?.Weapon_Modification_Slots.Slot_1} disabled={false} />
                        <InputWithLabel charId={charId} type={"Weapon"} category={"Equipment"} label={"Slot 2"} content={equipInfo?.Weapon_Modification_Slots.Slot_2} disabled={false} />
                        <InputWithLabel charId={charId} type={"Weapon"} category={"Equipment"} label={"Slot 3"} content={equipInfo?.Weapon_Modification_Slots.Slot_3} disabled={false} />
                    </Col>
                </Row>
                <Row style={{ borderBottom: "solid" }}>
                    <Col>
                        {/* dropdown for the shield */}
                        <Form.Label>Shield</Form.Label>
                        <EquipmentDropdown type={"Shield"} userId={userId} charId={charId} options={equipmentInfo.Shields} text={equipInfo.Shield_Equipped} ></EquipmentDropdown>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Shield Modification Slots</Form.Label>
                        <InputWithLabel charId={charId} type={"Shield"} category={"Equipment"} label={"Slot 1"} content={equipInfo?.Shield_Modification_Slots.Slot_1} disabled={false} />
                    </Col>
                </Row>
                <Row style={{ borderBottom: "solid" }}>
                    <Col>
                        {/* dropdown for the armor */}
                        <Form.Label>Armor</Form.Label>
                        <EquipmentDropdown type={"Armor"} userId={userId} charId={charId} options={equipmentInfo.Armor} text={equipInfo.Armor_Equipped} ></EquipmentDropdown>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Armor Modification Slots</Form.Label>
                        <InputWithLabel charId={charId} type={"Armor"} category={"Equipment"} label={"Slot 1"} content={equipInfo?.Armor_Modification_Slots.Slot_1} disabled={false} />
                        <InputWithLabel charId={charId} type={"Armor"} category={"Equipment"} label={"Slot 2"} content={equipInfo?.Armor_Modification_Slots.Slot_2} disabled={false} />
                    </Col>
                </Row>
                <Row>
                    <TextareaPage disabled={false} charId={charId} userId={userId} content={equipInfo?.Inventory} title={"Inventory"}></TextareaPage>
                </Row>
            </Container>
        </div>
    );
};

export default EquipmentPage;