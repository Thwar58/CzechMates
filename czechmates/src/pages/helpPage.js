import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Purpose: the component for the help page, which has the user manual embedded
 * Params: none
 */
const HelpPage = ({ }) => {


/**
 * Purpose: renders the help page
 * Params/Dependencies: none
 */
    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10 fullWindow">
                <Row>
                    {/* the title */}
                    <Col>
                        <div style={{ textAlign: 'center' }}>
                            <h1>Help page</h1>
                        </div>

                    </Col>
                </Row>
                {/* the document embedded */}
                <Row style={{ height: "75vh"}}>
                <iframe style={{height:'auto', display:'block'}} src="https://docs.google.com/document/d/e/2PACX-1vSFrPvXkWu1nZ9DtR8kGWyzZOISWH5zdVSWAqdawvYOjxJxJzpRm6wttvCdy18pAJKuNdT0kojDW7DE/pub?embedded=true"></iframe>           
            </Row>
            </Container>
            
        </div>

    );
}


export default HelpPage;