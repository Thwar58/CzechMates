
import React from "react";
import SkillsComp from "../components/SkillsComp";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// this component houses the content for the character skills
const SkillsPage = () => {
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
                        <SkillsComp value={"0"} name={"Alchemy"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Arcana"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Athletics"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Burglary"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Deceive"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Empathy"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Engineering"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Fight"} button1={"up"} button2={"down"} />
                    </Col>
                    <Col>
                        <SkillsComp value={"0"} name={"Hunting"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Lore"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Physique"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Rapport"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Shooting"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Stealth"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Survival"} button1={"up"} button2={"down"} />
                        <SkillsComp value={"0"} name={"Will"} button1={"up"} button2={"down"} />
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