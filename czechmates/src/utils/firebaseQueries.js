import { db } from '../firebase';
import { child, get, ref, set, push } from "firebase/database";


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
    }
}

export default DBFunctions;


