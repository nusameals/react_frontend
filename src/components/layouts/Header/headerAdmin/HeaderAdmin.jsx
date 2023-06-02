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
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import { sateayam } from "../../../../assets";

const HeaderAdmin = () => {
  const { Header } = Layout;
  const key = "updatable";

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      key,
      message: "Notification Title",
      description: "description.",
    });
    setTimeout(() => {
      api.open({
        key,
        message: "New Title",
        description: "New description.",
      });
    }, 1000);
  };

  return (
    <>
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
          <Row style={{ width: "118px", height: "42px" }}>
            <Col span={12} className="container-col-admin">
              <img src={sateayam} className="admin-avatar" alt="" />
            </Col>
            <Col span={12} className="container-col-admin">
              <span className="nama-admin">Ahmad</span>
              <span className="status-admin">Admin</span>
            </Col>
          </Row>
        </Row>
      </Header>
    </>
  );
};

export default HeaderAdmin;
