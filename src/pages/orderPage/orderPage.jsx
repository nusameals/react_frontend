import React from 'react';
import { Breadcrumb, Row, Table, Space, Popconfirm, Badge } from "antd";
import './orderPage.css'

const OrderPage = () => {

    const TABLE_COLUMNS = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
            render: (_, record) =>
                <a
                    style={{
                        color: 'blue'
                    }} onClick={() => handleEdit(record)}></a>
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
            key: 'customerName'
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
            sorter: (a, b) => a.orderStatus - b.orderStatus
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            sorter: (a, b) => a.paymentStatus - b.paymentStatus,
            render: () => <Badge status="success" text="Finished" />
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) =>

                <Space>
                    <a
                        style={{
                            color: 'blue'
                        }} onClick={() => handleEdit(record)}>Update orders</a>
                    <Popconfirm
                        title='sure to delete'
                        arrow={false}
                        onConfirm={() => onDelete(record.id)}
                    >
                        <a
                            style={{
                                color: 'blue'
                            }}>Update Payments</a>
                    </Popconfirm>
                </Space >

        },
    ]

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            orderId: `Edward ${i}`,
            dateOrder: 32,
            customerName: `London Park no. ${i}`,
        });
    }

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
