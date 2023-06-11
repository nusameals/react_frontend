import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Form, Card, Col, Row, Space } from "antd";
import {

  Table,
  Modal,
  Popconfirm, Pagination
 
} from "antd";

import axios from "axios";

export const ReportPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
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
  const columns = [
    {
      title: "ID",
      dataIndex: "idReservation",
      key: "idReservation",
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
      },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
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
      }
    
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
      <Table
        style={{
          margin: "50px 60px",
        }}
        dataSource={dataSource}
        columns={columns}
        pagination={paginationConfig}

      />
  <Space>
    <Card
      size="small"
      title="Payment"
      bordered={false}
      extra={<p>ⓘ</p>}
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </Space>    </div>

  );
};
export default ReportPage;
