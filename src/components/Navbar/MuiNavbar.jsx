import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import DiamondIcon from "@mui/icons-material/Diamond";
import Link from "@mui/icons-material/Link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Switch } from "@mui/material";
import { NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";

import "./MuiNavbar.css";

// access to all
const pages = [
  {
    label: "Home",
    url: ROUTES.HOME,
  },
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  {
    label: "FAV CARDS",
    url: ROUTES.FAVCARDS,
  },
  {
    label: <AccountCircleIcon />,
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

//admin/biz pages
const adminPages = [
  {
    label: "SANDBOX",
    url: ROUTES.SANDBOX,
  },
];
const bizPages = [
  {
    label: "MY CARDS",
    url: ROUTES.MYCARDS,
  },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const isAdmin = useSelector((bigState) => bigState.authSlice.isAdmin);
  const isBiz = useSelector((bigState) => bigState.authSlice.isBiz);
  console.log("biz = " + isBiz);
  console.log("admin = " + isAdmin);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  // dispatch(authActions.isAdmin());
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <DiamondIcon />
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", md: "inline" } }}
          >
            LOGO
          </Typography>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isBiz
              ? bizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isAdmin
              ? adminPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
          </Box>
          {isLoggedIn
            ? authedPages.map((page) =>
                page.url === ROUTES.LOGOUT ? (
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={logoutClick}
                  />
                ) : (
                  <NavLinkComponent key={page.url} {...page} />
                )
              )
            : notAuthPages.map((page) => (
                <NavLinkComponent key={page.url} {...page} />
              ))}
          <SearchPartial />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? (
                <DarkModeIcon
                  sx={{
                    fontSize: "2rem",
                    mt: 1,
                  }}
                />
              ) : (
                <LightModeIcon
                  sx={{
                    fontSize: "2rem",
                    mt: 1,
                  }}
                />
              )}
            </Typography>
          </Box>
          <Switch checked={isDarkTheme} onChange={changeTheme} />
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLink to={page.url}>
                    {/* if the current page and the link is the same then it will change the color of the link */}
                    {({ isActive }) => (
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: `${isActive ? "red" : ""}`,
                        }}
                      >
                        {page.label}
                      </Typography>
                    )}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
