
import React from "react";
import Dropdown from "../components/Dropdown";
import Character from "../components/Character";
import { Routes, Route, useNavigate } from 'react-router-dom';
import SubCharacterPages from './subCharacterPages';


const CharactersPage = () => {

    const navigate = useNavigate();

    const navigateToGeneral = () => {
        // 👇️ navigate to /contacts
        navigate('/subCharacterPages');
    }


        return (
            <div>
                <h1 style={{ color: "green" }}>
                    Character List
                </h1>
                <Dropdown text="Order by..." actions={["level", "recently used", "alphabetically"]} />
                <Character />
                <Character />
                <Character />
                <Character />
                <h1>
                    <button onClick={navigateToGeneral} type="button" className="btn btn-primary">Plus sign icon</button>
                </h1>

            </div>
        );
    };

    export default CharactersPage;