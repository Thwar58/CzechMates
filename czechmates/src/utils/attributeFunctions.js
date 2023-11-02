const sample = require('./firebaseInfo.json');
// global for use across all the functions
// only used one of the character's information, would be given specific character in future
var skills = sample.Users[0].Characters[0].Skills;
var attributes = sample.Users[0].Characters[0].Attributes;

// https://stackoverflow.com/questions/62494929/how-to-execute-a-js-file-containing-multiple-functions-via-react-jsx
// exports.funA = () => {
//     console.log("This is from Function A");
// };

// https://stackoverflow.com/questions/18899873/multiple-functions-inside-variable
// these all use the global skills and attributes for ease right now, that will change in the future
var Func = {
    calcAwareness: function () {
        var awareness = skills.Burglary + skills.Hunting + 2 * skills.Shooting;
        console.log("awareness");
    },
    calcCharisma: function () {
        var charisma = skills.Burglary + skills.Deceive + skills.Rapport + skills.Stealth;
        console.log("charisma");
    },
    calcDefense: function () {
        var defense = skills.Engineering + skills.Fight + skills.Physique + skills.Stealth;
        console.log("defense");
    },
    calcEndurance: function () {
        var endurance = 2 * skills.Athletics + skills.Fight + skills.Survival;
        console.log("endurance");
    },
    calcHealth: function () {
        var health = skills.Alchemy + skills.Physique + 2 * skills.Survival;
        console.log("health");
    },
    calcKnowledge: function () {
        var knowledge = skills.Alchemy + skills.Engineering + 2 * skills.Lore;
        console.log("knowledge");
    },
    calcMagicAttack: function () {
        var magicAttack = skills.Arcana + skills.Deceive + skills.Rapport + skills.Will;
        console.log("magic attack");
    },
    calcMagicDefense: function () {
        var magicDefense = skills.Arcana + skills.Engineering + skills.Lore + skills.Will;
        console.log("magic defense");
    },
    calcMagicHeal: function () {
        var magicHeal = skills.Alchemy + skills.Deceive + 2 * skills.Empathy;
        console.log("magic heal");
    },
    calcMagicReach: function () {
        var magicReach = skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will;
        console.log("magic reach");
    },
    calcMeleeAttack: function () {
        var meleeAttack = skills.Fight + skills.Hunting + skills.Physique + skills.Survival;
        console.log("melee attack");
    },
    calcRangedAttack: function () {
        var rangedAttack = skills.Athletics + skills.Burglary + skills.Hunting + skills.Shooting;
        console.log("ranged attack");
    },
    calcMaxAP: function () {
        var maxAP = 2 + Math.floor((attributes.Knowledge + attributes.Endurance) * .2);
        console.log("max ap");
    },
    calcMaxVigor: function () {
        var maxVigor = 2 * (attributes['Magic Reach'] + attributes.Endurance) + 0; // change 0 to character level later
        console.log("max vigor");
    },
    calcMaxResolve: function () {
        var maxResolve = 2 * attributes.Health + 3 * 0; //change 0 to character level later
        console.log("max resolve");
    },
    calcMagicRange: function () {
        var magicRange = Math.floor(attributes['Magic Reach'] * .5);
        console.log("magic range");
    },
    calcMovement: function () {
        var movement = Math.floor(2 + (attributes.Awareness + attributes.Charisma + attributes.Endurance) * .1);
        console.log("movement");
    }
}


export default Func;