import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { logOutUserAsync, selectLogged, selectIsStaff, selectToken, selectUserName, selectUser_id, getProfileAsync, selectIsSuperuser } from "../../Slices/loginSlice";
import { setAdminStand } from '../../Slices/standsSlice'

import "../../StyleSheets/Header.css";
import ModalCart from "../Cart/ModalCart"
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MuseumRoundedIcon from '@mui/icons-material/MuseumRounded';
import MuseumTwoToneIcon from '@mui/icons-material/MuseumTwoTone';
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import {
  selectStandCartProds, emptyCart
} from "../../Slices/standCartSlice";

// This component is the header of the project.
// It is serves as navigation bar that is being updated accoring to the user type and the url.
function Header() {
  const dispatch = useDispatch();
  const currentUrl = useLocation();
  const StandCartProds = useSelector(selectStandCartProds);
  const token = useSelector(selectToken);
  const logged = useSelector(selectLogged);
  const user_id = useSelector(selectUser_id);
  const is_staff = useSelector(selectIsStaff);
  const is_superuser = useSelector(selectIsSuperuser);
  const username = useSelector(selectUserName);

  const logoutAndUpdates = () => {
    dispatch(logOutUserAsync(token))
    dispatch(emptyCart())
  }

  return (
    <div className="mainDiv">
      <header className="header">
        <nav className="nav">
          {/* <div className="search_header">{pathname === "/" && <SearchBar />}</div> */}
          <Link to={"/"} className="logo">
            <Tooltip title="Farmers Market">
              <IconButton>
                <AgricultureOutlinedIcon
                  sx={{ fontSize: 33 }}
                  color="secondary"
                />
              </IconButton>
            </Tooltip>
          </Link>

          <div style={{ position: "relative", left: "110px" }}>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <h1 style={{ position: "relative" }}>
                <span style={{ fontSize: "40px" }} className='h1_FarmerMarketOnline'>Farmer's Market
                  <span className='h1_Online '> Online</span
                  ></span>
              </h1>
            </Link>
          </div>

          <div className="icon_Shopping_box">
            {/* If the current url is of the products page, show the cart button: */}
            {currentUrl.pathname.includes('shoppingprods') == true && StandCartProds !== [] &&
              <ModalCart />}

            {/* if the user is not logged, show the login/registration buttons, els show the logout button */}
            {logged ? (
              <>
                <Avatar sx={{ bgcolor: deepPurple[400], color: "rgba(241,229,214,255)", width: "160px", borderRadius: "20%" }} >
                  Hello {username.charAt(0).toUpperCase() + username.slice(1)}
                </Avatar>

                <Link to={"/"} className="mark_icon_box">
                  <button
                    className="invisible-button"
                    onClick={() => logoutAndUpdates()}>
                    <Tooltip title="Logout">
                      <IconButton>
                        <LogoutOutlinedIcon
                          sx={{ fontSize: 33 }}
                          color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </button>
                </Link>

                {!is_superuser && (
                  <Link to={"/userinfo"} className="Link">
                    <Tooltip title="Personal Details">
                      <IconButton onClick={() => dispatch(getProfileAsync(user_id))}>
                        <AccountCircleIcon
                          sx={{ fontSize: 33 }}
                          color="secondary"
                        />
                      </IconButton>
                    </Tooltip>
                  </Link>)}
              </>
            ) : (
              <>
                <Link to={"/auth/login"} className="Link">
                  <Tooltip title="Login">
                    <IconButton>
                      <LoginOutlinedIcon
                        sx={{ fontSize: 33 }}
                        color="secondary"
                      />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Link to={"/auth"} className="Link">
                  <Tooltip title="Signup">
                    <IconButton>
                      <CreateIcon sx={{ fontSize: 33 }} color="secondary" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </>
            )}

            {is_staff && !is_superuser && (
              <Link to={"/standadmin"} className="Link">
                <Tooltip title="Stand Manager">
                  <IconButton onClick={() => dispatch(setAdminStand(user_id))}>
                    <MuseumRoundedIcon
                      sx={{ fontSize: 33 }}
                      color="secondary"
                    />
                  </IconButton>
                </Tooltip>
              </Link>
            )}

            {logged && is_superuser && (
              <Link to={"/webadmin"} className="Link">
                <Tooltip title="Manage">
                  <IconButton>
                    <MuseumTwoToneIcon
                      sx={{ fontSize: 33 }}
                      color="secondary"
                    />
                  </IconButton>
                </Tooltip>
              </Link>)}

          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
