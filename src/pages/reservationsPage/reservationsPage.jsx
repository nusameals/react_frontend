import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Form, Card, Col, Row, Space } from "antd";
import {
  Checkbox,
  Input,
  Select,
  Radio,
  InputNumber,
  Table,
  Modal,
  Popconfirm,
  Upload,
} from "antd";

import axios from "axios";
import "./ReservationsPage.css";

export const ReservationsPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);

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
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "timeOut",
    },
  
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle" >
            <a onClick={handleShowModal}>View Details</a>
            <Modal
              title="Add Product"
              visible={visible}

              ></Modal>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      {" "}
      <Row className="container-header-profile">
        <Breadcrumb
          items={[
            {
              title: "Reservations",
            },
            {
              title: "Reservations Data",
            },
          ]}
        />
        <span className="text-profile">Reservations Data</span>
      </Row>
      <Table
        style={{
          margin: "50px 60px",
        }}
        dataSource={dataSource}
        columns={columns}
      />

    </div>
  );
};
export default ReservationsPage;
