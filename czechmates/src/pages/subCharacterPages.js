
import React from "react";
import ControlledTabs from "../components/Tabs";
import GeneralPage from "./generalPage";
import EquipmentPage from "./equipmentPage";
import SkillsPage from "./skillsPage";
import AttributesPage from "./attributesPage";
import SheetPage from "./sheetPage";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const SubCharacterPages = () => {

    const navigate = useNavigate();

    const navigateToCharPage = () => {
        // 👇️ navigate to /contacts
        navigate('/charactersPage');
    }
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Character Name
            </h1>
            <ControlledTabs text={["General", "Equipment", "Skills", "Attributes", "Sheet"]} 
            content={[<GeneralPage/>, <EquipmentPage/>, <SkillsPage/>, <AttributesPage/>, <SheetPage/>]} />
            <Button onClick={navigateToCharPage}>Done</Button>
        </div>
    );
};

export default SubCharacterPages;