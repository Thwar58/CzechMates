
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextareaPage from "../components/TextArea";
import EquipmentDropdown from "../components/EquipmentDropdowns";
const equipmentInfo = require('./../utils/equipment.json');

/**
 * Purpose: the component for the equipment page
 * Params: 
 * equipInfo: JSON object, the character's equipment information 
 * charId: string, the character's id
 * userId: string, the user's id
 * userTheme: string, the user's color theme
 */
const EquipmentPage = ({ equipInfo, charId, userId, userTheme }) => {

    /**
     * Purpose:
     * Params/Dependencies: 
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
                        <EquipmentDropdown userTheme={userTheme} type={"Weapon"} userId={userId} charId={charId} options={equipmentInfo.Weapons} text={equipInfo.Weapon_Equipped} ></EquipmentDropdown>
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
                        <EquipmentDropdown userTheme={userTheme} type={"Shield"} userId={userId} charId={charId} options={equipmentInfo.Shields} text={equipInfo.Shield_Equipped} ></EquipmentDropdown>
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
                        <EquipmentDropdown userTheme={userTheme} type={"Armor"} userId={userId} charId={charId} options={equipmentInfo.Armor} text={equipInfo.Armor_Equipped} ></EquipmentDropdown>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Armor Modification Slots</Form.Label>
                        <InputWithLabel charId={charId} type={"Armor"} category={"Equipment"} label={"Slot 1"} content={equipInfo?.Armor_Modification_Slots.Slot_1} disabled={false} />
                        <InputWithLabel charId={charId} type={"Armor"} category={"Equipment"} label={"Slot 2"} content={equipInfo?.Armor_Modification_Slots.Slot_2} disabled={false} />
                    </Col>
                </Row>
                {/* the inventory */}
                <Row>
                    <TextareaPage disabled={false} charId={charId} userId={userId} content={equipInfo?.Inventory} title={"Inventory"}></TextareaPage>
                </Row>
            </Container>
        </div>
    );
};

export default EquipmentPage;