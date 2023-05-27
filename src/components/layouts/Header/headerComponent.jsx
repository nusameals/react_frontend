import React, { useState } from "react";
import "./header.css";
import { Layout, Menu, Row, Button, Collapse } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { MENU_ITEM } from "../constants";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets";

const HeaderComponent = () => {
  const { Header } = Layout;
  const path = window.location.pathname;
  const [current, setCurrent] = useState(path);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header className="head-container">
      <Row justify="space-between">
        <Link to="/" className="logoHidden">
          <Row className="brand">
            <img
              src={Logo}
              alt="logo"
              className="logo-image"
              onClick={() => setCurrent("")}
            />
            <span type="text" className="logo-text">
              Nusameals
            </span>
          </Row>
        </Link>
        <Menu
          theme="light"
          mode="horizontal"
          items={MENU_ITEM}
          onClick={onClick}
          selectedKeys={[current]}
          className="mobileHidden"
          disabledOverflow
        />

        <Collapse ghost bordered={false} className="mobileVisible">
          <Collapse.Panel
            header={
              <Row justify="space-between">
                <Link to="/">
                  <Row className="brand">
                    <img
                      src={Logo}
                      alt="logo"
                      className="logo-image"
                      onClick={() => setCurrent("")}
                    />
                    <span type="text" className="logo-text">
                      Nusameals
                    </span>
                  </Row>
                </Link>
                <Button
                  type="primary"
                  icon={<MenuOutlined />}
                  className="btn-bread"
                />
              </Row>
            }
            key="1"
            showArrow={false}
          >
            <Menu
              theme="light"
              mode="vertical"
              items={MENU_ITEM}
              onClick={onClick}
              selectedKeys={[current]}
              className="menu-bread"
            />
          </Collapse.Panel>
        </Collapse>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
