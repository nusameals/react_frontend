import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Form, Card, Col, Row, Space } from "antd";
import { Divider, Input, Table, Modal, Popconfirm, Pagination } from "antd";
import { TinyColumn } from "@ant-design/plots";
import { data } from "./paymentdata";
import "./reportPage.css";
import axios from "axios";

export const ReportPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = {
    total: dataSource,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultPageSize: 10,
    defaultCurrent: 1,
    current: currentPage,
    onChange: (page) => setCurrentPage(page),
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleShowModal = () => {
    setVisible(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://64828ad5f2e76ae1b95b4a4d.mockapi.io/p"
      );
      setDataSource(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchedText, setSearchedText] = useState("");

  // const data = [
  //   274, 337, 81, 497, 666, 219, 269, 274, 337, 81, 497, 666, 219, 274, 337, 81,
  // ];
  const config = {
    height: 64,
    autoFit: false,
    data,
    tooltip: {
      customContent: function (x, data) {
        return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "idReservation",
      key: "idReservation",

      width: 90,
      render: (_, record) => (
        <div
          style={{
            color: " #1890FF",
          }}
        >
          {record.idReservation}
        </div>
      ),
    },
    {
      title: "Years",
      dataIndex: "years",
      key: "years",
      width: 90,

      sorter: (a, b) => a.years - b.years,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      width: 120,
      // sorter: (a, b) => a.month.localeCompare(b.month),
      sorter: (a, b) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        return months.indexOf(a.month) - months.indexOf(b.month);
      },

      sortDirections: ["ascend", "descend"],
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.idReservation)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.years).toLowerCase().includes(value.toLowerCase()) ||
          String(record.month).toLowerCase().includes(value.toLowerCase()) ||
          String(record.cash).toLowerCase().includes(value.toLowerCase()) ||
          String(record.debitCard)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.ewallet).toLowerCase().includes(value.toLowerCase()) ||
          String(record.total).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Cash",
      dataIndex: "cash",
      key: "cash",
      width: 135,
    },

    {
      title: "Debit Card",
      dataIndex: "debitCard",
      key: "debitCard",
      width: 135,
    },
    {
      title: "E-Wallett",
      dataIndex: "ewallet",
      key: "ewallet",
      width: 135,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  return (
    <div className="reportpage">
      {" "}
      <Row className="container-header-profile">
        <Breadcrumb
          items={[
            {
              title: "Report",
            },
            {
              title: "Report Data",
            },
          ]}
        />
        <span className="text-profile">Report Data</span>
      </Row>
      <div>
        <Space align="start">
          <Card
            bordered={false}
            style={{
              margin: "2%",
              width: "910px",
            }}
          >
            <div
              style={{
                gap: 10,
                alignItems: "center",
                display: "flex",
              }}
            >
              <span style={{ fontSize: 14 }}>Search:</span>
              <Input
                placeholder="Please enter"
                style={{
                  width: 500,
                }}
                onSearch={(value) => {
                  setSearchedText(value);
                }}
                onChange={(e) => {
                  setSearchedText(e.target.value);
                }}
              />
            </div>

            <Divider
              style={{
                margin: "1.5% -2%",
              }}
            ></Divider>
            <Table
              style={{
                margin: "1% 0%",
              }}
              dataSource={dataSource}
              columns={columns.map((column) => ({
                ...column,
                title: (
                  <span style={{ fontWeight: "normal" }}>{column.title}</span>
                ),
              }))}
              pagination={paginationConfig}
            />
          </Card>
          <Card
            style={{
              width: 350,
              margin: "5%",
              marginLeft: "30px",
            }}
          >
            <div
              style={{
                lineHeight: 0,
              }}
            >
              <Space
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "#00000073" }}>Payments</p>
                <p style={{ fontSize: 16, fontWeight: "bold" }}>ⓘ</p>
              </Space>
              <p className="paymentnumber">6,560</p>
              <TinyColumn {...config} />
              <Divider
                style={{
                  margin: "10px 0px",
                }}
              />
              <p>Conversion Rate 60%</p>
            </div>
          </Card>
        </Space>
      </div>
    </div>
  );
};
export default ReportPage;
