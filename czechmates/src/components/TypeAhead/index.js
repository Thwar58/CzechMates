// https://ericgio.github.io/react-bootstrap-typeahead/

import { useState } from 'react';
// import {Form} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update } from "firebase/database";


const TypeAhead = ({ optionInfo, action, userId, userName }) => {
  const [singleSelections, setSingleSelections] = useState([]);
  var [optionsArr, setOptionsArr] = useState([]);
  // var [dbInfo, setDBInfo] = useState();


  // distinguish which typeahead we are using here, get all users if profile, whenever a selection is made,
  // check follower list and update accordingly
  useEffect(() => {
    // console.log("see it change", optionInfo);
    if (optionInfo !== undefined) {
      // console.log("friendinfo ", friendInfo);
      var arr = [];
      if (optionInfo !== null) {
        if (action === "sendWorldInvite") {
          // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          for (const [key, value] of Object.entries(optionInfo)) {
            console.log(key, value);
            // pass in the key, the character name, and the id of who created the character
            arr.push(value);
            console.log("look here ", value);
          }
          setOptionsArr(arr);
        }
        else if (action === "follow") {
          for (const [key, value] of Object.entries(optionInfo)) {
            // console.log(key, value);
            // pass in the key, the character name, and the id of who created the character
            if (value.Name !== userName){
              arr.push(value.Name);
            }
           
            // console.log("look here ", value);
          }
          setOptionsArr(arr);
        }
      }
    }

  }, [optionInfo]);

  useEffect(() => {
    // console.log("check", optionsArr);

  }, [optionsArr]);

  useEffect(() => {
    if (singleSelections.length !== 0) {
      // console.log("this was selected from the typeahead: ", singleSelections);

      if (action === "sendWorldInvite") {
        for (const [key, value] of Object.entries(optionInfo)) {
          if (value == singleSelections) {
            console.log("send this user a join code email: ", key);
          }
        }
      }
      else if (action === "follow") {
        // console.log("follow this user");
        for (const [key, value] of Object.entries(optionInfo)) {
          if (value.Name == singleSelections) {
            console.log("You selected this user", value.Name, singleSelections);
            const userRef = ref(db, `Users/${key}/Following`);
            // console.log("follow this user: ", key, value);
            // check if this user follows you already
            onValue(userRef, (snapshot) => {
              // console.log("requested user info ", snapshot.val());
              var present = false;
              if (snapshot.val() !== null) {
                for (const [key2, value2] of Object.entries(snapshot.val())) {
                  console.log("here", key2, value2);
                  console.log("look here ", value2);
                  // console.log(userId);
                  if (key2 === userId) {
                    present = true;
                  }
                }
              }

              // this part is not working 
              const updates = {};
              if (present === true) {
                console.log("make them friends");
                // add friend, remove from following
                // console.log("make friends", present);
                // remove requester from requested follower list
                updates[`Users/${key}/Followers/${userId}`] = null;
                updates[`Users/${userId}/Followers/${key}`] = null;
                // add requestor to requested friends list
                updates[`Users/${key}/Friends/${userId}`] = userName;
                // add requested to requestor friends list
                updates[`Users/${userId}/Friends/${key}`] = value.Name;
                console.log(updates);
                update(ref(db), updates);
              }
              // this part is working
              else if (present === false) {
                console.log("potential follower")
                // add following
                var alreadyFriends = false;

                const currentUser = ref(db, `Users/${userId}/Friends`);
                onValue(currentUser, (snapshot) => {
                  // console.log(snapshot.val());
                  // console.log(key);
                  if (snapshot.val() !== null) {
                    var h = snapshot.val()[key];
                    if (snapshot.val()[key] !== undefined) {
                      alreadyFriends = true;
                    }
                  }
                  // setWorldInfo(snapshot.val());
                });
                // for (let i = 0; i < optionsArr.length; i++) {
                //   if (optionsArr[i] == value.Name) {
                //     alreadyFriends = true;
                //   }
                // }
                console.log(alreadyFriends);
                if (alreadyFriends === false) {
                  console.log("make following because you're not friends");
                  // add requestor to requested follower list
                  updates[`Users/${key}/Followers/${userId}`] = userName;
                  updates[`Users/${userId}/Following/${key}`] = value.Name;
                  console.log(updates);
                  update(ref(db), updates);
                }
                else {
                  console.log("you can't follow, you're already friends");
                }


              }
            });
            // // if they do then add inverse to friends
            // // if not, add this user to following
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
          options={optionsArr}
          placeholder="Choose a friend..."
          selected={singleSelections}
        />
      </Form.Group>
    </>
  );
}

export default TypeAhead;