import React, { useState } from 'react';
import { Breadcrumb, Row, Table, Space, Modal, Badge, Select, Button, Form, Input, Spin } from "antd";
import './orderPage.css'
import { CloseSquareFilled, LoadingOutlined } from '@ant-design/icons';

const OrderPage = () => {

    // search
    const [searchedText, setSearchedText] = useState("")

    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // loading
    const antIcon = (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
    )

    // confirm
    const success = () => {
        Modal.success({
            content: <p>Update orders status success! <br />Click done to continue</p>,
            okText: 'Done',
            style: { marginTop: 135 },

        })

    }

    const [form] = Form.useForm();

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            orderId: `12345${i}`,
            dateOrder: '2021-02-05 08:28:36',
            customerName: `Kim Taehyung ${i}`,
            type: 'dine in',
        });
    }

    const [rowData, setRowData] = useState(data);

    const onAdd = (values) => {

        form.resetFields();

        console.log({ values })
    };

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
            render: (_, record) =>
                <div
                    style={{
                        color: ' #0669BD'
                    }}>{record.orderId}</div>
        },
        {
            title: 'Date Order',
            dataIndex: 'dateOrder',
            key: 'dateOrder',
            sorter: (a, b) => a.dateOrder - b.dateOrder
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return (
                    String(record.orderId).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.dateOrder).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.customerName).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.type).toLowerCase().includes(value.toLowerCase())
                )
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a.type - b.type
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            sorter: (a, b) => a.orderStatus - b.orderStatus,
            render: () => <Badge status="processing" text='Processing' />
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            sorter: (a, b) => a.paymentStatus - b.paymentStatus,
            render: () => <Badge status="success" text='Already payment' />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) =>

                <Space>
                    <a
                        style={{
                            color: ' #0669BD'
                        }} onClick={showModal}>Update orders</a>
                    <Modal
                        open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} closeIcon={<CloseSquareFilled style={{ color: 'red', fontSize: 20 }} />}>
                        <div className='modalheader'>
                            <p className='titlemodal'><b>Orders Status</b></p>
                            <p className='subtitle'>Here, you can see the order details</p>
                        </div>
                        <hr style={{ marginTop: '-8px' }}></hr>
                        <p className='titledetail'><b>Orders Detail</b></p>
                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div className='modalisian'>
                                <p className='subdetail'>Customer Name</p>
                                <p className='subdetail'>Order Number</p>
                                <p className='subdetail'>Type</p>
                                <p className='subdetail'>Table Number</p>
                            </div>

                            <div className='modalrespon'>
                                <p className='subrespon'><b>Trina</b></p>
                                <p className='subrespon'><b>67890</b></p>
                                <p className='subrespon'><b>Dine In</b></p>
                                <p className='subrespon' ><b>4</b></p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: "space-between" }}>
                            <div className='modalprice'>
                                <ul>
                                    <li className='modalpesan'>Soto Ayam x 3</li>
                                </ul>
                                <p className='pricee'><b>Total</b></p>
                                <p className='method' style={{ marginTop: '-0px' }}>Payment method</p>
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <p className='nomprice'><b>Rp 75.000</b></p>
                                <p className='nomprice' style={{ marginTop: '-15px' }}><b>Rp 75.000</b></p>
                                <p className='paymentmet' style={{ marginTop: 0, textAlign: 'end' }} ><b>Cash</b></p>
                            </div>
                        </div>
                        <hr />
                        <div style={{ display: 'flex', gap: 10, marginTop: '-15px', alignItems: "center" }}>
                            <p style={{ marginTop: 0 }}><b>Update Orders Status</b></p>
                            <div >
                                <Form
                                    name='form'
                                    form={form}
                                    onFinish={onAdd}
                                    onFinishFailed={onFinishFailed}
                                    layout='horizontal'
                                    fields={[
                                        {
                                            name: ['orderStatus'],
                                            value: rowData?.orderStatus,
                                        },
                                    ]}>
                                    <Form.Item
                                        name='orderStatus'
                                    ><Select

                                            onChange={handleChange}
                                            placeholder={<Badge status="default" text='New Order' />}
                                            style={{
                                                width: 230,
                                                marginTop: 20,
                                                alignItems: 'center'
                                            }}
                                            options={[
                                                {
                                                    value: 'New Order',
                                                    label: <Badge status="default" text='New Order' />
                                                },
                                                {
                                                    value: 'Processing',
                                                    label: <Badge status="processing" text='Processing' />
                                                },
                                                {
                                                    value: 'Finished',
                                                    label: <Badge status="success" text='Finished' />
                                                },
                                            ]}
                                        /></Form.Item>
                                    <Button type="primary" style={{ float: 'right', marginRight: -80, marginTop: -56 }} htmlType='submit' onClick={success}>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Modal>
                    <a
                        style={{
                            color: ' #0669BD'
                        }}
                    >Update Payments</a>
                </Space >

        },
    ]

    const onChange = (filters, sorter) => {
        console.log('params', filters, sorter);
    };


    return (
        <div>
            <Row className="container-header-profile">
                <Breadcrumb
                    items={[
                        {
                            title: "Orders",
                        },
                        {
                            title: "Orders Data",
                        },
                    ]}
                />
                <span className="textorder">Orders Data</span>
            </Row>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', margin: '10px 60px', marginBottom: '-20px' }}>
                <span style={{ fontSize: 14 }}>Search:</span>
                <Input.Search placeholder='Please enter' style={{
                    width: 500,
                }}
                    onSearch={(value) => {
                        setSearchedText(value)
                    }}
                    onChange={(e) => {
                        setSearchedText(e.target.value)
                    }} />
            </div>
            <Table
                style={{
                    margin: '50px 60px',
                }}
                rowKey="id"
                columns={TABLE_COLUMNS}
                onChange={onChange}
                dataSource={data}
            />
        </div>
    );
}

export default OrderPage;
