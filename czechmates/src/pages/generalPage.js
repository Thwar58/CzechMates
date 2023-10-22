
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';

const GeneralPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                General
            </h1>
            <p>Image here</p>
            <InputWithLabel label={"Name"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"High Concept"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Trouble"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Aspect 1"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Aspect 2"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Fate Points"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Money"} placeholder={"Type here"} disabled={false}/>
            <Form.Label htmlFor="this">Description</Form.Label>
            <InputWithLabel label={"Physical Appearance"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Background"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Major Relationships"} placeholder={"Type here"} disabled={false}/>
            <InputWithLabel label={"Other"} placeholder={"Type here"} disabled={false}/>

        </div>
    );
};

export default GeneralPage;