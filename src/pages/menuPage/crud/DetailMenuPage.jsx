import React from "react";
import "../menu.css";
import { Row, Col, Card, Button, Space, Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { mangga } from "../../../assets";
import { useGetMenuById } from "../hooks/useMenus";
import { useEffect } from "react";

const DetailMenuPage = () => {
  const { id } = useParams();

  const [isLoadingMenuById, menuById, getMenuById] = useGetMenuById(id);

  useEffect(() => {
    getMenuById();
  }, []);

  console.log({ menuById });

  return (
    <>
      <Row className="container-header-menu">
        <Breadcrumb
          items={[
            {
              title: "Menus",
            },
            {
              title: "Menu Detail",
            },
          ]}
        />
        <span className="text-menuList">Menu Detail</span>
      </Row>
      <Row
        justify="center"
        align="middle"
        className="container-detail-menu-card"
      >
        <Card className="card-detail-menu" >
          <Link to="/menu-page">
            <Button
              type="text"
              icon={<ArrowLeftOutlined style={{ padding: "0px" }} />}
              className="btn-back-menu"
            >
              Back
            </Button>
          </Link>
          {menuById && (
            <Row className="row-content-detail-menu">
              <Col className="col-text-detail-menu">
                <Row justify="start" className="name-detail-menu">
                  <span className="text-name">Name</span>
                  <span className="text-detail-menu-name">{menuById.name}</span>
                </Row>
                <Row className="role-detail-menu" justify="space-between">
                  <Col>
                    <span className="text-name">Category</span>
                    <span className="text-detail-menu-name">
                      {menuById.category}
                    </span>
                  </Col>
                  <Col>
                    <span className="text-name">City</span>
                    <span className="text-detail-menu-name">
                      {menuById.city}
                    </span>
                  </Col>
                  <Col>
                    <span className="text-name">Calories</span>
                    <span className="text-detail-menu-name">
                      {menuById.calories} kkal
                    </span>
                  </Col>
                </Row>
                <Row className="name-detail-menu">
                  <span className="text-name">Price</span>
                  <span className="text-detail-menu-name">
                    Rp {menuById.price}
                  </span>
                </Row>
                <Row className="name-detail-menu">
                  <span className="text-name">Description</span>
                  <span className="text-detail-menu-name">
                    {menuById.description}
                  </span>
                </Row>
                <Row className="name-detail-menu">
                  <span className="text-name">Ingredients</span>
                  <span className="text-detail-menu-name">
                    {menuById.ingredients}
                  </span>
                </Row>
              </Col>
              <Col className="col-img-detail-menu">
                <Row>
                  <Space direction="vertical">
                    <img
                      src={menuById.images}
                      alt="avatar-detail-menu"
                      className="avatar-detail-menu"
                    />
                    <Row justify="space-between" align="middle">
                      <Button type="primary" className="btn-action-menu">
                        Edit Menu
                      </Button>
                      <Button type="primary" className="btn-action-menu" danger>
                        Delete Menu
                      </Button>
                    </Row>
                  </Space>
                </Row>
              </Col>
            </Row>
          )}
        </Card>
      </Row>
    </>
  );
};

export default DetailMenuPage;
