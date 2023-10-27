
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
            <AttributesComp value={"5"} name={"Awareness"} />
            <AttributesComp value={"5"} name={"Charisma"} />
            <AttributesComp value={"5"} name={"Defense"} />
            <AttributesComp value={"5"} name={"Endurance"} />
            <AttributesComp value={"5"} name={"Health"} />
            <AttributesComp value={"5"} name={"Knowledge"} />
            <AttributesComp value={"5"} name={"Magic Attack"} />
            <AttributesComp value={"5"} name={"Magic Defense"} />
            <AttributesComp value={"5"} name={"Magic Heal"} />
            <AttributesComp value={"5"} name={"Magic Reach"} />
            <AttributesComp value={"5"} name={"Melee Attack"} />
            <AttributesComp value={"5"} name={"Ranged Attack"} />
            <AttributesComp value={"5"} name={"Max Action Points (AP)"} />
            <AttributesComp value={"5"} name={"Max Vigor"} />
            <AttributesComp value={"5"} name={"Max Resolve"} />
            <AttributesComp value={"5"} name={"Magic Range"} />
            <AttributesComp value={"5"} name={"Movement"} />
        </div>
    );
};

export default AttributesPage;