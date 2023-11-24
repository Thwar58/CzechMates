const sample = require('./firebaseInfo.json');
// global for use across all the functions for ease right now
// only used one of the character's information, would be given specific character in future
// future: these will be passed into the functions individually
var skills = sample.Users[0].Characters[0].Skills;
var attributes = sample.Users[0].Characters[0].Attributes;
var level = sample.User[0].Characters[0].General.Level;

// https://stackoverflow.com/questions/18899873/multiple-functions-inside-variable
// these all use the global skills and attributes for ease right now, that will change in the future
// future: decide how to map these functions to attributes and recalculating
var Func = {
    calcAwareness: function () {
        attributes.Awareness = skills.Burglary + skills.Hunting + 2 * skills.Shooting;
        console.log("awareness");
    },
    calcCharisma: function () {
        attributes.Charisma = skills.Burglary + skills.Deceive + skills.Rapport + skills.Stealth;
        console.log("charisma");
    },
    calcDefense: function () {
        attributes.Defense = skills.Engineering + skills.Fight + skills.Physique + skills.Stealth;
        console.log("defense");
    },
    calcEndurance: function () {
        attributes.Endurance = 2 * skills.Athletics + skills.Fight + skills.Survival;
        console.log("endurance");
    },
    calcHealth: function () {
        attributes.Health = skills.Alchemy + skills.Physique + 2 * skills.Survival;
        console.log("health");
    },
    calcKnowledge: function () {
        attributes.Knowledge = skills.Alchemy + skills.Engineering + 2 * skills.Lore;
        console.log("knowledge");
    },
    calcMagicAttack: function () {
        attributes['Magic Attack'] = skills.Arcana + skills.Deceive + skills.Rapport + skills.Will;
        console.log("magic attack");
    },
    calcMagicDefense: function () {
        attributes['Magic Defense'] = skills.Arcana + skills.Engineering + skills.Lore + skills.Will;
        console.log("magic defense");
    },
    calcMagicHeal: function () {
        attributes['Magic Heal'] = skills.Alchemy + skills.Deceive + 2 * skills.Empathy;
        console.log("magic heal");
    },
    calcMagicReach: function () {
        attributes['Magic Reach'] = skills.Alchemy + skills.Empathy + skills.Rapport + skills.Will;
        console.log("magic reach");
    },
    calcMeleeAttack: function () {
        attributes['Melee Attack'] = skills.Fight + skills.Hunting + skills.Physique + skills.Survival;
        console.log("melee attack");
    },
    calcRangedAttack: function () {
        attributes['Ranged Attack'] = skills.Athletics + skills.Burglary + skills.Hunting + skills.Shooting;
        console.log("ranged attack");
    },
    calcMaxAP: function () {
        attributes['Max Action Points (AP)'] = 2 + Math.floor((attributes.Knowledge + attributes.Endurance) * .2);
        console.log("max ap");
    },
    calcMaxVigor: function () {
        attributes['Max Vigor'] = 2 * (attributes['Magic Reach'] + attributes.Endurance) + level; // change 0 to character level later
        console.log("max vigor");
    },
    calcMaxResolve: function () {
        attributes['Max Resolve'] = 2 * attributes.Health + 3 * level; //change 0 to character level later
        console.log("max resolve");
    },
    calcMagicRange: function () {
        attributes['Magic Range'] = Math.floor(attributes['Magic Reach'] * .5);
        console.log("magic range");
    },
    calcMovement: function () {
        attributes.Movement = Math.floor(2 + (attributes.Awareness + attributes.Charisma + attributes.Endurance) * .1);
        console.log("movement");
    }
}


export default Func;