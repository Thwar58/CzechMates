
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';

// this component houses the content for the general character info
const GeneralPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                General
            </h1>
            {/* future: actually have an image here not a placeholder */}
            <p>Image here</p>
            {/* future: generate dynamically instead of hardcoding */}
            {/* each one is editable and has a label as well as a placeholder value */}
            <InputWithLabel label={"Name"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"High Concept"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Trouble"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Aspect 1"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Aspect 2"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Fate Points"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Money"} placeholder={"Type here"} disabled={false} />
            {/* the description section is labeled individually */}
            <Form.Label htmlFor="this">Description</Form.Label>
            <InputWithLabel label={"Physical Appearance"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Background"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Major Relationships"} placeholder={"Type here"} disabled={false} />
            <InputWithLabel label={"Other"} placeholder={"Type here"} disabled={false} />
        </div>
    );
};

export default GeneralPage;