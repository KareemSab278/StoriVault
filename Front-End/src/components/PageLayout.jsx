import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getUser } from "../../app";
import { SearchBar } from "./SearchBar";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/authSlice";

const navItems = [
  "Landing Page",
  "Sign In",
  "Sign Up",
  "Profile Page",
  "Create a Story",
];

function PageLayout(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearUser());
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin");
  };
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signedInUser, setSignedInUser] = useState("guest user");

  useEffect(() => {
    const updateSignedInUser = async () => {
      const username = await getUser("685c5539c5cf817cd3d809b4"); // the username is hardcoded so change it by getting the signed in user later (waiting for sign in to be implemented)
      setSignedInUser(username.username);
    };
    updateSignedInUser();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navRoutes = {
    "Chapter Page": "/chapter",
    "Sign In": "/signin",
    "Sign Up": "/signup",
    "Profile Page": "/profile",
    "Landing Page": "/",
    "Create a Story": "/newstory",
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {signedInUser ? signedInUser : "Guest User"}
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
        {/* {"custom text"} */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* <SearchBar useCase="Search Stories" /> */}
          <SearchBar useCase="Search Stories" />

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
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
            <Button sx={{ color: "#fff" }} onClick={() => navigate("/profile")}>
              Profile Page
            </Button>
            <Button
              sx={{ color: "#fff" }}
              onClick={() => navigate("/newstory")}
            >
              Create a Story
            </Button>
            <Button sx={{ color: "#fff" }} onClick={handleSignOut}>
              Sign Out
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
const drawerWidth = 240;
export default PageLayout;
