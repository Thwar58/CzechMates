// https://www.emgoto.com/react-search-bar/

// DISCARD

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
    </form>
);

export default SearchBar;