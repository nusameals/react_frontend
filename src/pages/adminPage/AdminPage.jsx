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
import PaymentsData from "./Components/PaymentsData";
import VisitData from "./Components/VisitData";
import OrderStatus from "./Components/OrderStatus";
import PaymentsStatus from "./Components/PaymentsStatus";

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event。。....",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const AdminPage = () => {
  const { RangePicker } = DatePicker;
  const [activeTabKey1, setActiveTabKey1] = useState("Sales");
  const [activeTabKey2, setActiveTabKey2] = useState("Sales");
  const [activeTabKeyOrder, setActiveTabKeyOrder] = useState("Order");
  const [activeTabKeyPayments, setActiveTabKeyPayments] = useState("Order");

  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513,
    546, 983, 340, 539, 243, 226, 192,
  ];

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
      label: "Sales",
    },
    {
      key: "Visit",
      label: "Visit",
    },
  ];

  const tabListStatus = [
    {
      key: "Order",
      label: "View Orders Detail",
    },
    {
      key: "Payments",
      label: "View Payments Detail",
    },
  ];

  const dataPaymentsCard = [422, 400, 380, 180, 380, 422, 390, 200, 422, 520];

  const configPaymentsCard = {
    height: 64,
    autoFit: false,
    dataPaymentsCard,
    tooltip: {
      customContent: function (x, dataPaymentsCard) {
        return `NO.${x}: ${dataPaymentsCard[0]?.dataPaymentsCard?.y.toFixed(
          2
        )}`;
      },
    },
  };

  const contentListNoTitle = {
    Sales: <PaymentsData />,
    Visit: <VisitData />,
  };

  const contentListStatus = {
    Order: <OrderStatus />,
    Payments: <PaymentsStatus />,
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const onTabOrderChange = (key) => {
    setActiveTabKeyOrder(key);
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
      <Link to="/" reloadDocument>
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
          }}
          danger
        >
          Logout
        </Button>
      </Link>
      <Row justify="center" gutter={16}>
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
              <div className="card-content">
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
