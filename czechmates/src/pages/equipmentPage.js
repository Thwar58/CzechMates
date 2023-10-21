
import React from "react";
import Dropdown from '../components/Dropdown';
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';


const EquipmentPage = () => {

    // I think we should split up the weapons and not just have one dropdown, there are so many
    const dummyWep = ["Beginner Bow", "Beginner Sword", "Beginner Spear", "Epic Healing Staff"];
    const dummyShield = ["Shield", "Big Shield", "Tall Shield"];
    const dummyArmor = ["Magic Armor", "Chain Magic Armor", "Heavy Magic Armor"];


    return (
        <div>
            <h1 style={{ color: "green" }}>
                Equipment
            </h1>
            <Dropdown text="Equipped Weapon" actions={dummyWep}/>
            <Form.Label>Weapon Modification Slots</Form.Label>
            <InputWithLabel label={"Slot 1"} placeholder={"modification here"}/>
            <InputWithLabel label={"Slot 2"} placeholder={"modification here"}/>
            <InputWithLabel label={"Slot 3"} placeholder={"modification here"}/>
            <Dropdown text="Equipped Shield" actions={dummyShield}/>
            <Form.Label>Shield Modification Slots</Form.Label>
            <InputWithLabel label={"Slot 1"} placeholder={"modification here"}/>
            <Dropdown text="Equipped Armor" actions={dummyArmor}/>
            <Form.Label>Armor Modification Slots</Form.Label>
            <InputWithLabel label={"Slot 1"} placeholder={"modification here"}/>
            <InputWithLabel label={"Slot 2"} placeholder={"modification here"}/>
        </div>
    );
};

export default EquipmentPage;