import React from "react";
import NavButton from "./nav-button";

const TopNav = (props) => {
  const { active } = props;
  return (
    <div className="top-nav">
      <NavButton active={active === "home"} link={`/${props.hash}`} icon="home" />
      <NavButton active={active === "playing"} link={`/playing/${props.hash}`} icon="playing" />
      <NavButton active={active === "browse"} link={`/browse/${props.hash}`} icon="browse" />
      <NavButton active={active === "submit"} link={`/submit/${props.hash}`} icon="submit" />
    </div>
  );
}

export default TopNav;

