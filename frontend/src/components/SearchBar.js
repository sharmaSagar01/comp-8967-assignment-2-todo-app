import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/SearchBar.css";
const SearchBar = ({ tasks, setTasks }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let searchQuery = searchInput;
    let user = localStorage.getItem("email");
    try {
      let resp = await fetch(
        `${process.env.REACT_APP_API_URL}/api/searchTodo/search?` +
          new URLSearchParams({
            searchQuery,
            user,
          }).toString(),
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let data = await resp.json();

      setTasks([...data]);
      // window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo_search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="todo_search"
          placeholder="Enter the item to Search..."
          value={searchInput}
          onChange={handleSearchInput}
        />

        <button className="todo_search_button" type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
