// https://react-bootstrap.netlify.app/docs/components/table/
// https://stackoverflow.com/questions/70715704/table-react-bootstrap-component-rendering-from-array

import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';

// a component to hold the skills and attributes in the full character sheet
// input: the information to display, and whether it is for skills or attributes
function NewTable({ data, type }) {
    // the data array and the method to set it
    var [dataArr, setDataArr] = useState([]);

    // when the array changes, this is triggered
    useEffect(() => {
        // check that the data is not undefined
        if (data !== undefined) {
            // loop through all the data and modify it from its original 1 object format to an array of objects
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [oldKey, value] of Object.entries(data)) {
                if (oldKey != "Learned_Abilities") {
                    // replace the underscores with spaces to make it prettier
                    var key = oldKey.replace(/_/g, " ");
                    // push the objects 
                    // IMPORTANT!! the name of the variables you pass in will be the names of the attributes
                    arr.push({ key, value });
                }

            }
            setDataArr(arr);
        }

    }, [data]);

    useEffect(() => {
        // console.log(dataArr);
    }, [dataArr]);


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
                    {dataArr.map(obj => (
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