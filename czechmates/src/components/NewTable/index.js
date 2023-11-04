// https://react-bootstrap.netlify.app/docs/components/table/
// https://stackoverflow.com/questions/70715704/table-react-bootstrap-component-rendering-from-array

import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';

// a component to hold the skills and attributes in the full character sheet
// given the name and type and the amount
function NewTable({ data, type }) {
    // console.log("NTS ", skills);

    var [dataArr, setDataArr] = useState([]);


    useEffect(() => {
        if (data != undefined) {
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(data)) {
                // console.log(key, value);
                arr.push({key, value});
            }
            setDataArr(arr);
        }

    }, [data]);

    useEffect(() => {
        // console.log(dataArr);
    }, [dataArr]);



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
                    {dataArr.map(obj => (
                        <tr key={obj.key}>
                            <td>{obj.key}</td>
                            <td>{obj.value}</td>
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

export default NewTable;