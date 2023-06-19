import React, { useState } from 'react';
import { Row, Breadcrumb, Form, Input, Radio, Upload, Modal, Col, Space, Button, Spin } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './editMenu.css';
import soto from '../../../assets/images/soto.jpg';


const EditMenu = () => {

    // form edit menu
    const [formEditMenu] = Form.useForm();

    const onAdd = (values) => {
        formEditMenu.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { TextArea } = Input;

    //  modal
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true)
    }
    const handleOk = () => {
        setModalOpen(false)
    }
    const handleCancelModal = () => {
        setModalOpen(false)
    }

    return (
        <div className='body'>
            <Row className="container-header-profile">
                <Breadcrumb
                    items={[
                        {
                            title: "Menus",
                        },
                        {
                            title: "Edit Menu",
                        },
                    ]}
                />
                <span className="textorder">Edit Menu</span>
            </Row>

            <Row justify="center" align="middle" style={{ marginLeft: 200 }}>
                <Col>
                    <Form
                        name='formEditMenu'
                        form={formEditMenu}
                        onFinish={onAdd}
                        onFinishFailed={onFinishFailed}

                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        labelAlign='left'
                        style={{
                            width: 900,
                            margin: 50
                        }}
                    >
                        <div style={{ display: 'flex', gap: 40 }}>
                            <div style={{ width: 500 }} >
                                <Form.Item label="Name">
                                    <Input placeholder={'Soto Ayam '} />
                                </Form.Item>
                                <Form.Item label="Radio">
                                    <Radio.Group>
                                        <Radio value="Foods"> Foods </Radio>
                                        <Radio value="Drinks"> Drinks </Radio>
                                        <Radio value="Saving Packages"> Saving Packages </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="City">
                                    <Input placeholder={'Jakarta'} />
                                </Form.Item>
                                <Form.Item label="Total Calories">
                                    <Input placeholder={'215kkal'} />
                                </Form.Item>
                                <Form.Item label="Price"
                                    >
                                    <Input placeholder={'Rp 15.000'} />
                                </Form.Item>
                                <Form.Item label="Ingredients">
                                    <TextArea rows={4} placeholder='Soto ayam berasa dari daerah DKI Jakarta dan juga merupakan salah satu makanan Nusantara populer' />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea rows={4} placeholder='Daging Ayam, Bawang, Bawang Putih, Kemiri, Kunyit, Jahe, dan Minyak Zaitun.' />
                                </Form.Item>
                            </div>
                            <div style={{ width: 150 }}>
                                <Col className="col-img-profile">
                                    <Row>
                                        <img
                                            src={soto}
                                            alt="avatar-profile"
                                            style={{ width: 200, height: 200 }}
                                        />
                                    </Row>
                                </Col>
                            </div>
                        </div>

                        <Space style={{ display: 'flex', marginLeft: 105 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    borderRadius: '0%'
                                }}
                                onClick={showModal}
                            >
                                Save
                            </Button>
                            <Button type="primary" className='buttoncancel' >
                                Cancel
                            </Button>
                        </Space>
                    </Form>
                </Col>
            </Row>

            {/* modal confirm */}
            <Modal style={{
                marginTop: 100
            }} open={modalOpen} footer={null} closable={false} onOk={handleOk} onCancel={handleCancelModal}>
                <div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <CheckCircleOutlined style={{ color: "greenyellow", fontSize: 17, marginTop: 20 }} />
                        <div>
                            <p style={{ fontSize: 16 }}>Your data has been saved! <br /> <span style={{ fontSize: 14 }}>Click done to continue</span></p>
                        </div>
                    </div>
                    <span>
                        <Button type="primary" style={{ marginLeft: 400 }} onClick={handleOk} >
                            Done
                        </Button>
                    </span>
                </div>
            </Modal>
        </div>
    );
}

export default EditMenu;
