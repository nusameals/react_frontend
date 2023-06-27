import React, { useEffect, useState } from "react";
import {
  Button,
  Space,
  Col,
  Row,
  Card,
  Radio,
  Carousel,
  Rate,
  Input,
  Form,
  Checkbox,
  Modal,
  Alert,
} from "antd";
import {
  ForgetPass,
  LoginIcon,
  NewPass,
  NusaMealsLogin,
  maintenance,
} from "../../assets";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./loginPage.css";
import Gap from "../../components/gap/gap";
// import Gap from "../../components/gap/Gap";
import { useLogin } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../homePage/query";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isLoading, login] = useLogin();

  const onLogin = (values) => {
    login(values, () => {
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 3000);
    });
  };

  return (
    <div className="login-page">
      <Card
        style={
          isMobile
            ? { width: "600px", height: "1200px" }
            : { width: "1040px", height: "686px" }
        }
        className="card-login"
      >
        <Row className="row-login">
          <Col md={12} sm={24}>
            <img
              className="md:w-32"
              src={LoginIcon}
              alt="icon-login"
              style={{ width: 500, height: 500 }}
            />
          </Col>
          <Col md={12} sm={24}>
            <div className="col-right">
              <div className="logo">
                <Gap height={50} />
                <img
                  src={NusaMealsLogin}
                  alt="logo"
                  style={{ width: 251, height: 51 }}
                  className="logo-login md:text-left"
                />
                <Gap height={13.5} />
                <p className="text-login">
                  Let’s sign in to your NusaMeals account
                </p>
              </div>
              <Gap height={24} />
              <Form name="login-form" form={form} onFinish={onLogin}>
                <Form.Item
                  name="email_or_username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "#0669BD" }} />}
                    placeholder="Username"
                    className="input-form"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#0669BD" }} />}
                    placeholder="Password"
                    className="input-form"
                  />
                </Form.Item>
                <div className="remember-me">
                  <a onClick={showModal}>Forgot your password?</a>
                </div>
                <Gap height={24} />
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                  style={{ width: 436, height: 40 }}
                >
                  Sign in
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Modal
          footer={null}
          open={isModalOpen}
          onCancel={handleCancel}
          width={864}
        >
          <div className="modal-repass">
            <h1>Sorry, this feature is under maintenance!</h1>
            <img
              src={maintenance}
              alt="forget-pass"
              style={{ width: 369, height: 320 }}
            />
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default LoginPage;
