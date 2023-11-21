// https://ericgio.github.io/react-bootstrap-typeahead/

import { useState } from 'react';
// import {Form} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';


const TypeAhead = ({friendInfo, action}) => {
  const [singleSelections, setSingleSelections] = useState([]);
  var [friendsArr, setFriendArr] = useState([]);


  useEffect(() => {
    if (friendInfo !== undefined) {
        // console.log("friendinfo ", friendInfo);
        var arr = [];
        if (friendInfo !== null) {
          // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          for (const [, value] of Object.entries(friendInfo)) {
            // console.log("check name ", value);
            // pass in the key, the character name, and the id of who created the character
            arr.push(value);
          }
          setFriendArr(arr);
          // console.log("friends", friendsArr)
        }
    }


  }, [friendInfo]);

  useEffect(() => {
    if (singleSelections.length !== 0) {
        // console.log("this was selected from the typeahead: ", singleSelections);

        if (action === "sendWorldInvite"){
          for (const [key, value] of Object.entries(friendInfo)) {
            if (value == singleSelections){
              console.log("send this user a join code email: ", key);
            }
          }  
        }
    }

   
    // console.log(worldInfo);
}, [singleSelections]);

  // const [multiSelections, setMultiSelections] = useState([]);
  // const options = ["Friend1", "Friend2", "Friend3"];

 

  return (
    <>
      <Form.Group>
        {/* <Form.Label>Search here</Form.Label> */}
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          onChange={setSingleSelections}
          options={friendsArr}
          placeholder="Choose a friend..."
          selected={singleSelections}
        />
      </Form.Group>
    </>
  );
}

export default TypeAhead;