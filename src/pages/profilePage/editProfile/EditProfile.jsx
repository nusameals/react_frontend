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
  Upload,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { mangga } from "../../../assets";
import { Link } from "react-router-dom";

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
          <Card className="card-edit-profile">
            <Form
            {...layout}
              className="container-edit-form"
            >
              <Row className="row-content-edit" justify="center" align="middle">
                <Col>
                  <Form.Item label="Username" name="username">
                    <Input
                      style={{ width: "320px" }}
                    ></Input>
                  </Form.Item>

                  <Form.Item label="Gender" name="gender">
                    <Radio.Group
                    >
                      <Space direction="horizontal">
                        <Radio value={"Male"}>Male</Radio>
                        <Radio value={"Female"}>Female</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        pattern: /^\d{11,12}$/,
                        message: "Phone number is not valid!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "320px" }}
                    />
                  </Form.Item>
                  <Space className="container-btn-edit-profile">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Link to="/profile-setting">
                      <Button type="danger">Cancel</Button>
                    </Link>
                  </Space>
                </Col>

                <Col className="col-img-profile">
                  <Row>
                    <Form.Item>
                      <Upload
                        showUploadList={false}
                        name="file"
                        maxCount={1}
                      >
                          <Button
                            className="btn-edit-admin-ava"
                            style={{ width:"252px" }}
                            icon={<img src={mangga} alt="avatar-profile" className="avatar-profile"/>}
                          />
                      </Upload>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Row>
    </>
  );
};

export default EditProfile;
