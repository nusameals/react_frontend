import React, { useState } from "react";
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
} from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { CancelButton } from "../../components/buttonComponent/ButtonComponent";
import "./homePage.css";
import { menu, service, minum, feedback, heroex } from "./constant";
import {
  GoogleButton,
  Logo,
  Herobackground,
  Herofood,
  iga,
  sateayam,
  satedaging,
  empal,
  jahe,
  mangga,
  cincau,
  teh,
  Heromob,
} from "../../assets/index";

import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import useMediaQuery from "./query";
import { Link } from 'react-router-dom';


const HomePage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [section, setSection] = useState("food");
  const onChange = ({ target: { value } }) => {
    setSection(value);
  };

  return (
    <div>
      
      <div className="heroback">
        <h1
          style={{
            color: "white",
            marginTop: "-2%",
          }}
        >
          test
        </h1>
        <div className="hero">
          <div className="herocontai">
            <img class="herofood" src={Herofood} alt="Image" />

            <div className="heroleft">
              <div className="herotext1">
                <h1 className="herodis">Discover the Rich Culinary </h1>
                <h1 className="heroher">Heritage of Indonesia</h1>
                <p>
                  No more long lines, our app makes <br /> booking and order
                  with our app, <br /> <b>the smart way to dine.</b>
                </p>{" "}
              </div>
              <Button type="primary" className="buttonget">
                Get the app
              </Button>
              <Space
                wrap
                direction="horizontal"
                className="herosocial"
                style={{ marginRight: "80px" }}
              >
                <Button
                  className="heroic"
                  icon={
                    <FacebookOutlined
                      className="heroicon"
                      style={{ marginRight: "100px" }}
                    />
                  }
                />

                <Button
                  className="heroic"
                  icon={<InstagramOutlined className="heroicon" />}
                />
                <Button
                  className="heroic"
                  icon={<TwitterOutlined className="heroicon" />}
                />
              </Space>
            </div>
          </div>
        </div>
        <h1
          style={{
            color: "white",
            marginTop: "-2%",
          }}
        >
          test
        </h1>
      </div>

      {isMobile ? <HeroCarousel /> : <HeroRow />}

      <section id="services" className="SERVICE">
        <h2 className="titleS">
          Our Special Service <br />
          from Nusantara Meals
        </h2>
        <div>
          <Space direction="horizontal">
            <Row justify="center">
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
          </Space>
        </div>
      </section>

      <section id="menu" className="MENU">
        <h2 className="titleM">This Month Hottest Menu</h2>
        <p className="descM">
          the best of Indonesia's culinary treasures, all in one place
        </p>
        <div>
          <Row justify="center" className="rowM" style={{ zIndex: 0 }}>
            <Radio.Group
              defaultValue="food"
              value={section}
              onChange={onChange}
            >
              <Radio.Button className="food" value="food" style={{ zIndex: 0 }}>
                Food's
              </Radio.Button>
              <Radio.Button
                className="drink"
                style={{ zIndex: 0 }}
                value="drink"
              >
                Drink's
              </Radio.Button>
            </Radio.Group>
          </Row>
        </div>
        <p className="lihat">Lihat Semua</p>
        {isMobile ? (
          <div
            className="car"
            style={{
              zIndex: 0,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {section === "food" ? <FoodMenuCarousel /> : <DrinkMenuCarousel />}
          </div>
        ) : (
          <div
            className="CARD"
            style={{
              zIndex: 0,
            }}
          >
            {section === "food" ? <FoodMenu /> : <DrinkMenu />}
          </div>
        )}
      </section>

      <section className="customer-feedback">
        <h2 className="titleS">Our Customer FeedBack</h2>
        <div>{isMobile ? <FeedBackReviewMobile /> : <FeedBackReview />}</div>
        <div>{isMobile ? <SubsFormMobile /> : <SubsForm />}</div>
      </section>

      <section id="contact" className="CONTACT">
        <Row justify="center" align="middle">
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            className="cont-container"
          >
            <Space direction="horizontal">
              <Row gutter={[12, 32]} justify="center">
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
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
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Space direction="vertical" className="container-col-contact">
                    <Button className="btn-google" />
                    <Row gutter={12}>
                      <Col span={8}>
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
                      <Col span={16}>
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

function FoodMenu() {
  return (
    <Space direction="horizontal">
      <Row justify="center" gutter={15}>
        {menu.map((item) => (
          <Col span={6} xs={24} sm={24} md={24} lg={6} xl={6}>
            <Card
              className="cardM"
              value="food"
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
    </Space>
  );
}

function DrinkMenu() {
  return (
    <Space direction="horizontal">
      <Row justify="center" gutter={15}>
        {minum.map((item) => (
          <Col span={6} xs={24} sm={24} md={24} lg={6} xl={6}>
            <Card
              className="cardM"
              value="drink"
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
    </Space>
  );
}

function FoodMenuCarousel() {
  return (
    <div className="carousel" style={{ zIndex: 0 }}>
      <div className="swiper-wrapper">
        <Space>
          <Row gutter={[40, 16]} justify="center" align="middle">
            <Carousel
              arrows={true}
              prevArrow={<LeftOutlined />}
              nextArrow={<RightOutlined />}
              style={{
                width: 265,
              }}
            >
              {menu.map((item) => (
                <Col xl={{ span: 8 }} md={{ span: 24 }}>
                  <div className="swiper-slide">
                    <img
                      style={{
                        width: 230,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      src={item.foto}
                      alt="logo"
                    />
                    <p className="judulM">{item.judul}</p>
                    <p className="kotaM">{item.kota}</p>
                    <div className="hargakalor">
                      <p className="hargaM">{item.harga}</p>
                      <p className="kalori">{item.kalor}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Carousel>
          </Row>
        </Space>
      </div>
    </div>
  );
}

function DrinkMenuCarousel() {
  return (
    <div className="carousel" style={{ zIndex: 0 }}>
      <div className="swiper-wrapper">
        <Space>
          <Row gutter={[40, 16]} justify="center" align="middle">
            <Carousel
              arrows={true}
              prevArrow={<LeftOutlined />}
              nextArrow={<RightOutlined />}
              style={{
                width: 265,
              }}
            >
              {minum.map((item) => (
                <Col xl={{ span: 8 }} md={{ span: 24 }}>
                  <div className="swiper-slide">
                    <img
                      style={{
                        width: 230,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      src={item.foto}
                      alt="logo"
                    />
                    <p className="judulM">{item.judul}</p>
                    <p className="kotaM">{item.kota}</p>
                    <div className="hargakalor">
                      <p className="hargaM">{item.harga}</p>
                      <p className="kalori">{item.kalor}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Carousel>
          </Row>
        </Space>
      </div>
    </div>
  );
}

function HeroRow() {
  return (
    <div className="heroexcess">
      <Space direction="horizontal">
        <Row justify="center">
          {heroex.map((item) => (
            <Col className="heroexc">
              <div className="herocontent">
                <img className="hlogo" src={item.logo} alt="logo" />
                <div className="hjuduldes">
                  <p className="hjudul">{item.judul}</p>
                  <p className="hdes">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
}
function HeroCarousel() {
  return (
    <div className="heroexcess">
      <Carousel
        className="herocar"
        arrows={true}
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
      >
        {heroex.map((item) => (
          <Col className="heroexc">
            <div className="herocontent">
              <img className="hlogo" src={item.logo} alt="logo" />
              <div className="hjuduldes">
                <p className="hjudul">{item.judul}</p>
                <p className="hdes">{item.desc}</p>
              </div>
            </div>
          </Col>
        ))}
      </Carousel>
    </div>
  );
}

function FeedBackReviewMobile() {
  return (
    <div className="feedback">
      <Row gutter={[40, 16]} justify="center" align="middle">
        <Carousel
          arrows={true}
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {feedback.map((item) => (
            <Col xl={{ span: 8 }} md={{ span: 24 }}>
              <Card className="card-feedback">
                <div className="ava-name">
                  <img className="ava-feedback" src={item.ava} alt="logo" />
                  <div className="name-role">
                    <p className="name-feedback">{item.nama}</p>
                    <p className="role-feedback">{item.role}</p>
                  </div>
                </div>
                <Rate disabled defaultValue={5} />
                <p className="desc-feedback">{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Carousel>
      </Row>
    </div>
  );
}

function FeedBackReview() {
  return (
    <div className="feedback">
      <Row
        gutter={[40, 16]}
        justify="center"
        align="middle"
        className="row-feedback"
        style={{ marginLeft: 52 }}
      >
        {feedback.map((item) => (
          <Col xl={{ span: 8 }} md={{ span: 24 }}>
            <Card className="card-feedback">
              <div className="ava-name">
                <img className="ava-feedback" src={item.ava} alt="logo" />
                <div className="name-role">
                  <p className="name-feedback">{item.nama}</p>
                  <p className="role-feedback">{item.role}</p>
                </div>
              </div>
              <Rate disabled defaultValue={5} />
              <p className="desc-feedback">{item.desc}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

function SubsForm() {
  return (
    <div className="subscribe-form">
      <div className="subscribe-content">
        <p className="title-subs">Get more updates of Nusantara Foods</p>
        <p className="subs-text">
          Never miss out on the taste of Indonesia - Subscribe for exclusive
          updates
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space.Compact className="input-button">
            <Input placeholder="Your email..." />
            <Button type="primary">Subscribe</Button>
          </Space.Compact>
        </div>
         <br /> 
         <br /> 

        <Link to="/admin">
            <Button  style={{ backgroundColor: 'transparent', border: 'none' }}>{""}</Button>
      </Link>
      
      </div>
    </div>
  );
}

function SubsFormMobile() {
  return (
    <div className="subscribe-form-mobile">
      <div className="subscribe-content">
        <p className="title-subs-mobile">
          Get more updates of Nusantara Foods
          <br />
          <span className="subs-text-mobile">
            Never miss out on the taste of Indonesia - Subscribe for exclusive
            updates
          </span>
        </p>
        <Space>
          <Space.Compact className="input-button-mobile">
            <Input placeholder="Your email..." />
            <Button type="primary">Subscribe</Button>
          </Space.Compact>
        </Space>
      </div>
    </div>
  );
}
