// https://ericgio.github.io/react-bootstrap-typeahead/

import { useState } from 'react';
// import {Form} from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update, get, child } from "firebase/database";
import * as emailjs from 'emailjs-com';


const TypeAhead = ({ optionInfo, action, userId, userName, worldCode, setPremadeChosen }) => {
  const [singleSelections, setSingleSelections] = useState([]);
  var [optionsArr, setOptionsArr] = useState([]);
  // var [dbInfo, setDBInfo] = useState();


  // distinguish which typeahead we are using here, get all users if profile, whenever a selection is made,
  // check follower list and update accordingly
  useEffect(() => {
    console.log("options info has changed: ", optionInfo);
    // console.log("see it change", optionInfo);
    if (optionInfo !== undefined) {
      // console.log("friendinfo ", friendInfo);
      var arr = [];
      if (optionInfo !== null) {
        if (action === "sendWorldInvite") {
          // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          for (const [key, value] of Object.entries(optionInfo)) {
            // console.log(key, value);
            // pass in the key, the character name, and the id of who created the character
            arr.push(value);
            // console.log("look here?", value);
          }
          setOptionsArr(arr);
        }
        else if (action === "follow") {
          for (const [key, value] of Object.entries(optionInfo)) {
            // console.log(key, value);
            // pass in the key, the character name, and the id of who created the character
            if (value.Name !== userName) {
              arr.push(value.Name);
            }

            // console.log("look here ", value);
          }
          setOptionsArr(arr);
        }
        else if (action === "choose character"){
          console.log("join world");
          console.log(optionsArr);
          var arr = [];
           for (const [key, value] of Object.entries(optionInfo)) {
            // console.log(key, value);
            // pass in the key, the character name, and the id of who created the character
            if (value.Participation === undefined) {
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
    console.log("options arr has changed: ", optionsArr);

  }, [optionsArr]);

  useEffect(() => {
    console.log("selection has changed: ", singleSelections);
    if (singleSelections.length !== 0) {
      // console.log("this was selected from the typeahead: ", singleSelections);

      if (action === "sendWorldInvite") {
        for (const [key, value] of Object.entries(optionInfo)) {
          if (value == singleSelections) {
            console.log("send this user a join code email: ", key);
            get(child(ref(db), `Users/${userId}/Name`)).then((snapshot) => {
              console.log("check", snapshot.val());
              const senderName = snapshot.val();

              get(child(ref(db), `Users/${key}/Email`)).then((snapshot) => {
                console.log("check", snapshot.val());
                const memberEmail = snapshot.val();

              
                  const actualParams = {
                    member: value,
                    code: worldCode,
                    sender: senderName,
                    email: memberEmail
                  };
                  console.log(actualParams);


                  // emailjs.send('service_5lol5zu', 'template_fumphwg',   
                  // actualParams, 'nCCc6oQB6cd4n0ljl')
                  //     .then((result) => {
                  //       console.log(e.target);
                  //         alert('email sent successfully');
                  //     }, (error) => {
                  //         alert('error sending email');
                  //     });


              }).catch((error) => {
                console.error(error);
              });

            }).catch((error) => {
              console.error(error);
            });



          }
        }
      }
      else if (action === "follow") {
        // console.log("follow this user");
        setSingleSelections([]);
        // console.log("HOW DO I TURN THIS OFFFF  ", singleSelections);
        var there = false;
        var id;
        var OtherName;
        for (const [key, value] of Object.entries(optionInfo)) {
          // console.log("iterated item", optionInfo);
          if (value.Name == singleSelections) {
            there = true;
            id = key;
            OtherName = value.Name
            break;
          }
        }

        if (there === true) {
          // console.log("You selected this user", OtherName, singleSelections);
          // const userRef = ref(db, `Users/${id}/Following`);
          // console.log("follow this user: ", key, value);
          // check if this user follows you already
          // console.log("check id right before", id);
          // console.log(`Users/${id}/Following`)
          get(child(ref(db), `Users/${id}/Following`)).then((snapshot) => {

            // console.log("requested user info ", snapshot.val());
            var present = false;
            if (snapshot.val() !== null) {
              // console.log("this is in onValue, it should be triggered once")
              // setSingleSelections([]);
              if (snapshot.val()[userId] !== undefined) {
                present = true;
              }


            }

            const updates = {};
            if (present === true) {
              // remove requester from requested follower list
              updates[`Users/${id}/Followers/${userId}`] = null;
              updates[`Users/${userId}/Followers/${id}`] = null;
              updates[`Users/${id}/Following/${userId}`] = null;
              // add requestor to requested friends list
              updates[`Users/${id}/Friends/${userId}`] = userName;
              // add requested to requestor friends list
              updates[`Users/${userId}/Friends/${id}`] = OtherName;
              // console.log(updates);
              update(ref(db), updates);
            }
            // this part is working
            else if (present === false) {
              // console.log("potential follower")
              // add following
              var alreadyFriends = false;

              const currentUser = ref(db, `Users/${userId}/Friends`);
              onValue(currentUser, (snapshot) => {
                // console.log(snapshot.val());
                // console.log(key);
                if (snapshot.val() !== null) {
                  if (snapshot.val()[id] !== undefined) {
                    alreadyFriends = true;
                  }
                }

              });
              // console.log(alreadyFriends);
              if (alreadyFriends === false) {
                // console.log("make following because you're not friends");
                // add requestor to requested follower list
                updates[`Users/${id}/Followers/${userId}`] = userName;
                updates[`Users/${userId}/Following/${id}`] = OtherName;
                // console.log(updates);
                update(ref(db), updates);
              }
              else {
                // console.log("you can't follow, you're already friends");
              }


            }

          }).catch((error) => {
            console.error(error);
          });

        }
      }
      if(action === "choose character"){
        // send back the character that is chosen
        for (const [key, value] of Object.entries(optionInfo)) {
            if (value.Name === singleSelections[0]){
              setPremadeChosen({key: key, value: value.Name});
            }
        }
      }
      else {
        setSingleSelections([]);
      }
      

    }

    // console.log(worldInfo);
  }, [singleSelections]);





  return (
    <>
      <Form.Group>
        {/* <Form.Label>Search here</Form.Label> */}
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"

          options={optionsArr}
          placeholder="Choose a friend..."
          selected={singleSelections}
          onChange={setSingleSelections}
        />
      </Form.Group>
    </>
  );
}

export default TypeAhead;