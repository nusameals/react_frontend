import React from "react";
import "../profile.css";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Space,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { mangga } from "../../../assets";

const EditProfile = () => {
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  return (
    <>
      <Row className="container-header-profile">
        <Breadcrumb
          items={[
            {
              title: "Profile",
            },
            {
              title: "My Profile",
            },
            {
              title: "Edit Profile",
            },
          ]}
        />
        <span className="text-edit-profile">Edit Profile</span>
      </Row>

      <Row justify="center" align="middle" className="container-profile-card">
        <Card className="card-profile">
          <Row className="row-content-profile" justify="center" align="middle">
            <Col>
              <Form {...layout} className="container-edit-form">
                <Form.Item label="Name" name="name">
                  <Input style={{ width: "320px" }} />
                </Form.Item>

                <Form.Item label="Role" name="role">
                  <Radio.Group>
                    <Space direction="horizontal">
                      <Radio value={"Admin"}>Admin</Radio>
                      <Radio value={"Cashier"}>Cashier</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Gender" name="gender">
                  <Radio.Group>
                    <Space direction="horizontal">
                      <Radio value={"Male"}>Male</Radio>
                      <Radio value={"Female"}>Female</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                <Form.Item label="Username" name="username">
                  <Input style={{ width: "320px" }} />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      pattern: /^\d{11}$/,
                      message: "Phone number is not valid!",
                    },
                  ]}
                >
                  <Input style={{ width: "320px" }} />
                </Form.Item>
                <Space className="container-btn-edit-profile">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Button type="danger">Cancel</Button>
                </Space>
              </Form>
            </Col>

            <Col className="col-img-profile">
              <Row>
                <img
                  src={mangga}
                  alt="avatar-profile"
                  className="avatar-profile"
                />
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
    </>
  );
};

export default EditProfile;
