
import InputWithLabel from "../components/InputWithLabel";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewTable from "../components/NewTable";

// this component has all of the character information, uneditable
const SheetPage = ({ sheetInfo }) => {

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
                {/* general information */}
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"Name"} content={sheetInfo?.General?.Name} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"High Concept"} content={sheetInfo?.General?.High_Concept} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"Trouble"} content={sheetInfo?.General?.Trouble} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"Aspect 1"} content={sheetInfo?.General?.Aspect_1} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"General"} label={"Aspect 2"} content={sheetInfo?.General?.Aspect_2} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"General"} label={"Fate Points"} content={sheetInfo?.General?.Fate_Points} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <InputWithLabel category={"General"} label={"Money"} content={sheetInfo?.General?.Money} disabled={true} />
                    <InputWithLabel category={"General"} label={"Physical Appearance"} content={sheetInfo?.General?.Physical_Appearance} disabled={true} />
                    <InputWithLabel category={"General"} label={"Background"} content={sheetInfo?.General?.Background} disabled={true} />
                    <InputWithLabel category={"General"} label={"Major Relationships"} content={sheetInfo?.General?.Major_Relationships} disabled={true} />
                    <InputWithLabel category={"General"} label={"Other"} content={sheetInfo?.General?.Other} disabled={true} />
                </Row>
                {/* equipment information */}
                <p style={{ textAlign: "center" }}>Equipment</p>
                <Row>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Equipped Weapon"} content={sheetInfo?.Equipment?.Weapon_Equipped} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Weapon Mod 1"} content={sheetInfo?.Equipment?.Weapon_Modification_Slots.Slot1} disabled={true} />
                        <InputWithLabel category={"Equipment"} label={"Weapon Mod 2"} content={sheetInfo?.Equipment?.Weapon_Modification_Slots.Slot2} disabled={true} />
                        <InputWithLabel category={"Equipment"} label={"Weapon Mod 3"} content={sheetInfo?.Equipment?.Weapon_Modification_Slots.Slot3} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Equipped Shield"} placeholder={sheetInfo?.Equipment?.Shield_Equipped} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Shield Mod 1"} placeholder={sheetInfo?.Equipment?.Shield_Modification_Slots.Slot1} disabled={true} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Equipped Armor"} placeholder={sheetInfo?.Equipment?.Armor_Equipped} disabled={true} />
                    </Col>
                    <Col>
                        <InputWithLabel category={"Equipment"} label={"Armor Mod 1"} placeholder={sheetInfo?.Equipment?.Armor_Modification_Slots.Slot1} disabled={true} />
                        <InputWithLabel category={"Equipment"} label={"Armor Mod 2"} placeholder={sheetInfo?.Equipment?.Armor_Modification_Slots.Slot2} disabled={true} />
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