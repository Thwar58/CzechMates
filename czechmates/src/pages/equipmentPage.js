
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// this component houses the content for the character equipment
const EquipmentPage = ({ equipInfo }) => {

    // future: pass in information instead of using dummy data
    const dummyWep = ["Beginner Bow", "Beginner Sword", "Beginner Spear", "Epic Healing Staff"];
    const dummyShield = ["Shield", "Big Shield", "Tall Shield"];
    const dummyArmor = ["Magic Armor", "Chain Magic Armor", "Heavy Magic Armor"];

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
                        <DropDownShowsValue text="Equipped Weapon" actions={dummyWep} />
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Weapon Modification Slots</Form.Label>
                        <InputWithLabel category={"Equipment"} label={"Slot 1"} content={equipInfo?.Weapon_Modification_Slots.Slot1} disabled={false} />
                        <InputWithLabel category={"Equipment"} label={"Slot 2"} content={equipInfo?.Weapon_Modification_Slots.Slot2} disabled={false} />
                        <InputWithLabel category={"Equipment"} label={"Slot 3"} content={equipInfo?.Weapon_Modification_Slots.Slot3} disabled={false} />
                    </Col>
                </Row>
                <Row style={{ borderBottom: "solid" }}>
                    <Col>
                        {/* dropdown for the shield */}
                        <Form.Label>Shield</Form.Label>
                        <DropDownShowsValue text="Equipped Shield" actions={dummyShield} />
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Shield Modification Slots</Form.Label>
                        <InputWithLabel category={"Equipment"} label={"Slot 1"} content={equipInfo?.Shield_Modification_Slots.Slot1} disabled={false} />
                    </Col>
                </Row>
                <Row style={{ borderBottom: "solid" }}>
                    <Col>
                        {/* dropdown for the armor */}
                        <Form.Label>Armor</Form.Label>
                        <DropDownShowsValue text="Equipped Armor" actions={dummyArmor} />
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        {/* Weapon Modifications */}
                        <Form.Label>Armor Modification Slots</Form.Label>
                        <InputWithLabel category={"Equipment"} label={"Slot 1"} content={equipInfo?.Armor_Modification_Slots.Slot1} disabled={false} />
                        <InputWithLabel category={"Equipment"} label={"Slot 2"} content={equipInfo?.Armor_Modification_Slots.Slot2} disabled={false} />
                    </Col>
                </Row>





            </Container>

        </div>
    );
};

export default EquipmentPage;