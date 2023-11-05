// https://react-bootstrap.netlify.app/docs/components/table/
// https://stackoverflow.com/questions/70715704/table-react-bootstrap-component-rendering-from-array

import Table from 'react-bootstrap/Table';

// a component to hold the skills and attributes in the full character sheet
// given the name and type and the amount
function FillTable({ type, data }) {
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
                {/* populates the body with the values passed in */}
                <tbody>
                    {data.map(input => (
                        <tr key={input.name}>
                            <td>{input.name}</td>
                            <td>{input.points}</td>
                        </tr>
                    ))}
                    {/* {tableData.map(arrayData => {
                        return (
                            <tr>
                                <td>arrayData</td>
                            </tr>
                        )
                    }
                    )} */}
                </tbody>
            </Table>
        </>
    );
}

export default FillTable;