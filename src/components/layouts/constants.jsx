import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Header/header.css"

export const MENU_ITEM = [
  {
    label: "Home",
    key: "1",
  },
  {
    label: "Services",
    key: "2",
  },
  {
    label: "Menus",
    key: "3",
  },
  {
    label: "Contact",
    key: "4",
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
