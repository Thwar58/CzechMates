import { db } from '../firebase';
import { child, ref, push, update } from "firebase/database";

/**
 * Purpose: a JSOn object that stores some of the database functions that we use throughout the website
 * Params: none
 */
var DBFunctions = {

    /**
     * Purpose: creates a new character in the database
     * Params:
     * template: JSON object, a blank template for a character
     * userId: string, the user's id
     * charName: string, the character's name
     */
    newCreateNewCharacter: function (charTemplate, userId, charName) {
        // make a new key in the database
        const newPostKey = push(child(ref(db), 'posts')).key;
        // add the character to the database with the correct information 
        const updates = {};
        updates['Characters/' + newPostKey] = charTemplate;
        updates[`CharacterUserRel/${userId}/${newPostKey}`] = {
            "Name": charName,
            "Level": 0,
            "Last_Used": Date.now()
        };
        update(ref(db), updates);
        return newPostKey;
    },

    /**
    * Purpose: creates a new user in the database
    * Params:
    * userTemplate: JSON object, the blank template for a user
    * uid: int, the user id from the google oauth sign in
    * Email: string, teh user's email
    * Name: string, the user's name from the google oauth sign in
    */
    createNewUser: function (userTemplate, uid, Email, Name) {
        // create a new user and set their information into the template
        // use the uid as the key in the database
        userTemplate.Name = Name;
        userTemplate.Email = Email;
        const updates = {};
        updates['Users/' + uid] = userTemplate;
        update(ref(db), updates);
    },

    /**
    * Purpose: creates a new world and adds it to the database
    * Params:
    * worldTemplate: JSON object, the blank template for the world
    * userId: string, the user's id
    * inviteCode: int, the invite code for the world
    */
    createNewWorld: function (worldTemplate, userId, inviteCode) {
        // make a unique key
        const newPostKey = push(child(ref(db), 'posts')).key;
        // give the world the correct information
        worldTemplate.Invite_Code = inviteCode;
        worldTemplate.CreatorId = userId;
        // update the database with this new world
        const updates = {};
        updates['Worlds/' + newPostKey] = worldTemplate;
        updates[`WorldUserRel/${userId}/Created/${newPostKey}`] = "";
        update(ref(db), updates);
        return newPostKey;
    },
}

export default DBFunctions;


