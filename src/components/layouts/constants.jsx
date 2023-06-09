import { Button } from "antd";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import "./Header/header.css";

export const MENU_ITEM = [
  {
    label: (
      <ScrollLink to="heroback" smooth={true} duration={500} offset={-65}>
        Home
      </ScrollLink>
    ),
    key: "home",
  },
  {
    label: (
      <ScrollLink to="services" smooth={true} duration={500} offset={-65}>
        Services
      </ScrollLink>
    ),
    key: "services",
  },
  {
    label: (
      <ScrollLink to="menu" smooth={true} duration={500} offset={-65}>
        Menu
      </ScrollLink>
    ),
    key: "menu",
  },
  {
    label: (
      <ScrollLink to="contact" smooth={true} duration={500} offset={-65}>
        Contact
      </ScrollLink>
    ),
    key: "contact",
  },
  {
    label: (
      <Link to="/">
        <Button shape="round" size="middle" className="btn-get">
          Get the app
        </Button>
      </Link>
    ),
    key: "5",
  },
];
