
import React from "react";
import AttributesComp from "../components/AttributesComp";

// this component houses the content for the character attributes
const AttributesPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Attributes
            </h1>
            {/* future: split into two sections (ref. Func. Spec.) */}
            {/* future: generate dynamically instead of hardcoding */}
            <AttributesComp value={"Awareness"} />
            <AttributesComp value={"Charisma"} />
            <AttributesComp value={"Defense"} />
            <AttributesComp value={"Endurance"} />
            <AttributesComp value={"Health"} />
            <AttributesComp value={"Knowledge"} />
            <AttributesComp value={"Magic Attack"} />
            <AttributesComp value={"Magic Defense"} />
            <AttributesComp value={"Magic Heal"} />
            <AttributesComp value={"Magic Reach"} />
            <AttributesComp value={"Melee Attack"} />
            <AttributesComp value={"Ranged Attack"} />
            <AttributesComp value={"Max Action Points (AP)"} />
            <AttributesComp value={"Max Vigor"} />
            <AttributesComp value={"Max Resolve"} />
            <AttributesComp value={"Magic Range"} />
            <AttributesComp value={"Movement"} />
        </div>
    );
};

export default AttributesPage;