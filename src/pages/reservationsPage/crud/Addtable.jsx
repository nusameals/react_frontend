import React from "react";
// import "../menu.css";
import { Row, Col, Card, Button, Space, Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { mangga } from "../../../assets";

const AddTable = () => {
  return (
    <>
      <Row className="container-header-menu">
        <Breadcrumb
          items={[
            {
              title: "Reservations",
            },
            {
              title: "Reservation Data",
            },
            {
              title: "Create Data Table",
            },
          ]}
        />
        <span className="text-menuList">Create Data Table</span>
      </Row>
      <Row justify="center" align="middle" className="container-detail-menu-card">
        <Card className="card-detail-menu" >
          <Button
            type="text"
            icon={<ArrowLeftOutlined style={{ padding: "0px" }} />}
            className="btn-back-menu"
          >
            Back
          </Button>
          <Row className="row-content-detail-menu">
            <Col className="col-text-detail-menu">
              <Row justify="start" className="name-detail-menu">
                <span className="text-name">Name</span>
                <span className="text-detail-menu-name">Sate Maranggi & Es Jeruk</span>
              </Row>
              <Row className="role-detail-menu" justify="space-between">
                <Col>
                  <span className="text-name">Category</span>
                  <span className="text-detail-menu-name">Saving Package</span>
                </Col>
                <Col>
                  <span className="text-name">City</span>
                  <span className="text-detail-menu-name">Jakarta</span>
                </Col>
                <Col>
                  <span className="text-name">Calories</span>
                  <span className="text-detail-menu-name">215 kkal</span>
                </Col>
              </Row>
              <Row className="name-detail-menu">
                <span className="text-name">Price</span>
                <span className="text-detail-menu-name">Rp 17.000</span>
              </Row>
              <Row className="name-detail-menu">
                <span className="text-name">Description</span>
                <span className="text-detail-menu-name">Sate maranggi dan es jeruk ini merupakan salah satu makanan nusantara populer.</span>
              </Row>
              <Row className="name-detail-menu">
                <span className="text-name">Ingredients</span>
                <span className="text-detail-menu-name">Daging ayam, cabe rawit, bumbu kacang, kecap manis, acar, jeruk.</span>
              </Row>
            </Col>
            <Col className="col-img-detail-menu">
              <Row>
                <Space direction="vertical">
                  <img
                    src={mangga}
                    alt="avatar-detail-menu"
                    className="avatar-detail-menu"
                  />
                  <Row justify="space-between" align="middle">
                    <Button type="primary" className="btn-action-menu">Edit Menu</Button>
                    <Button type="primary" className="btn-action-menu" danger>Delete Menu</Button>
                  </Row>
                </Space>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default AddTable;
