import React, { useEffect, useState } from 'react';
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
} from 'antd';
import { ForgetPass, LoginIcon, NewPass, NusaMealsLogin } from '../../assets';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './loginPage.css';
import Gap from '../../components/gap/Gap';
import { useLogin } from './hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [form] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate()

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isLoading, login] = useLogin();

  const onLogin = (values) => {
    login(values, () => {
      navigate('/dashboard')
    });
  };

  return (
    <div className="login-page">
      <Card style={{ width: 1040, height: 686 }} className="card-login">
        <Row className="row-login">
          <Col xl={12} sm={24}>
            <img
              src={LoginIcon}
              alt="icon-login"
              style={{ width: 500, height: 500 }}
            />
          </Col>
          <Col xl={12} sm={24}>
            <div className="col-right">
              <div className="logo">
                <Gap height={50} />
                <img
                  src={NusaMealsLogin}
                  alt="logo"
                  style={{ width: 251, height: 51 }}
                  className="logo-login"
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
                      message: 'Please input username!',
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: '#0669BD' }} />}
                    placeholder="Username"
                    className="input-form"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input password!',
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: '#0669BD' }} />}
                    placeholder="Password"
                    className="input-form"
                  />
                </Form.Item>
                <div className="remember-me">
                  <Checkbox className="checkbox">Remember me</Checkbox>
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
        <Modal open={isModalOpen} onCancel={handleCancel} width={864}>
          <div>
            <Row>
              <Col xl={12} sm={24}>
                <img
                  src={ForgetPass}
                  alt="forget-pass"
                  style={{ width: 369, height: 320 }}
                />
              </Col>
              <Col xl={12} sm={24}>
                <div className="forgot-right">
                  <Gap height={70} />
                  <p className="forgot-pass">Forgot Password</p>
                  <div className="devider" />
                  <Gap height={20} />
                  <Form name="forgotForm" form={forgotForm}>
                    <Form.Item
                      name="id"
                      rules={[
                        {
                          required: true,
                          message: 'Please input username!',
                        },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined style={{ color: '#0669BD' }} />}
                        placeholder="Username"
                        style={{ width: 348, height: 48 }}
                      />
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{ width: 348, height: 40 }}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </Card>
    </div>
  );
};

export default LoginPage;
