
import React from "react";
import ControlledTabs from "../components/Tabs";
import GeneralPage from "./generalPage";
import EquipmentPage from "./equipmentPage";
import SkillsPage from "./skillsPage";
import AttributesPage from "./attributesPage";
import SheetPage from "./sheetPage";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

// a page that contains all of the sub character pages as tabs (i.e. equipment, general)
const SubCharacterPages = () => {
    // handles page changes
    const navigate = useNavigate();
    const navigateToCharPage = () => {
        // navigate to /characterPage
        navigate('/charactersPage');
    }
    // returns a div with the character name and the tabs for each of the pages
    return (
        <div>
            {/* title */}
            <h1 style={{ color: "green" }}>
                Character Name
            </h1>
            {/* tabs for each page, passing in the labels and the page objects */}
            <ControlledTabs text={["General", "Equipment", "Skills", "Attributes", "Sheet"]}
                content={[<GeneralPage />, <EquipmentPage />, <SkillsPage />, <AttributesPage />, <SheetPage />]} />
            {/* a button that redirects to the character page when clicked */}
            <Button onClick={navigateToCharPage}>Done</Button>
        </div>
    );
};

export default SubCharacterPages;