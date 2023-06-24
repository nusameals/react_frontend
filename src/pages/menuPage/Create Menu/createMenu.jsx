import React, { useState } from 'react';
import { Row, Breadcrumb, Form, Input, Radio, Upload, Modal, Col, Space, Button, Spin } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './createMenu.css';
import { useGetMenu, usePostMenu } from '../hooks/useMenus';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreateMenu = () => {

    const [isLoadingCreateMenu, createMenu] = usePostMenu();
    const [menu, getMenu] = useGetMenu();
    const [rowData, setRowData] = useState(menu);

    // form menu
    const [formMenu] = Form.useForm();
    const onAdd = (values) => {
        createMenu(values, () => {
            getMenu()
            formMenu.resetFields();
        })
        console.log({ values })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { TextArea } = Input;

    // form upload
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChangePreview = ({ fileList: newFileList }) => setFileList(newFileList);

    // upload button
    const uploadButton = (
        <div >
            <PlusOutlined />
            <div style={{
                marginTop: 8,

            }}>
                Upload
            </div>
        </div>
    )

    // modal
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

    // loading
    const [loading, setLoading] = useState();

    const onLoading = (
        <LoadingOutlined
            style={{ fontSize: 24 }}
            spin />
    );

    return (
        <div className='body'>
            <Row className="container-header-profile">
                <Breadcrumb
                    items={[
                        {
                            title: "Menus",
                        },
                        {
                            title: "Create Menu",
                        },
                    ]}
                />
                <span className="textorder">Create Menu</span>
            </Row>

            <Row justify="center" align="middle" style={{ marginLeft: 200 }}>
                <Col>
                    <Form
                        name='formMenu'
                        form={formMenu}
                        onFinish={onAdd}
                        onFinishFailed={onFinishFailed}

                        fields={[
                            {
                                name: ['name'],
                                value: rowData?.name,
                            },
                            {
                                name: ['city'],
                                value: rowData?.city,
                            },
                            {
                                name: ['calories'],
                                value: rowData?.calories,
                            },
                            {
                                name: ['price'],
                                value: rowData?.price,
                            },
                            {
                                name: ['images'],
                                value: rowData?.images,
                            },
                        ]}

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
                                <Form.Item label="Name" name='name'>
                                    <Input placeholder={'Please enter '} />
                                </Form.Item>
                                <Form.Item label="Radio">
                                    <Radio.Group>
                                        <Radio value="Foods"> Foods </Radio>
                                        <Radio value="Drinks"> Drinks </Radio>
                                        <Radio value="Saving Packages"> Saving Packages </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="City" name="city">
                                    <Input placeholder={'Please enter the city of food'} />
                                </Form.Item>
                                <Form.Item label="Total Calories" name={"calories"}>
                                    <Input placeholder={'Please enter the calories'} />
                                </Form.Item>
                                <Form.Item label="Price" name="price"
                                >
                                    <Input placeholder={'Please enter the price'} />
                                </Form.Item>
                                <Form.Item label="Ingredients">
                                    <TextArea rows={4} placeholder='Please enter the ingredients' />
                                </Form.Item>
                                <Form.Item label="Description">
                                    <TextArea rows={4} placeholder='Please enter the description of menu' />
                                </Form.Item>
                            </div>
                            <div style={{ width: 150 }}>
                                <Form.Item name='images'>
                                    <Upload
                                        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                        listType='picture-card'
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChangePreview}
                                    >
                                        {fileList.length === 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                        <img
                                            alt='avatar'
                                            style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </Form.Item>
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
                                loading={isLoadingCreateMenu}
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
                        <Button type="primary" style={{ marginLeft: 400 }} onClick={handleOk} loading={loading}>
                            Done
                        </Button>
                    </span>
                </div>
            </Modal>
        </div>
    );
}

export default CreateMenu;
