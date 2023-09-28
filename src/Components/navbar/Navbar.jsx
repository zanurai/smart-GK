import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProfileContext } from "../Contexapi";
import { getExamList, removeTokenFormStorage } from "../../srcapi/Api";
import { ProfileImageContext } from "./ProfileImageProvider";

import "../../headerstyles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const { profile, isLoading } = useContext(ProfileContext);

  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileName, setProfileName] = useState("");
  const [fixedNavbar, setFixedNavbar] = useState(true);
  // const searchParams = new URLSearchParams(location.search);
  // const setid = searchParams.get("setid");
  const { setid } = useParams();//useParams only shows path param  and urlSearchparam shows search param

  useEffect(() => {
    console.log("setid inside useEffect:", setid);
  }, [setid]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isEditProfile = location.pathname === "/editprofile";
  const isDashBoard = location.pathname === "/";
  const showEditProfile = !isEditProfile;
  const showDashBoard = !isDashBoard;

  const { profileImage } = useContext(ProfileImageContext);

  useEffect(() => {
    if (profile) {
      setProfileName(profile?.name);
    }
  }, [profile]);

  const handleLogout = () => {
    toast.success("Logout successful", { position: "top-right" });
    removeTokenFormStorage();
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  };

  const handleDashboard = () => {
    navigate("/");
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  // const determineCurrentPage = () => {
  //   const pathName = window.location.pathname;
  //   if (pathName === "/examroles") {
  //     return "examroles";
  //     // } else if (pathName === "/editprofile") {
  //     //   return "/editprofile";
  //     // } else if (pathName === "/") {
  //     //   return "/";
  //     // } else if (pathName === "/changepassword") {
  //     //   return "/changepassword";
  //     // } else if (pathName === "/result") {
  //     //   return "/result";
  //     // } else if (pathName === "/exam") {
  //     //   return "/exam";
  //   } else {
  //     return pathName;
  //   }
  // };

  const determineCurrentPage = () => {
    const pathName = window.location.pathname;

    const validPaths = [
      "/",
      location.pathname.startsWith("/examroles/"),
      "/editprofile",
      "/changepassword",
    ];

    if (validPaths.includes(pathName)) {
      return pathName;
    } else {
      return "other";
    }
  };

  const handleScroll = () => {
    console.log("Scroll position:", window.scrollY);
    const currentPage = determineCurrentPage();
    if (
      currentPage === "/" ||
      location.pathname.startsWith("/examroles/") ||
      currentPage === "/editprofile" ||
      currentPage === "/changepassword"
    ) {
      if (window.scrollY > 0) {
        setIsNavbarFixed(true);
      } else {
        setIsNavbarFixed(false);
      }
    } else {
      setIsNavbarFixed(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  //});
  // return () => {
  //   window.removeEventListener("scroll", handleScroll);
  // };

  const navbarStyles = {
    position: isNavbarFixed ? "fixed" : "relative",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 100,
  };

  return (
    <>
      <div id="navbar-id" className="cl-header">
        <div style={navbarStyles}>
          <Container>
            <div className="navbar-container d-flex">
              <div className="entranceexam-header">
                <div className="navbar-image-logo d-flex">
                  <Avatar
                    sx={{ width: 75, height: 75, marginRight: "10px" }}
                    aria-label="recipe"
                  >
                    <img
                      src="/image/colg-logo.png"
                      alt="college log"
                      onClick={handleClickLogo}
                      onError={(e) => {
                        console.error("Error loading image:", e);
                      }}
                    />
                  </Avatar>
                  <span className="logo-text ml-auto">College</span>
                </div>
              </div>

              <div className="header-right">
                <Box className="student-profile">
                  <IconButton
                    className="icon-button"
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <div className="profile-student-image d-flex">
                      <Avatar sx={{ width: 40, height: 40 }}>
                        <img
                          src={profileImage}
                          alt="student profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Avatar>

                      {isLoading ? (
                        <div className="loading-spinner">Loading...</div>
                      ) : (
                        <span className="name">{profile?.name}</span>
                      )}
                      <span>
                        <KeyboardArrowDownIcon />
                      </span>
                    </div>
                  </IconButton>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {showEditProfile && (
                    <Link to="/editprofile" className="profile">
                      <MenuItem
                        onClick={handleClose}
                        className="avatar-profile"
                      >
                        <AccountCircleIcon
                          style={{
                            color: "gray",
                          }}
                        />
                        Profile
                      </MenuItem>
                    </Link>
                  )}
                  <Divider />
                  {showDashBoard && (
                    <MenuItem onClick={handleDashboard}>
                      <ListItemIcon>
                        <DashboardIcon
                          fontSize="small"
                          // style={{ width: "20px", height: "20px" }}
                        />
                      </ListItemIcon>
                      Dashboard
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" style={{ marginLeft: "5px" }} />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};
export default Navbar;
