
import React, { useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import FillTable from "../components/Table";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from "react";
import NewTable from "../components/NewTable";

// this component has all of the character information, uneditable
const SheetPage = ({ sheetInfo }) => {



    // dummy attribute data
    const attributes = [
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
        { name: "Movement", points: "5" }
    ];

    return (
        <div>

           
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
                <Row>
                    <Col>
                        <InputWithLabel label={"Name"} placeholder={sheetInfo?.General?.Name ?? "Loading..."} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel label={"High Concept"} placeholder={sheetInfo?.General?.High_Concept ?? "Loading..."} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel label={"Trouble"} placeholder={sheetInfo?.General?.Trouble ?? "Loading..."} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel label={"Aspect 1"} placeholder={sheetInfo?.General?.Aspect_1 ?? "Loading..."} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel label={"Aspect 2"} placeholder={sheetInfo?.General?.Aspect_2 ?? "Loading..."} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel label={"Fate Points"} placeholder={sheetInfo?.General?.Fate_Points ?? "Loading..."} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <InputWithLabel label={"Money"} placeholder={sheetInfo?.General?.Money ?? "Loading..."} disabled={true} />
                    <InputWithLabel label={"Physical Appearance"} placeholder={sheetInfo?.General?.Physical_Appearance ?? "Loading..."} disabled={true} />
                    <InputWithLabel label={"Background"} placeholder={sheetInfo?.General?.Background ?? "Loading..."} disabled={true} />
                    <InputWithLabel label={"Major Relationships"} placeholder={sheetInfo?.General?.Major_Relationships ?? "Loading..."} disabled={true} />
                    <InputWithLabel label={"Other"} placeholder={sheetInfo?.General?.Other ?? "Loading..."} disabled={true} />
                </Row>
                {/* future: generate dynamically instead of hardcoding */}
                {/* general information */}
                {/* equipment information */}
                <p style={{ textAlign: "center" }}>Equipment</p>
                <Row>
                    <Col>
                        <InputWithLabel label={"Equipped Weapon"} placeholder={sheetInfo?.Equipment?.Weapon_Equipped ?? "Loading..."} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel label={"Weapon Mod 1"} placeholder={sheetInfo?.Equipment?.Weapon_Modification_Slots[0] ?? "Loading..."} disabled={true}/>
                        <InputWithLabel label={"Weapon Mod 2"} placeholder={sheetInfo?.Equipment?.Weapon_Modification_Slots[1] ?? "Loading..."} disabled={true}/>
                        <InputWithLabel label={"Weapon Mod 3"} placeholder={sheetInfo?.Equipment?.Weapon_Modification_Slots[2] ?? "Loading..."} disabled={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel label={"Equipped Shield"} placeholder={sheetInfo?.Equipment?.Shield_Equipped ?? "Loading..."} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel label={"Shield Mod 1"} placeholder={sheetInfo?.Equipment?.Shield_Modification_Slots[0] ?? "Loading..."} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel label={"Equipped Armor"} placeholder={sheetInfo?.Equipment?.Armor_Equipped ?? "Loading..."} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel label={"Armor Mod 1"} placeholder={sheetInfo?.Equipment?.Armor_Modification_Slots[0] ?? "Loading..."} disabled={true} />
                        <InputWithLabel label={"Armor Mod 2"} placeholder={sheetInfo?.Equipment?.Armor_Modification_Slots[1] ?? "Loading..."} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    {/* skills information in a table */}
                    <p style={{ textAlign: "center" }}>Skills</p>
                    <NewTable data={sheetInfo.Skills} type={"Skills"}></NewTable>
                </Row>
                <Row>
                    {/* attributes information in a table */}
                    <p style={{ textAlign: "center" }}>Equipment</p>
                    <NewTable type={"Attribute"} data={sheetInfo.Attributes}></NewTable>
                </Row>
            </Container>

        </div>
    );
};

export default SheetPage;