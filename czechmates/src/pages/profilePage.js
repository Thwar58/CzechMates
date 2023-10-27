import React from "react";
import User from "../components/User";
import ControlledTabs from '../components/Tabs';
import Searchbar from '../components/Searchbar';
import { useState } from "react";
import TypeAhead from "../components/TypeAhead";
import Spacer from '../components/Spacer';
import TypeAheadWithButton from "../components/TypeAheadWithButton";
import Social from '../components/Social';

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
            {/* future: generate dynamically instead of hardcoding */}
            {/* future: pass information in */}
            <User label={"Username"} content={"Filler username"} />
            <User label={"Email"} content={"Filler email"} />
            <h1 style={{ color: "green" }}>
                Social
            </h1>
            {/* future: choose one search bar and remove the rest */}
            {/* search bar options start here */}
            {/* <Searchbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}
                        <button type="button" className="btn btn-primary">Follow</button>
                    </li>
                ))}
            </ul>
            <Spacer /> */}
            {/* <TypeAhead />
            <Spacer /> */}
            <TypeAheadWithButton />
            {/* end search bar options */}

            {/* tabs for the friends, following, and followers */}
            {/* hardcoded social components for now */}
            <ControlledTabs text={["Friends", "Following", "Followers"]}
                content={[[<Social content={"Sample Name"} />], [<Social content={"Sample Name"} />, <Social content={"Sample Name"} />], [<Social content={"Sample Name"} />, <Social content={"Sample Name"} />, <Social content={"Sample Name"} />]]} />
        </div>
    );
};

export default ProfilePage;