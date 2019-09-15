import React from "react";
import NextIcon from "./icons/next";
import BrowseIcon from "./icons/browse";
import PlayingIcon from "./icons/playing";
import SubmitIcon from "./icons/submit";
import HomeIcon from "./icons/home";
import { Link } from "react-router-dom";

const NavButton = (props) => {
  const { link, icon, active } = props;
  return (
    <Link to={link} className={`nav-button ${active ? '-is-active' : ''}`}>
      {icon === "home" && <HomeIcon />}
      {icon === "next" && <NextIcon />}
      {icon === "browse" && <BrowseIcon />}
      {icon === "playing" && <PlayingIcon />}
      {icon === "submit" && <SubmitIcon />}
    </Link>
  );
};

export default NavButton;
