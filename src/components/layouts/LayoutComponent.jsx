import React, { useState } from "react";
import "./layout.css";
import { Layout, Button, Collapse, Menu, Row } from "antd";
import FooterComponent from "./Footer/footerComponent";
import HeaderComponent from "./Header/headerComponent";
import SiderComponent from "./Sider/SiderComponent";
// import HeaderAdminComponent from "./Header/HeaderAdminComponent";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import HeaderAdmin from "./Header/headerAdmin/HeaderAdmin";

const LayoutComponent = ({ children }) => {
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <Layout>
      {!token ? (
        <>
          {/* Header */}
          <HeaderComponent />

          {/* Content */}
          <Content
            className="site-layout"
            style={{
              padding: "0px",
            }}
          >
            <div
              style={{
                padding: 0,
                minHeight: 380,
                background: "#fff",
              }}
            >
              {children}
            </div>
          </Content>

          {/* Footer */}
          <FooterComponent />
        </>
      ) : (
        <>
          <SiderComponent />
          <Layout>
            {/* Header */}
            <HeaderAdmin />

            {/* Content */}
            <Content
              className="site-layout"
              style={{
                padding: "48px 0px 0px 200px",
              }}
            >
              <div
                style={{
                  padding: 0,
                  minHeight: 380,
                  background: "#fafafa",
                }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default LayoutComponent;
