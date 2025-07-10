import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { motion } from "framer-motion";
import { Route, Routes, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { getAllStories } from "../../app";
import { StoryCard } from "./StoryCard";

const drawerWidth = 240;
const navItems = [
  "Landing Page",
  "Chapter Page",
  "Sign In",
  "Sign Up",
  "Profile Page",
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchField = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function PageLayout(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await getAllStories();
      const data = response.filter((story) =>
        story.story_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(data);
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navRoutes = {
    "Chapter Page": "/chapter",
    "Sign In": "/signin",
    "Sign Up": "/signup",
    "Profile Page": "/profile",
    "Landing Page": "/",
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Your Username
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => navigate(navRoutes[item])}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTitleClick = (story) => {
  navigate(`/chapters/${story._id}`);
  setSearchQuery("");
  setSearchResults([]);

  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{ display: "flex", bgcolor: "background.default", minHeight: "auto" }}
    >
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#124ba1" }}>
        {" "}
        {/* navbar colour (blue) */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
                {searchResults.map((story) => (
                  <Button
                    key={story._id}
                    onClick={() => handleTitleClick(story)}
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
                    {story.story_title}
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
              onChange={handleSearchChange}
            />
          </Search>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/")}>
              Landing Page
            </Button>
            {/* <Button sx={{ color: "#fff" }} onClick={() => navigate("/chapter")}>
              Chapter Page
            </Button> */}
            {/* not really needed anymore tbh */}
            
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/profile")}>
              Profile Page
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#124ba1",
              color: "#fff",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />

          {props.children}
        </Box>
      </motion.div>
    </Box>
  );
}

export default PageLayout;
