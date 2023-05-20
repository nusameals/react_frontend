import React from "react";
import { Layout, Row, Col, Space } from "antd";
import "./footer.css";


const FooterComponent = () => {
  const { Footer } = Layout;
  return (
    <Footer
      style={{
        textAlign: "center",
        background: "#0669BD",
      }}
    >

        <Row justify="center" align="middle">
          <Col xs={24} sm={24} md={20} lg={16} xl={16}>
            <Space direction="vertical">
              <span className="footer-text">© 2023 NusaMeals</span>
            </Space>
          </Col>
        </Row>
    </Footer>
  );
};

export default FooterComponent;
