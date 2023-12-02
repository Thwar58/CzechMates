import { db } from '../firebase';
import { child, get, ref, set, push, onValue, update } from "firebase/database";


var DBFunctions = {

    // https://firebase.google.com/docs/database/web/read-and-write
    // add a user to the database
    writeUserData: function (userId, adminStatus, email, followers, following, friends, mode, name) {
        set(ref(db, 'Users/' + userId), {
            Admin_Status: adminStatus,
            Email: email,
            Followers: followers,
            Following: following,
            Friends: friends,
            Light_Mode: mode,
            Name: name
        });
    },

    // add a world to the database (future: possibly change to template)
    writeWorldData: function (userId, worldId, inviteCode, members, name, schedule) {
        set(ref(db, 'Worlds/' + userId + "/" + worldId),
            {
                Invite_Code: inviteCode,
                Members: members,
                Name: name,
                Schedule: schedule
            });
    },

    // add a character to the database (used for copy as well as addition)
    createNewCharacter: function (userID, charTemplate) {
        const newPostKey = push(child(ref(db), 'posts')).key;
        set(ref(db, 'Characters/' + userID + "/" + newPostKey),
            charTemplate
        );
        return newPostKey;
    },

    // add a character to the database (used for copy as well as addition)
    newCreateNewCharacter: function (charTemplate, userId, charName) {
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['Characters/' + newPostKey] = charTemplate;
        updates[`CharacterUserRel/${userId}/${newPostKey}`] = 
        {
            Level: 0,
            Name: charName
        };
        // const newPostKey = push(child(ref(db), 'posts')).key;
        update(ref(db), updates);
        return newPostKey;
    },

     // add a character to the database (used for copy as well as addition)
     createNewWorld: function (worldTemplate, userId) {
        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['Worlds/' + newPostKey] = worldTemplate;
        updates[`WorldUserRel/${userId}/Created/${newPostKey}`] = "";
        // const newPostKey = push(child(ref(db), 'posts')).key;
        update(ref(db), updates);
        return newPostKey;
    },

    //   // add a character to the database (used for copy as well as addition)
    //   newCreateCopy: function (charTemplate, userId, charId) {
    //     // Get a key for a new Post.
    //     const newPostKey = push(child(ref(db), 'posts')).key;

    //     // Write the new post's data simultaneously in the posts list and the user's post list.
    //     const updates = {};
    //     updates['ZaraTest/Characters/' + newPostKey] = charTemplate;
    //     updates[`ZaraTest/CharacterUserRel/${userId}/${charId}`] = charName;
    //     // const newPostKey = push(child(ref(db), 'posts')).key;
    //     set(ref(db, 'ZaraTest/Characters/' + newPostKey),
    //         charTemplate
    //     );z
    // // add a character to the database (used for copy as well as addition)
    // updateRel: function (userId, charId, charName) {
    //     set(ref(db, `ZaraTest/CharacterUserRel/${userId}/${charId}`),
    //         charName
    //     );
    // },

    // you pass in the path to what you want to remove and it sets it to null, which removes it from the database
    removeFromDB: function (path) {
        set(ref(db, path),
            null
        );
    },

    // you pass in the path to what you want to remove and it sets it to the value you provide
    // future: potentially combine remove and edit
    editInDB: function (path, value) {
        set(ref(db, path),
            value
        );
    },

    // https://firebase.google.com/docs/database/web/read-and-write
    // read user data
    readUserData: function (userId) {
        const dbRef = ref(db);
        var data = null;
        get(child(dbRef, `Users/` + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                return data;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },

    // read world data
    readWorldData: function (userId) {
        const dbRef = ref(db);
        var data = null;
        get(child(dbRef, `Worlds/` + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                return data;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },

    readCharacterData: function (charId) {
        const charRef = ref(db, 'Characters/' + charId);
        var result;
        onValue(charRef, (snapshot) => {
            console.log(snapshot.val());
            result = snapshot.val();
        });
        return result;
    }
}

export default DBFunctions;


