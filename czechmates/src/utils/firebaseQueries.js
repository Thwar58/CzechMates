import { db } from '../firebase';
import { child, get, ref, set } from "firebase/database";

// this didnt do well cause of the useffect nonsense, you have to put the function in the useffect itself for to work
var DBFunctions = {

    // https://firebase.google.com/docs/database/web/read-and-write
    writeFakeUserData: function (userId, name, email, imageUrl) {
        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    },
    // writeFakeUserData("1", "2", "3", "4");


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

    // writeUserData("User3", "False", "user3@gmail.com", ["F1"], ["F2"], ["F3"], "Dark", "User3");


    writeWorldData: function (userId, inviteCode, members, name, schedule) {
        set(ref(db, 'Worlds/' + userId + "/Worlds"),
            {
                Invite_Code: inviteCode,
                Members: members,
                Name: name,
                Schedule: schedule
            });
    },

    // writeWorldData("User3", "code4", ["M1", "M2"], "world2 (3)", "Sundays at 5");


    // I got lazy and only did the minimum in general but the rest should be the same
    writeCharacterData: function (userID, charId, name, concept) {
        set(ref(db, 'Characters/' + userID + "/" + charId + "/General"),
            {
                Name: name,
                High_Concept: concept
            });
    },

    // writeCharacterData("User3", "CharID1", "Char1", "rogue");



    // https://firebase.google.com/docs/database/web/read-and-write
    // read data
    readUserData: function (userId) {
        const dbRef = ref(db);
        var data = null;
        get(child(dbRef, `Users/` + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                // console.log("snapshot ", snapshot.val());
                // console.log("data: ", data);
                return data;
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    },

    // readUserData("User1");

    readWorldData: function (userId) {
        const dbRef = ref(db);
        var data = null;
        get(child(dbRef, `Worlds/` + userId)).then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                // console.log("snapshot ", snapshot.val());
                // console.log("data: ", data);
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


