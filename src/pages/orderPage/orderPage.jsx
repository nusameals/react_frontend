import React, { useState, useEffect } from 'react';
import {
  Breadcrumb,
  Row,
  Table,
  Space,
  Modal,
  Badge,
  Select,
  Button,
  Form,
  Input,
  Spin,
  Pagination,
} from 'antd';
import './orderPage.css';
import { CloseSquareFilled, LoadingOutlined } from '@ant-design/icons';
import { useGetOrders, useGetPayments, useUpdateOrders } from './hook/useOrder';
import dayjs from 'dayjs';

const { useForm } = Form;

const OrderPage = () => {
  // data order
  const [isLoadingOrders, orders, getOrders] = useGetOrders();
  const [isLoadingPayments, payments, getPayments] = useGetPayments();

  const [rowData, setRowData] = useState(orders);
  const [rowDataPayments, setRowDataPayments] = useState(payments);

  const getPaymentsByOrderId = (id) => {
    const payment = payments?.find((item) => item?.id === id);
    return payment;
  };

  // call hook
  useEffect(() => {
    getOrders();
    getPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // search
  const [searchedText, setSearchedText] = useState('');

  // modal order
  const [isModalOrder, setIsModalOrder] = useState(false);

  const showModal = (data) => {
    setRowData(data);
    setIsModalOrder(true);
  };
  const handleOk = () => {
    setIsModalOrder(false);
  };
  const handleCancel = () => {
    setIsModalOrder(false);
  };

  // modal payment
  const [isModalPayment, setIsModalPayment] = useState(false);
  const showModalpayment = (payments) => {
    setRowDataPayments(payments)
    setIsModalPayment(true);
  };
  const handleOkPayment = () => {
    setIsModalPayment(false);
  };
  const handleCancelPayment = () => {
    setIsModalPayment(false);
  };

  // loading
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // confirm
  const success = () => {
    Modal.success({
      content: (
        <p>
          Update orders status success! <br />
          Click done to continue
        </p>
      ),
      okText: 'Done',
      style: { marginTop: 135 },
    });
  };
  const successPayment = () => {
    Modal.success({
      content: (
        <p>
          Update payments status success! <br />
          Click done to continue
        </p>
      ),
      okText: 'Done',
      style: { marginTop: 135 },
    });
  };

  const { useForm } = Form;

  // form
  const [form] = Form.useForm();

  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //     data.push({
  //         key: i,
  //         orderId: `12345${i}`,
  //         dateOrder: '2021-02-05 08:28:36',
  //         customerUsername: `Kim Taehyung ${i}`,
  //         type: 'dine in',
  //     });
  // }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // select form
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const TABLE_COLUMNS = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (_, record) => (
        <div
          style={{
            color: ' #0669BD',
          }}
        >
          {record.orderId}
        </div>
      ),
    },
    {
      title: 'Date Order',
      dataIndex: 'dateOrder',
      key: 'dateOrder',
      sorter: (a, b) => new Date(a.dateOrder) - new Date(b.dateOrder),
      sortDirections: ["ascend", "descend"],
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: 'Customer Userame',
      dataIndex: 'customerUsername',
      key: 'customerUsername',
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.orderId).toLowerCase().includes(value.toLowerCase()) ||
          String(record.dateOrder)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.customerUsername)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.type).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.orderStatus - b.orderStatus,
      render: (_, record) => (
        <Badge status="processing" text={record.orderStatus} />
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: ['status', 'id'],
      key: 'status',
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.status - b.status,
      render: (_, record) => {
        return (
          <Badge status="success" text={getPaymentsByOrderId(record.id)?.status} />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <Space>
          <a
            style={{
              color: ' #0669BD',
            }}
            onClick={() => showModal(record)}
          >
            Update orders
          </a>
          <a
            style={{
              color: ' #0669BD',
            }}
            onClick={() => showModalpayment(record)}
          >
            Update Payments
          </a>
        </Space>
      ),
    },
  ];

  const onChange = (filters, sorter) => {
    console.log('params', filters, sorter);
  };

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div>
      <Row className="container-header-profile">
        <Breadcrumb
          items={[
            {
              title: 'Orders',
            },
            {
              title: 'Orders Data',
            },
          ]}
        />
        <span className="textorder">Orders Data</span>
      </Row>

      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          margin: '10px 60px',
          marginBottom: '-20px',
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
          margin: '50px 60px',
        }}
        rowKey="id"
        columns={TABLE_COLUMNS}
        onChange={onChange}
        dataSource={orders}
        pagination={{
          total: orders,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total}items`,
          defaultPageSize: 10,
          defaultCurrent: 1,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        loading={isLoadingOrders}
      />

      {/* modal order */}

      <Modal
        open={isModalOrder}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={<CloseSquareFilled style={{ color: 'red', fontSize: 20 }} />}
      >
        <div className="modalheader">
          <p className="titlemodal">
            <b>Orders Status</b>
          </p>
          <p className="subtitle">Here, you can see the order details</p>
        </div>
        <hr style={{ marginTop: '-8px' }}></hr>
        <p className="titledetail">
          <b>Orders Detail</b>
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
              <b>{rowData?.customerUsername}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.orderId}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.type_order}</b>
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="modalprice">
            <p className="pricee">
              <b>Total</b>
            </p>
            <p className="method" style={{ marginTop: '-0px' }}>
              Payment method
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <p className="nomprice" style={{ marginTop: '-15px' }}>
              <b>{rowData?.total_price}</b>
            </p>
            <p
              className="paymentmet"
              style={{ marginTop: 0, textAlign: 'end' }}
            >
              <b>Cash</b>
            </p>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: '-15px',
            alignItems: 'center',
          }}
        >
          <p style={{ marginTop: 0 }}>
            <b>Update Orders Status</b>
          </p>
          <div>
            <Form
              name="form"
              form={form}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              fields={[
                {
                  name: ['orderStatus'],
                  value: rowData?.order_status,

                },
              ]}
            >
              <Form.Item name="orderStatus">
                <Select
                  onChange={handleChange}
                  placeholder={<Badge status="default" text="New Order" />}
                  style={{
                    width: 230,
                    marginTop: 20,
                    alignItems: 'center',
                  }}
                  options={[
                    {
                      value: 'New Order',
                      label: <Badge status="default" text="New Order" />,
                    },
                    {
                      value: 'Processing',
                      label: <Badge status="processing" text="Processing" />,
                    },
                    {
                      value: 'Finished',
                      label: <Badge status="success" text="Finished" />,
                    },
                  ]}
                />
              </Form.Item>
              <Button
                type="primary"
                style={{ float: 'right', marginRight: -80, marginTop: -56 }}
                htmlType="submit"
                onClick={success}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Modal>

      {/* modal payment */}

      <Modal
        open={isModalPayment}
        footer={null}
        onOk={handleOkPayment}
        onCancel={handleCancelPayment}
        closeIcon={<CloseSquareFilled style={{ color: 'red', fontSize: 20 }} />}
      >
        <div className="modalheader">
          <p className="titlemodal">
            <b>Payment Status</b>
          </p>
          <p className="subtitle">Here, you can see the order details</p>
        </div>
        <hr style={{ marginTop: '-8px' }}></hr>
        <p className="titledetail">
          <b>Orders Detail</b>
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
              <b>{rowDataPayments?.status}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.orderId}</b>
            </p>
            <p className="subrespon">
              <b>Dine In</b>
            </p>
            <p className="subrespon">
              <b>4</b>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="modalprice">
            <p className="pricee">
              <b>Total</b>
            </p>
            <p className="method" style={{ marginTop: '-0px' }}>
              Payment method
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <p className="nomprice" style={{ marginTop: '-15px' }}>
              <b>{rowData?.total_price}</b>
            </p>
            <p
              className="paymentmet"
              style={{ marginTop: 0, textAlign: 'end' }}
            >
              <b>Cash</b>
            </p>
          </div>
        </div>
        <hr />
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: '-15px',
            alignItems: 'center',
          }}
        >
          <p style={{ marginTop: 0 }}>
            <b>Update Payments Status</b>
          </p>
          <div>
            <Form
              name="form"
              form={form}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              fields={[
                {
                  name: ['paymentStatus'],
                  value: rowData?.paymentStatus,
                },
              ]}
            >
              <Form.Item name="paymentStatus">
                <Select
                  onChange={handleChange}
                  placeholder={<Badge status="default" text="Not yet paid" />}
                  style={{
                    width: 200,
                    marginTop: 20,
                    alignItems: 'center',
                  }}
                  options={[
                    {
                      value: 'Not yet paid',
                      label: <Badge status="default" text="New yet paid" />,
                    },
                    {
                      value: 'Already paid',
                      label: <Badge status="processing" text="Already paid" />,
                    },
                  ]}
                />
              </Form.Item>
              <Button
                type="primary"
                style={{ float: 'right', marginRight: -80, marginTop: -56 }}
                htmlType="submit"
                onClick={successPayment}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderPage;
