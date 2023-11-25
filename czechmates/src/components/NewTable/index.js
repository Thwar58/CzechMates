// https://react-bootstrap.netlify.app/docs/components/table/
// https://stackoverflow.com/questions/70715704/table-react-bootstrap-component-rendering-from-array

import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';

// a component to hold the skills and attributes in the full character sheet
// input: the information to display, and whether it is for skills or attributes
function NewTable({data, type }) {
    console.log("check data", data);

  
    if (data===undefined) {
        return (
            <div></div>
        )
    }


    // returns the table, populated with the information
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
                        <tr key={obj.key}>
                            <td>{obj.key}</td>
                            <td>{obj.value}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default NewTable;