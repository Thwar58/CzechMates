// https://ericgio.github.io/react-bootstrap-typeahead/
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue, update, get, child } from "firebase/database";
import * as emailjs from 'emailjs-com';

/**
 * Purpose: the component for the typeahead, used in the profile page and some world popups for selections of users and characters
 * Params: 
 * optionInfo: JSON object, carries information to populate the choices and relevent metadata
 * action: string, the type of typeahead (choose character, send world invite, etc)
 * userId: string, the user's id
 * userName: string, the current user's username, used in the following section
 * worldCode: int, the code for a world
 * setPremadeChosen: JSON object, the character information for the join world popup typeahead selection
 */
const TypeAhead = ({ optionInfo, action, userId, userName, worldCode, setPremadeChosen }) => {
  // useStates to handle the selection in the typeahead
  var [placeholder, setPlaceholder] = useState("");
  const [singleSelections, setSingleSelections] = useState([]);
  // useState to set the options of the typeahead
  var [optionsArr, setOptionsArr] = useState([]);


  /**
   * Purpose: sets the options for the typeahead based on the use for the specific typeahead
   * Params/Dependencies: 
   * optionInfo:
   * action
   * userName
   */
  useEffect(() => {
    if (optionInfo !== undefined) {
      var arr = [];
      if (optionInfo !== null) {
        // if this typeahead is being used for sending invite codes
        if (action === "sendWorldInvite") {
          setPlaceholder("Choose a friend to invite");
          // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
          // add their friends to the options
          for (const [key, value] of Object.entries(optionInfo)) {
            arr.push(value);
          }
          setOptionsArr(arr);
        }
        // if this typeahead is being used for following a user
        else if (action === "follow") {
          setPlaceholder("Search for another user by name")
          // add all of the usernames except the current user to the options
          for (const [key, value] of Object.entries(optionInfo)) {
            if (value.Name !== userName) {
              arr.push(value.Name);
            }
          }
          setOptionsArr(arr);
        }
        // if the typeahead is being used to select a character to join the world
        else if (action === "choose character") {
          setPlaceholder("Choose from your characters who aren't already in a world")
          var arr = [];
          // add the characters who aren't already in a world to the options
          for (const [key, value] of Object.entries(optionInfo)) {
            if (value.Participation === undefined) {
              arr.push(value.Name);
            }
          }
          setOptionsArr(arr);
        }
      }
    }

  }, [optionInfo]);


  /**
   * Purpose: handles the actions when the user selects something from the typeahead
   * Params/Dependencies: 
   * action
   * optionInfo
   * worldCode
   * userId
   */
  useEffect(() => {
    // if a selection has actually been made
    if (singleSelections.length !== 0) {
      // if the user is sending a world invite
      if (action === "sendWorldInvite") {
        // go through the options and get the metadata for the selection
        for (const [key, value] of Object.entries(optionInfo)) {
          if (value == singleSelections) {
            // the name of the current user
            get(child(ref(db), `Users/${userId}/Name`)).then((snapshot) => {
              const senderName = snapshot.val();
              // get the email of the person who was selected in the typeahead
              get(child(ref(db), `Users/${key}/Email`)).then((snapshot) => {
                const memberEmail = snapshot.val();

                // set up the parameters for the email 
                const actualParams = {
                  member: value,
                  code: worldCode,
                  sender: senderName,
                  email: memberEmail
                };

                // delete this later
                // console.log(actualParams);

                // comment this back in at the end
                emailjs.send('service_5lol5zu', 'template_fumphwg',   
                actualParams, 'nCCc6oQB6cd4n0ljl')
                    .then((result) => {
                        alert('email sent successfully');
                    }, (error) => {
                        alert('error sending email');
                    });

              }).catch((error) => {
                console.error(error);
              });
            }).catch((error) => {
              console.error(error);
            });
          }
        }
      }
      // if the user is trying to follow another user
      else if (action === "follow") {
        // clear the selection to prevent an issue where the selection would stay the same and immediately
        // refollow someone if you unfollowed them right after you followed them
        setSingleSelections([]);
        // some variables used to track the information of the user you are trying to follow
        var there = false;
        var id;
        var OtherName;
        // find the user metadata in the options and save out the info
        for (const [key, value] of Object.entries(optionInfo)) {
          if (value.Name == singleSelections) {
            there = true;
            id = key;
            OtherName = value.Name
            break;
          }
        }
        // if the user is found in the database (used to prevent errors if a user was removed incorrectly)
        if (there === true) {
          // get the following list of the user this user wants to follow
          get(child(ref(db), `Users/${id}/Following`)).then((snapshot) => {
            // check if the current user is in their following list as well
            var present = false;
            if (snapshot.val() !== null) {
              if (snapshot.val()[userId] !== undefined) {
                present = true;
              }
            }
            const updates = {};
            // if the user is in their following list, then these users should be mutal followers, and therefore friends
            if (present === true) {
              // remove current user from the other user's follower list
              updates[`Users/${id}/Followers/${userId}`] = null;
              updates[`Users/${userId}/Followers/${id}`] = null;
              updates[`Users/${id}/Following/${userId}`] = null;
              // add current user to the other user's friends list
              updates[`Users/${id}/Friends/${userId}`] = userName;
              // add current user to other users friends list
              updates[`Users/${userId}/Friends/${id}`] = OtherName;
              update(ref(db), updates);
            }
            // if the current user is not in the other user's following, then they are either already friends
            // or it is a one sided following on the current user's part
            else if (present === false) {
              // check if the current user has the other user in their friends list
              var alreadyFriends = false;
              const currentUser = ref(db, `Users/${userId}/Friends`);
              onValue(currentUser, (snapshot) => {
                if (snapshot.val() !== null) {
                  if (snapshot.val()[id] !== undefined) {
                    alreadyFriends = true;
                  }
                }
              });
              // if not, then add the current user as a follower and update the other user's followers list
              if (alreadyFriends === false) {
                updates[`Users/${id}/Followers/${userId}`] = userName;
                updates[`Users/${userId}/Following/${id}`] = OtherName;
                update(ref(db), updates);
              }
            }
          }).catch((error) => {
            console.error(error);
          });
        }
      }
      // if the user is choosing a character for a world
      if (action === "choose character") {
        // set premadechosen to the selections information and send it back to the join world popup
        for (const [key, value] of Object.entries(optionInfo)) {
          if (value.Name === singleSelections[0]) {
            setPremadeChosen({ key: key, value: value.Name });
          }
        }
      }
      // clear the selection just in case, again we have had issues previously with this
      else {
        setSingleSelections([]);
      }
    }
  }, [singleSelections]);




  /**
   * Purpose: renders the typeahead and it's options
   * Params/Dependencies: 
   * optionsArr
   * placeholder
   * singleSelections
   */
  return (
    <>
      <Form.Group>
        {/* the typeahead */}
        <Typeahead
          id="basic-typeahead-single"
          labelKey="name"
          // the options in the typeahead
          options={optionsArr}
          placeholder={placeholder}
          // the current selection and the function that sets it
          selected={singleSelections}
          onChange={setSingleSelections}
        />
      </Form.Group>
    </>
  );
}

export default TypeAhead;