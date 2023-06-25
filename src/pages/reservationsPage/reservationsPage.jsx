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
  Divider,
  Tabs,
} from "antd";
import { CloseSquareFilled } from "@ant-design/icons";
import { Link,useParams } from "react-router-dom";
import { INITIAL_TABLE_DATA } from "./Constant";

import axios from "axios";
import "./reservationsPage.css";
import dayjs from 'dayjs';
import { gql, useQuery } from '@apollo/client';

const GET_TABLE = gql`
  query table {
    table {
      id
    detail
    image
    numberofTables
    seats
    type
    }
  }
`;
// export const DELETE_TABLE = gql`
//   mutation table($uuid: uuid!) {
//     delete_table_by_pk(uuid: $uuid) {
//       uuid
//     }
//   }
// `;
export const ReservationsPage = () => {
  
  const { loading, error, data } = useQuery(GET_TABLE);

  const [dataSource, setDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { id } = useParams();

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
  const handleShowModal = (id) => {
    setSelectedId(id);
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
  
  const columnsData = [
    {
      title: "ID",
      dataIndex: "idReservation",
      key: "idReservation",
      width: 88,
      render: (_, record) => (
        <div
          style={{
            color: "#1890FF",
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
      width: 192.67,
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
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 200,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
      render: (date) => dayjs(date).format("DD-MM-YYYY"),

    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
      width: 120,
      sortDirections: ["ascend", "descend"],

            // render: (date) => dayjs(date).format(   "HH:mm"),

            sorter: (a, b) => {
              const timeA = dayjs(a.timeIn, "HH:mm");
              const timeB = dayjs(b.timeIn, "HH:mm");
              return timeA - timeB;
            },
            render: (time) => dayjs(time, "HH:mm").format("HH:mm"),
              // render: (timestamp) => dayjs(timestamp).format("HH:mm"),

    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "timeOut",
      width: 120,
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => {
        const timeA = dayjs(a.timeOut, "HH:mm");
        const timeB = dayjs(b.timeOut, "HH:mm");
        return timeA - timeB;
      },
      render: (time) => dayjs(time, "HH:mm").format("HH:mm"),
    },
    {
      title: "Action",
      key: "action",
      width: 142,
      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={() => handleShowModal(record.idReservation)}>
              View Details
            </a>
          </Space>
        );
      },
    },
  ];

  const columnsTable = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 170,

      render: (text, record) => <img src={text} alt={record.name} style={{ width: '40px',height: '40px',objectFit: 'cover',marginBottom:"-5%", marginTop: "-2%", borderRadius:"4px" }} />,

    },
    {
      title: "Number of Tables",
      dataIndex: "numberofTables",
      key: "numberofTables",
      width: 250,

      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.numberofTables)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.seats).toLowerCase().includes(value.toLowerCase()) ||
          String(record.type).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
      width: 259.33,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 259.33,
    },
    {
      title: "Action",
      key: "action",
      width: 259.33,

      render: (_, record) =>
        INITIAL_TABLE_DATA.length >= 1 ? (
          <Link to={`${record.id}`}>
            <Button type="link">View Detail</Button>
          </Link>
        ) : null,
    },
  ];

  // yg diatas bisa diklik
  const [activeTab, setActiveTab] = useState("Data");

  const items = [
    {
      key: "Data",
      label: `Data`,
      children: (
        <div className="childcard" style={{ backgroundColor: "#fafafa" }}>
          <Card
            bordered={false}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "2%",

              marginLeft: "auto",
              marginRight: "auto",
              width: "1250px",
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
              columns={columnsData.map((column) => ({
                ...column,
                // title: <span style={{ fontWeight: "normal" }}>{column.title}</span>,
              })
              )}
              pagination={paginationConfig}
            />
          </Card>
        </div>
      ),
    },
    {
      key: "Table List",
      label: `Table List`,
      children: (
        <div className="childcard" style={{backgroundColor: "#fafafa"}}>
        <Card
          bordered={false}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "2%",
  
            marginLeft: "auto",
            marginRight: "auto",
            width: "1250px",
  
  
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
                      <Link to="/add-table" style={{marginLeft: 'auto',backgroundColor: '#1890FF',borderRadius: '2px' }}  >

                <Button type="primary">Add Table</Button>
               </Link>
  
          </div>
          <Table
  style={{
    margin: '1% 0%',
  }}
  dataSource={loading ? [] : data?.table} // Use the fetched data as the data source
  columns={columnsTable}

  pagination={paginationConfig}
/>
        </Card>
        </div>      ),
    },
  ];
  // modal biar bisa keluar sesuai id

  const [rowData, setRowData] = useState(dataSource);
  const handleClose = () => {
    // Set the visibility to false to close the modal
    setVisible(false);
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;
  return (
    <div>
      {/* {" "} */}
      <Row className="container-header-profile">
        <div className="reserheader">
          
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
        </div>
      </Row>
      <Row justify="space-between">
        <Tabs
          defaultActiveKey="Data"
          onChange={handleTabChange}
          items={items}
          tabBarStyle={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0px 24px",
            backgroundColor: "#ffffff",

            marginBottom: "-0.1%",
          }}
          style={{ width: "100%" }}
        />
      </Row>

      <Modal
        visible={visible}
        closeIcon={<CloseSquareFilled style={{ color: "red", fontSize: 20 }} />}
        onCancel={handleClose}
        footer={[
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              key="submit"
              type="primary"
              onClick={handleClose}
              style={{ width: "100px", backgroundColor: "#0669BD" }}
            >
              Submit
            </Button>
          </div>,
        ]}
      >
        <div>
          <div className="modalheader">
            <p className="titlemodal">
              <b>Reservations Status</b>
            </p>
            <p className="subtitle">
              Here, you can see the reservations details
            </p>
          </div>
          <Divider style={{ marginTop: "-8px" }} />
          <p className="titledetail">
            <b>Reservations Detail</b>
          </p>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
          ></div>
        </div>

        {dataSource
          .filter((record) => record.idReservation === selectedId)
          .map((record) => (
            <div key={record.idReservation}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="modalisian">
                  <p className="subdetail">Name</p>
                  <p className="subdetail">Number Phone</p>
                  <p className="subdetail">Date</p>
                  <p className="subdetail">Time In</p>
                  <p className="subdetail">Time Out</p>

                  <p className="subdetail">Agenda</p>
                  <p className="subdetail">Number of people</p>
                </div>
                <div className="modalrespon">
                  <p className="subrespon">
                    <b>{record.customerName}</b>
                  </p>
                  <p className="subrespon"><b> {record.phone}</b></p>
                  <p className="subrespon">
                  <b>{dayjs(record.date).format("DD-MM-YYYY")}</b>
                    </p>
                    <p className="subrespon">
              <b>{dayjs(record.timeIn, "HH:mm").format("HH:mm")}</b>
            </p>
            <p className="subrespon">
              <b>{dayjs(record.timeOut, "HH:mm").format("HH:mm")}</b>
            </p>
            <p className="subrespon">
                    <b>{record.agenda}</b>
                  </p>                  <p className="subrespon">
                    <b>{record.numberOfPeople}</b>
                  </p>
                  <Divider />
                </div>{" "}
              </div>
            </div>
          ))}
      </Modal>
    </div>
  );
};
export default ReservationsPage;
