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
  Upload, Divider
} from "antd";

import axios from "axios";
import "./reservationsPage.css";

export const ReservationsPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null); 

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
  const handleShowModal = (id) => { // Modified handleShowModal function
    // setSelectedId(id);    
    setVisible(true);
  };
  const [searchedText, setSearchedText] = useState("");

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
      title: "Customer Username",
      dataIndex: "customerUsername",
      key: "customerUsername",
      sortDirections: ["ascend", "descend"],
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.idReservation)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customerUsername)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customerName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.date).toLowerCase().includes(value.toLowerCase()) ||
          String(record.timeIn).toLowerCase().includes(value.toLowerCase()) ||
          String(record.timeOut).toLowerCase().includes(value.toLowerCase())
        );
      },
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
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "timeOut",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={handleShowModal}>View Details</a>
            {/* <Modal
              title="Add Product"
              visible={visible}

              ></Modal> */}
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
      <Card
        bordered={false}
        style={{
          display: "flex",
          // alignItems: "center",
          margin: "2%",
          marginLeft: "auto",
          marginRight: "auto",
          width: "96%",
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
             <Modal
              visible={visible}

              
              >
        <div className="modalheader">
          <p className="titlemodalreser">
            <b>Reservations Status</b>
          </p>
          <p className="subtitle">Here, you can see the Reservations details</p>
        </div>   
        <Divider/>
        <p>y</p>
        {dataSource.map((record) => (
    <div key={record.idReservation}>
      <p>ID: {record.idReservation}</p>
      <p>Customer Username: {record.customerUsername}</p>
      <p>Customer Name: {record.customerName}</p>
      <p>Phone: {record.phone}</p>
      <p>Date: {record.date}</p>
      <p>Time In: {record.timeIn}</p>
      <p>Time Out: {record.timeOut}</p>
      <Divider />
    </div>
  ))}
                   </Modal>
               </div>
  );
};
export default ReservationsPage;