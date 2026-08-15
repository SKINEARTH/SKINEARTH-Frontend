import { NavLink } from "react-router-dom";

import homeOn from "../assets/nav/home_on.svg";
import homeOff from "../assets/nav/home_off.svg";

import logOn from "../assets/nav/log_on.svg";
import logOff from "../assets/nav/log_off.svg";

import predictionOn from "../assets/nav/prediction_on.svg";
import predictionOff from "../assets/nav/prediction_off.svg";

import missionOn from "../assets/nav/mission_on.svg";
import missionOff from "../assets/nav/mission_off.svg";

import myOn from "../assets/nav/my_on.svg";
import myOff from "../assets/nav/my_off.svg";

import {
  NavContainer,
  NavItem,
  IconBox,
  NavIcon,
  NavLabel,
} from "../styles/NavBar.styles";

const navItems = [
  {
    path: "/home",
    label: "홈",
    onIcon: homeOn,
    offIcon: homeOff,
    onSize: "3.4rem",
    offSize: "1.8rem",
  },
  {
    path: "/log",
    label: "기록",
    onIcon: logOn,
    offIcon: logOff,
    onSize: "3.4rem",
    offSize: "1.8rem",
  },
  {
    path: "/prediction",
    label: "예측",
    onIcon: predictionOn,
    offIcon: predictionOff,
    onSize: "3.4rem",
    offSize: "1.8rem",
  },
  {
    path: "/mission",
    label: "미션",
    onIcon: missionOn,
    offIcon: missionOff,
    onSize: "3.4rem",
    offSize: "1.8rem",
  },
  {
    path: "/my",
    label: "마이",
    onIcon: myOn,
    offIcon: myOff,
    onSize: "3.4rem",
    offSize: "1.8rem",
  },
];

const NavBar = () => {
  return (
    <NavContainer>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={{ textDecoration: "none" }}
        >
          {({ isActive }) => (
            <NavItem>
              <IconBox>
                <NavIcon
                  src={isActive ? item.onIcon : item.offIcon}
                  alt={item.label}
                  $size={isActive ? item.onSize : item.offSize}
                />
              </IconBox>

              <NavLabel $active={isActive}>
                {item.label}
              </NavLabel>
            </NavItem>
          )}
        </NavLink>
      ))}
    </NavContainer>
  );
};

export default NavBar;