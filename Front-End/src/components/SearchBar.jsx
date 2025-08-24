import { React, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { getAllStories, getUser, getAllUsers } from "../../app";
import {
  Search,
  SearchIconWrapper,
  SearchField,
} from "../styles/searchBarStyle";
import useDebounce from "../custom hooks/Debouncer";
import { color } from "framer-motion";

export const SearchBar = ({ useCase }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debounceSearchQuery = useDebounce(searchQuery, 700);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!debounceSearchQuery) return setSearchResults([]);

      let data =
        useCase === "Search Stories"
          ? await getAllStories()
          : await getAllUsers(); // if not search stories then search users instead

      if (useCase !== "Search Stories" && !Array.isArray(data)) {
        data = Object.values(data); // i converted the object to an array because users come as an obj
      }

      const field = useCase === "Search Stories" ? "story_title" : "username";

      const filtered = data.filter((item) =>
        item[field]?.toLowerCase().includes(debounceSearchQuery.toLowerCase())
      );

      setSearchResults(filtered);
      // console.log('fetchData function in SearchBar.jsx called')
    };

    fetchData();
  }, [debounceSearchQuery, useCase]);

  const handleClick = (item) => {
    if (useCase === "Search Stories") {
      navigate(`/chapters/${item._id}`);
    } else {
      navigate(`/profile/${item._id}`);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const field = useCase === "Search Stories" ? "story_title" : "username";

  return (
    <Search>
      {searchQuery && searchResults.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "56px",
            left: 0,
            right: 0,
            bgcolor: "background.paper",
            boxShadow: 3,
            zIndex: 1300,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {searchResults.map((item) => (
            <Button
              key={item._id}
              onClick={() => handleClick(item)}
              sx={{
                display: "block",
                width: "100%",
                textAlign: "left",
                px: 2,
                py: 1,
                textTransform: "none",
                color: "text.primary",
              }}
            >
              {item[field]}
            </Button>
          ))}
        </Box>
      )}

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchField
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Search>
  );
};
