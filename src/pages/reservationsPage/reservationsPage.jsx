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
  Divider, Tabs
} from "antd";
import { CloseSquareFilled } from '@ant-design/icons';

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
  const handleShowModal = () => {
    // Modified handleShowModal function
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
      width: 192.67,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 192.67,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Time In",
      dataIndex: "timeIn",
      key: "timeIn",
      width: 120,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Time Out",
      dataIndex: "timeOut",
      key: "timeOut",
      width: 120,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      key: "action",
      width: 102,
      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={handleShowModal}>View Details</a>
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

      render: (_, record, index) => (
        <img
          src={record.avatar}
          alt={`avatar-${index}`}
          style={{ height: "30px" }}
        />
      )
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
          String(record.seats)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
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

      render: (text, record) => {
        return (
          <Space size="middle">
            <a onClick={handleShowModal}>View Details</a>
          </Space>
        );
      },
    },
  ];

  // yg diatas bisa diklik
  const [activeTab, setActiveTab] = useState("Data");

  const items = [

    {
      key: "Data",
      label: `Data`,
      children:      
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
        </div>
        <Table
          style={{
            margin: "1% 0%",
            
          }}
          dataSource={dataSource}
          columns={columnsData.map((column) => ({
            ...column,
            // title: <span style={{ fontWeight: "normal" }}>{column.title}</span>,
          }))}
          pagination={paginationConfig}
        />
      </Card>
      </div>
    },
    {
      key: "Table List",
      label: `Table List`,
      //buat testing aja blom rapi
      children:       
      <div className="childcard" style={{backgroundColor: "#fafafa"}}>

      </div>
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
  
  return (
    <div>
      {/* {" "} */}
      <Row className="container-header-profile" >
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
      <Row justify="space-between" >
          <Tabs
            defaultActiveKey="Data"
            onChange={handleTabChange}
            
            items={items}  
            tabBarStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px 24px',
              backgroundColor: '#ffffff',
              
marginBottom:'-0.1%'
            }}
            style={{ width: '100%' }}
          />
        </Row>

      <Modal visible={visible}

              closeIcon={<CloseSquareFilled style={{ color: 'red', fontSize: 20 }} />}
              onCancel={handleClose}  
              footer={[
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                <Button key="submit" type="primary" onClick={handleClose}
                style={{ width:"100px",backgroundColor: "#0669BD" }}>
                  Submit
                </Button>
                </div>
]}        >
        <div className="modalheader">
          <p className="titlemodalreser">
            <b>Reservations Status</b>
          </p>
          <p className="subtitle">Here, you can see the Reservations details</p>
        </div>
        <Divider style={{ marginTop: '-8px' }}/>
        <p className="titledetail">
          <b>Reservations Detail</b>
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="modalisian">
            <p className="subdetail">Customer Username</p>
            <p className="subdetail">Order Number</p>
            <p className="subdetail">Type</p>
            <p className="subdetail">Table Number</p>
          </div>

          <div className="modalrespon">
            <p className="subrespon">
              <b>{rowData?.idReservation}</b>
            </p>
            <p className="subrespon">
            </p>
            <p className="subrespon">
              <b>Dine In</b>
            </p>
            <p className="subrespon">
              <b>4</b>
            </p>
          </div>
          {/*                    
                    {orders?.map((row_id) => (
                        <div key={row_id} className='modalrespon'>
                            <p className='subrespon'><b>{row_id.customerUsername}</b></p>
                            <p className='subrespon'><b></b></p>
                            <p className='subrespon'><b>Dine In</b></p>
                            <p className='subrespon' ><b>4</b></p>
                        </div>
                    ))} */}
        </div>
        {/* <p>y</p>
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
        ))} */}
        
      </Modal>
    </div>
  );
};
export default ReservationsPage;
