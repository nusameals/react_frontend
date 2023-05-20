import React, { useState } from "react";
// import reactLogo from "../../assets/images/react.svg";
import { Button, Space, Col, Row, Card, Radio } from "antd";
import { CancelButton } from "../../components/buttonComponent/ButtonComponent";
import "./homePage.css";
import Gap from "../../components/gap/Gap";
import { menu, service } from "./constant";
import { GoogleButton, Logo } from "../../assets/index";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const HomePage = () => {
  // radio button
  const [section, setSection] = useState("food");

  return (
    <div>
      <section className="SERVICE">
        <h2 className="titleS">
          Our Special Service <br />
          from Nusantara Meals
        </h2>
        <div>
          <Row>
            {service.map((item) => (
              <Col className="service">
                <img className="imgS" src={item.logo} alt="logo" />
                <div className="juduldescS">
                  <p className="judulS">{item.judul}</p>
                  <p className="descS">{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="MENU">
        <h2 className="titleM">This Month Hottest Menu</h2>
        <p className="descM">
          the best of Indonesia's culinary treasures, all in one place
        </p>
        <div>
          <Row>
            <Radio.Group
              defaultValue="food"
              buttonStyle="solid"
              value={section}
            >
              <Radio.Button className="food" value="food" style={{ zIndex: 0 }}>
                Food's
              </Radio.Button>
              <Radio.Button className="drink" value="drink">
                Drink's
              </Radio.Button>
            </Radio.Group>
          </Row>
        </div>
        <p className="lihat">Lihat Semua</p>
        <div>
          <Row gutter={15}>
            {menu.map((item) => (
              <Col span={6}>
                <Card
                  className="cardM"
                  cover={<img className="imgM" alt="example" src={item.foto} />}
                >
                  <p className="judulM">{item.judul}</p>
                  <p className="kotaM">{item.kota}</p>
                  <div className="hargakalor">
                    <p className="hargaM">{item.harga}</p>
                    <p className="kalori">{item.kalor}</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="CONTACT">
        <Row justify="center" align="middle">
          <Col
            xs={24}
            sm={24}
            md={20}
            lg={20}
            xl={20}
            className="cont-container"
          >
            <Space direction="horizontal">
              <Row gutter={12} justify="space-between" className="">
                <Col span={18}>
                  <Space direction="vertical" className="container-col-contact">
                    <img src={Logo} alt="logo" className="contact-nusa" />
                    <span className="text-experience">
                      Experience the best of Nusantara cuisine at your
                      fingertips.
                    </span>
                    <span className="cont-us">Contact Us</span>
                    <div className="divider-cont-us" />
                    <Row justify="start" align="middle">
                      <div className="icon-container">
                        <PhoneOutlined
                          style={{
                            fontSize: "25px",
                            transform: "rotate(90deg)",
                          }}
                        />
                      </div>
                      <span className="phone-mail">+628592617712</span>
                    </Row>
                    <Row justify="start" align="middle">
                      <div className="icon-container">
                        <MailOutlined
                          style={{
                            fontSize: "25px",
                          }}
                        />
                      </div>
                      <span className="phone-mail">halo@nusameal.com</span>
                    </Row>
                  </Space>
                </Col>
                <Col span={6}>
                  <Space direction="vertical" className="container-col-contact">
                    <Button className="btn-google" />
                    <Row gutter={12}>
                      <Col span={10}>
                        <ul style={{ paddingLeft: "0px" }}>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Home
                            </Button>
                          </li>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Service
                            </Button>
                          </li>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Menu
                            </Button>
                          </li>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Contact
                            </Button>
                          </li>
                        </ul>
                      </Col>
                      <Col span={14}>
                        <ul style={{ paddingLeft: "0px" }}>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Terms and Conditions
                            </Button>
                          </li>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Support
                            </Button>
                          </li>
                          <li className="list-btn-contact">
                            <Button className="btn-list" type="text">
                              Privacy Policy
                            </Button>
                          </li>
                          <li className="list-btn-contact">
                            <Space
                              wrap
                              direction="horizontal"
                              className="container-btn-social"
                            >
                              <Button
                              className="btn-social"
                                icon={
                                  <FacebookOutlined className="icon-social" />
                                }
                              />

                              <Button
                              className="btn-social"
                                icon={
                                  <InstagramOutlined className="icon-social" />
                                }
                              />
                              <Button
                              className="btn-social"
                                icon={
                                  <TwitterOutlined className="icon-social" />
                                }
                              />
                              <Button
                              className="btn-social"
                                icon={
                                  <YoutubeOutlined className="icon-social" />
                                }
                              />
                              <Button
                              className="btn-social"
                                icon={<PhoneOutlined className="icon-social" />}
                              />
                            </Space>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </Space>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
