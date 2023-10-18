import React from "react";
import User from "../components/User";
import ControlledTabs from '../components/Tabs';
import Searchbar from '../components/Searchbar';
import { useState } from "react";
import TypeAhead from "../components/TypeAhead";
import Spacer from '../components/Spacer';
import OtherTypeAhead from '../components/OtherTypeAhead';


const ProfilePage = () => {
    const posts = [
        { id: '1', name: 'This first post is about React' },
        { id: '2', name: 'This next post is about Preact' },
        { id: '3', name: 'We have yet another React post!' },
        { id: '4', name: 'This is the fourth and final post' },
    ];

    

    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }
    
        return posts.filter((post) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };
    
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Account information
            </h1>
            <User/>
            <User/>
           
            <h1 style={{ color: "green" }}>
                Social
            </h1>
            
            <Searchbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>
            <Spacer/>
            <TypeAhead/>
            <Spacer/>
            <OtherTypeAhead/>

            <ControlledTabs text = {["Friends", "Following", "Followers"]} 
            // content = {["Friends", "Following", "Followers"]}/>
            // this line below is what is leading to that error message in the console, 
            // it is because the users do not have distinguishing information yet, that
            // will be remidied when we pull in actual information instead of using dummies
            content = {[[<User/>], [<User/>, <User/>], [<User/>, <User/>, <User/>]]}/>

        </div>
    );
};

export default ProfilePage;