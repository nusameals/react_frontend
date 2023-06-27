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
import { useGetOrders, useGetPaymentByOrderId, useGetPayments, useUpdateOrders } from './hook/useOrder';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const OrderPage = () => {

  const { id } = useParams();

  // data order
  const [isLoadingOrders, orders, getOrders] = useGetOrders();
  const [isLoadingPayments, payments, getPayments] = useGetPayments();
  const [isLoadingPaymentsByOrderId, paymentsByOrderId, getPaymentsByOrderId] =
    useGetPaymentByOrderId();
  const [isLoadingUpdateOrders, updateOrders] = useUpdateOrders();

  const [rowData, setRowData] = useState(orders);
  const [rowDataPayments, setRowDataPayments] = useState(payments);

  const getPaymentsByOrderID = (id) => {
    const payment = payments?.find((item) => item?.id === id);
    return payment;
  };

  // call hook
  useEffect(() => {
    getOrders();
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
  const showModalpayment = (data) => {
    console.log(data.id)
    setRowData(data);
    getPaymentsByOrderId(data.id, () => setIsModalPayment(true));
  };
  const handleOkPayment = () => {
    setIsModalPayment(false);
  };
  const handleCancelPayment = () => {
    setIsModalPayment(false);
  };

  function updateOrder(values) {
    updateOrders(rowData.id, values, () => {
      getOrders()
    });
    console.log(rowData.id)
  }

  // confirm
  const success = () => {
    Modal.success({
      content: (
        <p>
          Update orders status success! <br />
          Click done to continue
        </p>
      ),
      onOk: setIsModalOrder(false),
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
      onOk: setIsModalPayment(false),
      style: { marginTop: 135 },
    });
  };

  const { useForm } = Form;
  // form
  const [form] = Form.useForm();
  const [form_payment] = Form.useForm();

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
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <div
          style={{
            color: ' #0669BD',
          }}
        >
          {record.id}
        </div>
      ),
    },
    {
      title: 'Date Order',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      sortDirections: ["ascend", "descend"],
      render: (date) => dayjs(date).format("DD-MM-YYYY hh:mm"),
    },
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.id)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.created_at)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.user_id)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.type_order).toLowerCase().includes(value.toLowerCase()) ||
          String(record.order_status)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.payment_status)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'type_order',
      key: 'type_order',
      sorter: (a, b) => a.type_order - b.type_order,
    },
    {
      title: 'Order Status',
      dataIndex: 'order_status',
      key: 'order_status',
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.order_status - b.order_status,
      render: (_, record) => (
        <Badge status="processing" text={record.order_status} />
      ),
    },
    {
      title: 'Payment Status',
      dataIndex: ['status', 'id'],
      key: 'payment_status',
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.payment_status - b.payment_status,
      render: (_, record) => {
        return (
          <Badge status="success" text={getPaymentsByOrderID(record.id)?.payment_status || 'Not Yet Paid'} />
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
            <p className="subdetail">User ID</p>
            <p className="subdetail">Order Number</p>
            <p className="subdetail">Type</p>
            <p className="subdetail">Table Number</p>
          </div>

          <div className="modalrespon">
            <p className="subrespon">
              <b>{rowData?.user_id}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.id}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.type_order}</b>
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
            <p className="nomprice" style={{ marginTop: '-5px' }}>
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
              onFinish={updateOrder}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              fields={[
                {
                  name: ['order_status'],
                  value: rowData?.order_status,

                },
              ]}
            >
              <Form.Item name="order_status">
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
            <p className="subdetail">User ID</p>
            <p className="subdetail">Order Number</p>
            <p className="subdetail">Type</p>
            <p className="subdetail">Table Number</p>
          </div>

          <div className="modalrespon">
            <p className="subrespon">
              <b>{rowData?.user_id}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.id}</b>
            </p>
            <p className="subrespon">
              <b>{rowData?.type_order}</b>
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
            <p className="method" style={{ marginTop: '0px' }}>
              Payment method
            </p>
          </div>

          <div style={{ marginTop: 20 }}>
            <p className="nomprice" style={{ marginTop: '0px' }}>
              <b>{rowData?.total_price}</b>
            </p>
            <p
              className="paymentmet"
              style={{ marginTop: 0, textAlign: 'end' }}
            >
              <b>{paymentsByOrderId?.payment_methods}</b>
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
              name="form_payment"
              form={form_payment}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
              fields={[
                {
                  name: ['payment_status'],
                  value: paymentsByOrderId?.payment_status,
                },
              ]}
            >
              <Form.Item name="payment_status">
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
