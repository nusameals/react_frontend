import React, { useState } from "react";
import "./sider.css";
import { Layout, Menu, Button, Row, Divider } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SIDER_ITEM } from "../constants";

const SiderComponent = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const path = window.location.pathname;
  const [current, setCurrent] = useState(path);

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Sider
        className="sider-container"
        style={{ position:"fixed", zIndex:"999", height:"100%" }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {collapsed ? (
          <Row justify="center" align="middle" className="container-btn-fold">
            <Button
              type="text"
              onClick={() => setCollapsed(!collapsed)}
              icon={<MenuUnfoldOutlined />}
              className="btn-collapse-fold"
            />
          </Row>
        ) : (
          <Row
            justify="space-between"
            align="middle"
            onClick={() => setCollapsed(!collapsed)}
            className="logo-admin-collapse"
          >
            <Button
              type="text"
              icon={<MenuFoldOutlined />}
              className="btn-collapse-sider"
            />
            <span type="text" className="text-logo-collapse">
              Nusameals
            </span>
          </Row>
        )}
        <div className="divider-sider">
          <Divider className="divider-length" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[current]}
          items={SIDER_ITEM}
          onClick={onClick}
        />
      </Sider>
    </>
  );
};

export default SiderComponent;
