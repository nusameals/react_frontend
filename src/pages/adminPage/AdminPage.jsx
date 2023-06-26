import {
  Badge,
  Button,
  Calendar,
  Card,
  Col,
  DatePicker,
  Divider,
  Progress,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./adminPage.css";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Area, Column, Pie, TinyArea, TinyColumn } from "@ant-design/plots";
import { data, getListData } from "./Constant";
import PaymentsData from "./Components/PaymentsData";
import VisitData from "./Components/VisitData";
import OrderStatus from "./Components/OrderStatus";
import PaymentsStatus from "./Components/PaymentsStatus";

const AdminPage = () => {
  const { RangePicker } = DatePicker;
  const [activeTabKey2, setActiveTabKey2] = useState("Sales");
  const [activeTabKeyPayments, setActiveTabKeyPayments] = useState("Order");

  const config = {
    height: 44,
    autoFit: false,
    data,
    smooth: true,
    areaStyle: {
      fill: "#d6e3fd",
    },
  };

  const configTinyPayments = {
    height: 44,
    autoFit: false,
    data,
    tooltip: {
      customContent: function (x, data) {
        return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };

  const tabListNoTitle = [
    {
      key: "Sales",
      tab: "Sales",
    },
    {
      key: "Visit",
      tab: "Visit",
    },
  ];

  const tabListStatus = [
    {
      key: "Order",
      tab: "View Orders Detail",
    },
    {
      key: "Payments",
      tab: "View Payments Detail",
    },
  ];

  const contentListNoTitle = {
    Sales: <PaymentsData />,
    Visit: <VisitData />,
  };

  const contentListStatus = {
    Order: <OrderStatus />,
    Payments: <PaymentsStatus />,
  };

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const onTabPaymentChange = (key) => {
    setActiveTabKeyPayments(key);
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div className="dashboard-admin">
      <Row justify="space-evenly" gutter={16} className="row-card-4">
        <Col xl={6} lg={12}>
          <Card style={{ width: "276px", height: "182px" }}>
            <div className="total-sales">
              <p className="total-sales-text">Total Sales</p>
              <InfoCircleOutlined />
            </div>
            <p className="num-card">Rp64.579,000</p>
            <div className="caret-up">
              <p className="wow-dod-card">WoW Change 12%</p>
              <CaretUpOutlined style={{ color: "#52C41A" }} />
            </div>
            <div className="caret-down">
              <p className="wow-dod-card">DoD Change 11%</p>
              <CaretDownOutlined style={{ color: "#FF4D4F" }} />
            </div>
            <Divider
              style={{ padding: "0px", marginTop: "9px", marginBottom: "0px" }}
            />
            <div className="daily-action">
              <p className="daily-text">Daily Sales</p>
              <p className="daily-content">Rp876,423</p>
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={12}>
          <Card style={{ width: "276px", height: "182px" }}>
            <div className="total-sales">
              <p className="total-sales-text">Visits</p>
              <InfoCircleOutlined />
            </div>
            <p className="num-card">8,846</p>
            <TinyArea {...config} style={{ width: "228px", height: "44px" }} />
            <Divider
              style={{ padding: "0px", marginTop: "9px", marginBottom: "0px" }}
            />
            <div className="daily-action">
              <p className="daily-text">Daily Visits</p>
              <p className="daily-content">1,234</p>
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={12}>
          <Card style={{ width: "276px", height: "182px" }}>
            <div className="total-sales">
              <p className="total-sales-text">Payments</p>
              <InfoCircleOutlined />
            </div>
            <p className="num-card">6,560</p>
            <TinyColumn {...configTinyPayments} />
            <Divider
              style={{ padding: "0px", marginTop: "9px", marginBottom: "0px" }}
            />
            <div className="daily-action">
              <p className="daily-text">Daily Visits</p>
              <p className="daily-content">1,234</p>
            </div>
          </Card>
        </Col>
        <Col xl={6} lg={12}>
          <Card style={{ width: "276px", height: "182px" }}>
            <div className="total-sales">
              <p className="total-sales-text">Operational Effects</p>
              <InfoCircleOutlined />
            </div>
            <p className="num-card">78%</p>
            <Progress
              percent={78}
              strokeColor={{ "0%": "#13C2C2", "100%": "#13C2C2" }}
              showInfo={false}
              className="operational-bar"
            />
            <Divider
              style={{ padding: "0px", marginTop: "9px", marginBottom: "0px" }}
            />
            <div className="daily-action">
              <p className="daily-text">Wow Change</p>
              <p className="daily-content">12%</p>
              <CaretUpOutlined
                style={{ color: "#52C41A", paddingTop: "8px" }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          width: "100%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<RangePicker />}
        onTabChange={onTab2Change}
        className="card-sales-visits"
      >
        <div className="card-content">{contentListNoTitle[activeTabKey2]}</div>
      </Card>

      <div className="card-calendar-status">
        <Row gutter={16} align="top">
          <Col xl={12} lg={24}>
            <Card title="Calendar" style={{ width: "576px", height: "571px" }}>
              <Calendar cellRender={cellRender} />
            </Card>
          </Col>
          <Col xl={12} lg={24}>
            <Card
              title="Status"
              style={{
                width: "576px",
                height: "310px",
              }}
              tabList={tabListStatus}
              activeTabKey={activeTabKeyPayments}
              onTabChange={onTabPaymentChange}
            >
              <div className="card-content-status">
                {contentListStatus[activeTabKeyPayments]}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminPage;
