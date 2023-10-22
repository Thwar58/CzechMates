// https://react-bootstrap.netlify.app/docs/components/table/
// https://stackoverflow.com/questions/70715704/table-react-bootstrap-component-rendering-from-array

import Table from 'react-bootstrap/Table';

function FillTable({type, data}) {
    return (

        <>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>{type}</th>
                        <th>Points</th>
                    </tr>
                </thead>
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