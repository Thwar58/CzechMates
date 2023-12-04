import React, { useState } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { auth } from '../SignIn/firebaseConfig';
import { auto } from '@popperjs/core';

// this is the home page, as of now it is mostly reference material and will be largely removed
const HelpPage = ({ }) => {



    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <Row>
                    <Col>
                        <div style={{ textAlign: 'center' }}>
                            <h1>Help page</h1>
                        </div>

                    </Col>
                </Row>
                <Row style={{ height: "75vh"}}>
                {/* <iframe style={{height:'75vh', display:'block'}} src="https://docs.google.com/document/d/e/2PACX-1vSFrPvXkWu1nZ9DtR8kGWyzZOISWH5zdVSWAqdawvYOjxJxJzpRm6wttvCdy18pAJKuNdT0kojDW7DE/pub?embedded=true"></iframe> */}
                <iframe style={{height:'auto', display:'block'}} src="https://docs.google.com/document/d/e/2PACX-1vSFrPvXkWu1nZ9DtR8kGWyzZOISWH5zdVSWAqdawvYOjxJxJzpRm6wttvCdy18pAJKuNdT0kojDW7DE/pub?embedded=true"></iframe>           
            </Row>

            </Container>
            
        </div>

    );
}


export default HelpPage;