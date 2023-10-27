
import React from "react";
import Dropdown from '../components/Dropdown';
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import DropDownShowsValue from "../components/DropDownShowsValue";

// this component houses the content for the character equipment
const EquipmentPage = () => {

    // future: pass in information instead of using dummy data
    const dummyWep = ["Beginner Bow", "Beginner Sword", "Beginner Spear", "Epic Healing Staff"];
    const dummyShield = ["Shield", "Big Shield", "Tall Shield"];
    const dummyArmor = ["Magic Armor", "Chain Magic Armor", "Heavy Magic Armor"];

    return (
        <div>
            <h1 style={{ color: "green" }}>
                Equipment
            </h1>
            {/* future: generate dynamically instead of hardcoding */}
            {/* dropdown for the weapons */}
            <DropDownShowsValue text="Equipped Weapon" actions={dummyWep} />
            {/* Weapon Modifications */}
            <Form.Label>Weapon Modification Slots</Form.Label>
            <InputWithLabel label={"Slot 1"} placeholder={"modification here"} disabled={false} />
            <InputWithLabel label={"Slot 2"} placeholder={"modification here"} disabled={false} />
            <InputWithLabel label={"Slot 3"} placeholder={"modification here"} disabled={false} />
            {/* dropdown for the shield */}
            <DropDownShowsValue text="Equipped Shield" actions={dummyShield} />
            {/* Weapon Modifications */}
            <Form.Label>Shield Modification Slots</Form.Label>
            <InputWithLabel label={"Slot 1"} placeholder={"modification here"} disabled={false} />
            {/* dropdown for the armor */}
            <DropDownShowsValue text="Equipped Armor" actions={dummyArmor} />
            {/* Weapon Modifications */}
            <Form.Label>Armor Modification Slots</Form.Label>
            <InputWithLabel label={"Slot 1"} placeholder={"modification here"} disabled={false} />
            <InputWithLabel label={"Slot 2"} placeholder={"modification here"} disabled={false} />
        </div>
    );
};

export default EquipmentPage;