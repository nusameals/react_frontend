import React, { useState } from "react";
// import reactLogo from "../../assets/images/react.svg";
import { Button, Space, Col, Row, Card, Radio } from "antd";
import { CancelButton } from "../../components/buttonComponent/ButtonComponent";
import "./homePage.css";
import Gap from "../../components/gap/Gap";
import { menu, service } from "./constant";

const HomePage = () => {

  // radio button
  const [section, setSection] = useState('food')

  return (
    <div>

      <section className="SERVICE">
        <h2 className="titleS">Our Special Service <br />from Nusantara Meals</h2>
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
        <p className="descM">the best of Indonesia's culinary treasures, all in one place</p>
        <div>
          <Row>
            <Radio.Group
              defaultValue='food'
              buttonStyle="solid"
              value={section}>
              <Radio.Button className="food" value='food' style={{ zIndex: 0 }}>Food's</Radio.Button>
              <Radio.Button className="drink" value='drink'>Drink's</Radio.Button>
            </Radio.Group>
          </Row>
        </div>
        <p className="lihat">Lihat Semua</p>
        <div>
          <Row gutter={15}>
            {menu.map((item) => (
              <Col span={6}>
                <Card className="cardM"
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

    </div>
  );
};

export default HomePage;
