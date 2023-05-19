import { Layout, Menu, Row, Button } from "antd";
import React, { useState } from "react";
import { MENU_ITEM } from "../constants";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets";
import "./header.css";

const HeaderComponent = () => {
  const { Header } = Layout;
  const path = window.location.pathname;
  const [current, setCurrent] = useState(path);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        paddingTop: 0,
      }}
    >
      <Row justify="space-between">
        <Link to="/">
          <Row>
            <img
              src={Logo}
              alt="logo"
              style={{
                float: "left",
                width: 40,
                height: 40,
                margin: "13px 10px 13px 200px",
                background: "rgba(255, 255, 255, 0.2)",
              }}
              onClick={() => setCurrent("")}
            />
            <span
              type="text"
              className="logo-text"
            >
              Nusameals
            </span>
          </Row>
        </Link>
        <Menu
          theme="light"
          mode="horizontal"
          items={MENU_ITEM}
          disabledOverflow
          onClick={onClick}
          selectedKeys={[current]}
          className="nav-menu"
        />
      </Row>
    </Header>
  );
};

export default HeaderComponent;
