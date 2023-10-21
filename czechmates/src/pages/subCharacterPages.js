
import React from "react";
import ControlledTabs from "../components/Tabs";
import GeneralPage from "./generalPage";
import EquipmentPage from "./equipmentPage";
import SkillsPage from "./skillsPage";
import AttributesPage from "./attributesPage";
import SheetPage from "./sheetPage";

const SubCharacterPages = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Character Name
            </h1>
            <ControlledTabs text={["General", "Equipment", "Skills", "Attributes", "Sheet"]} 
            content={[<GeneralPage/>, <EquipmentPage/>, <SkillsPage/>, <AttributesPage/>, <SheetPage/>]} />
        </div>
    );
};

export default SubCharacterPages;