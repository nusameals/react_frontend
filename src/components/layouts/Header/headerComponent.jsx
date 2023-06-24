import React, { useState, useEffect } from "react";
import "./header.css";
import { Layout, Menu, Row, Button, Collapse } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { MENU_ITEM } from "../constants";
import { Link } from "react-router-dom";
import { Logo } from "../../../assets";
import classnames from "classnames";

const HeaderComponent = () => {
  const { Header } = Layout;
  const path = window.location.pathname;
  const [current, setCurrent] = useState(path);
  const [isScrolled, setIsScrolled] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Header className="head-container" style={{ 
      background:  isScrolled ? "#fff" : "transparent",
     }}>
      <Row justify="space-between" >
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
          style={{ 
            backgroundColor:  isScrolled ? "#fff" : "transparent",
           }}
          disabledOverflow
        />

        <Collapse ghost bordered={false} className="mobileVisible" style={{ width:"100%" }}>
          <Collapse.Panel
            header={
              <Row justify="space-between" style={{ width:"100%" }}>
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
            style={{ width:"100%" }}
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
