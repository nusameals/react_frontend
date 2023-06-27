import React, { useState } from "react";
import "./headerAdmin.css";
import {
  Layout,
  Row,
  Col,
  Button,
  notification,
  Divider,
  Badge,
  Space,
  Dropdown,
} from "antd";
import {
  ArrowLeftOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { mangga, sateayam } from "../../../../assets";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
  const { Header } = Layout;
  const namaAdmin = localStorage.getItem("username");
  const key = "updatable";

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      key,
      description: (
        <Row style={{ marginBottom: "0px" }}>
          <img src={mangga} alt="" style={{ width: "44px", height: "44px" }} />
          <ul className="grid-order">
            <li>New Order</li>
            <p className="grid-username">12345 - trinadavis</p>
          </ul>
          <Divider className="divider-notif" />
          <img src={mangga} alt="" style={{ width: "44px", height: "44px" }} />
          <ul className="grid-order">
            <li>New Order</li>
            <p className="grid-username">12345 - trinadavis</p>
          </ul>
        </Row>
      ),
      style: { top: 35, right: 130 },
    });
  };

  const items = [
    {
      label: (
        <Link to="/profile-setting">
          <Button type="text" x icon={<SettingOutlined />}>
            Profile Setting
          </Button>
        </Link>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link
          to="/"
          reloadDocument
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
          }}
        >
          <Button
            type="text"
            style={{ color: "red" }}
            icon={
              <ArrowLeftOutlined
                style={{ borderLeft: "2px solid red", color: "red" }}
              />
            }
          >
            Sign Out
          </Button>
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <Header className="header-admin-container">
      <Row justify="end" align="middle" className="container-admin-profile">
        {contextHolder}
        <Badge
          className="badger-notif"
          count={10}
          offset={[-6, 12]}
          size="small"
          onClick={openNotification}
        >
          <BellOutlined className="btn-notif" />
        </Badge>
        <Divider type="vertical" className="separator-header-admin" />

        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <Row
            className="btn-profile-dropdown"
            style={{ width: "118px", height: "42px" }}
            onClick={(e) => e.preventDefault()}
          >
            <Col span={12} className="container-col-admin">
              <img src={sateayam} className="admin-avatar" alt="" />
            </Col>
            <Col span={12} className="container-col-admin">
              <Row justify="center" align="middle">
                <span className="nama-admin">{namaAdmin}</span>
              </Row>
            </Col>
          </Row>
        </Dropdown>
      </Row>
    </Header>
  );
};

export default HeaderAdmin;
