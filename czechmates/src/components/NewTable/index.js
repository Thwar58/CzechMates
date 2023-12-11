// https://react-bootstrap.netlify.app/docs/components/table/
// https://stackoverflow.com/questions/70715704/table-react-bootstrap-component-rendering-from-array
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

/**
 * Purpose: the component that displays the skills and attributes in tables
 * Params: 
 * data: an array of JSON objects storing the information for each skill/attribute
 * type: string, what kind of information to display (attribute or skill)
 */
function NewTable({ data, type }) {

    /**
    * Purpose: renders a blank screen if the data is not loaded correctly
    * Params/Dependencies: 
    * data
    */
    if (data === undefined) {
        return (
            <div></div>
        )
    }

    /**
    * Purpose: renders the table when data is loaded
    * Params/Dependencies: 
    * data
    * type
    */
    return (
        <>
            <Table striped bordered hover>
                {/* creates the header with the skill/attribute name and points label */}
                <thead>
                    <tr>
                        <th>{type}</th>
                        <th>Points</th>
                    </tr>
                </thead>
                {/* populates the body with the values passed in by mapping the objects in the array */}
                <tbody>
                    {data.map(obj => (
                        // the tooltip that surrounds each row
                        <OverlayTrigger key={obj.key} placement="top" overlay={
                            // the content for the tooltip
                            <Popover id="popover-basic">
                                <Popover.Header as="h3">{obj.key}</Popover.Header>
                                <Popover.Body>
                                    {obj.desc}
                                </Popover.Body>
                            </Popover>}>
                            {/* the information in the table (skill/attribute name and value) */}
                            <tr key={obj.key}>
                                <td>{obj.key}</td>
                                <td>{obj.value}</td>
                            </tr>
                        </OverlayTrigger>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default NewTable;