import React from 'react';
import logo from '../NUDGE_Logo.png';

/**
 * Purpose: a component for the home page
 * Params: none
 */
const Home = ({ }) => {

    /**
     * Purpose: renders the home page
     * Params/Dependencies: 
     */
    return (
        <div className='text-center fullWindow'>
            {/* the nudge image and welcome message */}
            <div>
                <h1 className={'text-color-yellow mb-5 text-center'}>Welcome to the NUDGE TTRPG aid</h1>
            </div>
            <div><img style={{ width: '50vh', mb: '3' }} src={logo} alt="Logo" /></div>
        </div>
    );
}


export default Home;