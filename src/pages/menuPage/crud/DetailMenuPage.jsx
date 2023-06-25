import React, { useState } from "react";
import "../menu.css";
import { Row, Col, Card, Button, Space, Breadcrumb, Modal } from "antd";
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { mangga } from "../../../assets";
import { useDeleteMenu, useGetMenuById } from "../hooks/useMenus";
import { useEffect } from "react";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";

const DetailMenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { confirm } = Modal;

  const [isLoadingMenuById, menuById, getMenuById] = useGetMenuById(id);
  const [isLoadingDeleteMenu, deleteMenu] = useDeleteMenu();

  useEffect(() => {
    getMenuById();
  }, []);

  console.log({ menuById });

  const onDelete = (id) => {
    // const newData = data.filter((item) => item.key !== row_key);
    // setData(newData);
    isLoadingDeleteMenu;
    deleteMenu(id);
    navigate(-1);
  };

  const showPromiseConfirm = () => {
    confirm({
      title: "Are you sure delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Click yes to continue.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            onDelete(id);
            resolve();
          }, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
      okButtonProps: {
        danger: "true",
      },
    });
  };
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
        <Card className="card-detail-menu">
          <Link to="/menu-page">
            <Button
              type="text"
              icon={<ArrowLeftOutlined style={{ padding: "0px" }} />}
              className="btn-back-menu"
            >
              Back
            </Button>
          </Link>
          {isLoadingMenuById ? (
            <LoadingComponent />
          ) : (
            menuById && (
              <Row className="row-content-detail-menu">
                <Col className="col-text-detail-menu">
                  <Row justify="start" className="name-detail-menu">
                    <span className="text-name">Name</span>
                    <span className="text-detail-menu-name">
                      {menuById.name}
                    </span>
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
                        <Link to="/edit-menu">
                          <Button type="primary" className="btn-action-menu">
                            Edit Menu
                          </Button>
                        </Link>
                        <Button
                          type="primary"
                          className="btn-action-menu"
                          danger
                          onClick={showPromiseConfirm}
                        >
                          Delete Menu
                        </Button>
                      </Row>
                    </Space>
                  </Row>
                </Col>
              </Row>
            )
          )}
        </Card>
      </Row>
    </>
  );
};

export default DetailMenuPage;
