import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Form, Card, Col, Row, Space } from "antd";
import { Divider, Input, Table, Modal, Popconfirm, Pagination } from "antd";

import axios from "axios";

export const ReportPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationConfig = {
    total: dataSource,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultPageSize: 20,
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

  const columns = [
    {
      title: "ID",
      dataIndex: "idReservation",
      key: "idReservation",

      //       onFilter: (value, record)  => {
      // return record.name. includes (value);
      //       },

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
      sorter: (a, b) => a.years - b.years,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      sorter: (a, b) => a.month.localeCompare(b.month),
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
    },

    {
      title: "Debit Card",
      dataIndex: "debitCard",
      key: "debitCard",
    },
    {
      title: "E-Wallett",
      dataIndex: "ewallet",
      key: "ewallet",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  return (
    <div>
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
      <Card
        bordered={false}
        style={{
          margin: "2% 2%",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            // margin: "10px 60px",
            // marginBottom: "-20px",
          }}
        >
          <span style={{ fontSize: 14 }}>Search:</span>
          <Input.Search
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
        {/* <div style={{ backgroundColor: "blue", 
      }}>
        <hr
          style={{
            margin: "2% -2%",
            color: "#fafafa",
            backgroundColor: "#fafafa", 

          }}
        />
        </div> */}
        <Divider></Divider>
        <Table
          style={{
            margin: "2% 0%",
          }}
          dataSource={dataSource}
          columns={columns}
          pagination={paginationConfig}
        />
      </Card>
      <Space>
        <Card
          // size="small"
          // title="Payment"
          // bordered={false}
          // extra={<p>ⓘ</p>}
          style={{
            width: 300,
          }}
        >
          <p>Payments</p>
          <p>ⓘ</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>{" "}
    </div>
  );
};
export default ReportPage;
