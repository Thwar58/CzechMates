
import React from "react";
import SkillsComp from "../components/SkillsComp";

// this component houses the content for the character skills
const SkillsPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Skills
            </h1>
            {/* future: we can change the button words to arrow icons
            and split them into two divs side by side
            we might need to change these to be their own components 
            for the onclick methods or we can pass in the method to 
            use, which might be better
            add value in between the buttons somehow later*/}
            {/* future: generate dynamically instead of hardcoding */}
            <SkillsComp value={"Alchemy"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Arcana"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Athletics"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Burglary"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Deceive"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Empathy"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Engineering"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Fight"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Hunting"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Lore"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Physique"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Rapport"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Shooting"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Stealth"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Survival"} button1={"up arrow"} button2={"down arrow"} />
            <SkillsComp value={"Will"} button1={"up arrow"} button2={"down arrow"} />
        </div>
    );
};

export default SkillsPage;