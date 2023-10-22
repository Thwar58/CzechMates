
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import FillTable from "../components/Table";


const SheetPage = () => {

    const test = [
        { name: 'Alchemy', points: '0' },
        { name: 'Arcana', points: '0' },
        { name: 'Athletics', points: '0' },
        { name: 'Burglary', points: '0' },
        { name: 'Deceive', points: '0' },
        { name: 'Empathy', points: '0' },
        { name: 'Engineering', points: '0' },
        { name: 'Fight', points: '0' },
        { name: 'Hunting', points: '0' },
        { name: 'Lore', points: '0' },
        { name: 'Physique', points: '0' },
        { name: 'Rapport', points: '0' },
        { name: 'Shooting', points: '0' },
        { name: 'Stealth', points: '0' },
        { name: 'Survival', points: '0' },
        { name: 'Will', points: '0' }
    ];

    const test2 = [
        { name: 'Awareness', points: '5' },
        { name: 'Charisma', points: '5' },
        { name: 'Defense', points: '5' },
        { name: 'Endurance', points: '5' },
        { name: 'Health', points: '5' },
        { name: 'Knowledge', points: '5' },
        { name: 'Magic Attack', points: '5' },
        { name: 'Magic Defense', points: '5' },
        { name: 'Magic Heal', points: '5' },
        { name: 'Magic Reach', points: '5' },
        { name: 'Melee Attack', points: '5' },
        { name: 'Ranged Attack', points: '5' },
        { name: 'Max Action Points (AP)', points: '5' },
        { name: 'Max Vigor', points: '5' },
        { name: 'Max Resolve', points: '5' },
        { name: 'Magic Range', points: '5' },
        {name: "Movement", points: "5"}
    ];

    return (
        <div>
            <h1 style={{ color: "green" }}>
                Sheet
            </h1>
            <p>Image here</p>
            <p>General</p>
            <InputWithLabel label={"Name"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"High Concept"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Trouble"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Aspect 1"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Aspect 2"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Fate Points"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Money"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Physical Appearance"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Background"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Major Relationships"} placeholder={"Type here"} disabled={true}/>
            <InputWithLabel label={"Other"} placeholder={"Type here"} disabled={true}/>
            <p>Equipment</p>
            <InputWithLabel label={"Equipped Weapon"} placeholder={"weapon"} disabled={true}/>
            <InputWithLabel label={"Weapon Modification 1"} placeholder={"modification here"} disabled={true}/>
            <InputWithLabel label={"Weapon Modification 2"} placeholder={"modification here"} disabled={true}/>
            <InputWithLabel label={"Weapon Modification 3"} placeholder={"modification here"} disabled={true}/>
            <InputWithLabel label={"Equipped Shield"} placeholder={"weapon"} disabled={true}/>
            <InputWithLabel label={"Shield Modification 1"} placeholder={"modification here"} disabled={true}/>
            <InputWithLabel label={"Equipped Armor"} placeholder={"weapon"} disabled={true}/>
            <InputWithLabel label={"Armor Modification 1"} placeholder={"modification here"} disabled={true}/>
            <InputWithLabel label={"Armor Modification 2"} placeholder={"modification here"} disabled={true}/>
            <p>Skills</p>
            <FillTable type={"Skill"} data={test}></FillTable>
            <p>Equipment</p>
            <FillTable type={"Attribute"} data={test2}></FillTable>
        </div>
    );
};

export default SheetPage;