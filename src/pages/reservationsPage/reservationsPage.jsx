import React,  { useState, useEffect } from 'react'
import { Breadcrumb, Button, Form, Card, Col, Row, Space } from "antd";
import { Checkbox, Input, Select, Radio, InputNumber, Table   , Modal, Popconfirm, Upload } from 'antd';

import axios from 'axios';



  
export const ReservationsPage = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingKey, setEditingKey] = useState('');
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('https://64828ad5f2e76ae1b95b4a4d.mockapi.io/products');
        setDataSource(response.data);
      } catch (error) {
        console.log(error);
      }
    };  
      const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productname',
      key: 'productname',
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
    },
    {
      title: 'Product Freshness',
      dataIndex: 'productfreshness',
      key: 'productfreshness',
    },
    {
      title: 'Additional Description',
      dataIndex: 'addictionalDescription',
      key: 'addictionalDescription',
    },
    {
      title: 'Product Quantity',
      dataIndex: 'productQuantity',
      key: 'productQuantity',
    },
    {
      title: 'Product Image',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (text, record) => (
        <img src={record.productImage} alt="Product" style={{ width: '50px', height: 'auto' }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const editable = isEditing(record);
        return (
          <Space size="middle">
            {editable ? (
              <span>
                <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                  Save
                </a>
                <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
              </a>
            )}
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      productname: '',
      productCategory: '',
      productfreshness: '',
      addictionalDescription: '',
      productQuantity: '',
      productImage: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      const updatedProduct = {
        key,
        productname: row.productname,
        productCategory: row.productCategory,
        productfreshness: row.productfreshness,
        addictionalDescription: row.addictionalDescription,
        productQuantity: row.productQuantity,
        productImage: row.productImage,
      };
      if (index > -1) {
        newData.splice(index, 1, updatedProduct);
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(updatedProduct);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (err) {
      console.log('Validate Failed:', err);
    }
  };

  const handleDelete = (key) => {
    const newData = [...dataSource];
    setDataSource(newData.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    setVisible(true);
  };

  const handleModalCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newData = [...dataSource];
        const key = uuidv4();
        const newProduct = {
          key,
          productname: values.productname,
          productCategory: values.productCategory,
          productfreshness: values.productfreshness,
          addictionalDescription: values.addictionalDescription,
          productQuantity: values.productQuantity,
          productImage: values.productImage && values.productImage[0].originFileObj,
        };
        newData.push(newProduct);
        setDataSource(newData);
        setVisible(false);
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log('Validate Failed:', errorInfo);
      });
  };
  return (      
    <div>      <Row className="container-header-profile">
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
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
      />

  </div>

  )
}
export default ReservationsPage;

