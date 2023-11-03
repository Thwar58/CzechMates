
import React from "react";
import SkillsComp from "../components/SkillsComp";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// this component houses the content for the character skills
const SkillsPage = ({skillInfo}) => {
    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Skills
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SkillsComp value={skillInfo?.Alchemy ?? "Loading..."} name={"Alchemy"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Arcana ?? "Loading..."} name={"Arcana"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Athletics ?? "Loading..."} name={"Athletics"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Burglary ?? "Loading..."} name={"Burglary"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Deceive ?? "Loading..."} name={"Deceive"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Empathy ?? "Loading..."} name={"Empathy"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Engineering ?? "Loading..."} name={"Engineering"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Fight ?? "Loading..."} name={"Fight"} button1={"up"} button2={"down"} />
                    </Col>
                    <Col>
                        <SkillsComp value={skillInfo?.Hunting ?? "Loading..."} name={"Hunting"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Lore ?? "Loading..."} name={"Lore"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Physique ?? "Loading..."} name={"Physique"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Rapport ?? "Loading..."} name={"Rapport"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Shooting ?? "Loading..."} name={"Shooting"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Stealth ?? "Loading..."} name={"Stealth"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Survival ?? "Loading..."} name={"Survival"} button1={"up"} button2={"down"} />
                        <SkillsComp value={skillInfo?.Will ?? "Loading..."} name={"Will"} button1={"up"} button2={"down"} />
                    </Col>
                </Row>

                {/* future: we can change the button words to arrow icons
                and split them into two divs side by side
                we might need to change these to be their own components 
                for the onclick methods or we can pass in the method to 
                use, which might be better
                add value in between the buttons somehow later*/}
                {/* future: generate dynamically instead of hardcoding */}


            </Container>

        </div>
    );
};

export default SkillsPage;