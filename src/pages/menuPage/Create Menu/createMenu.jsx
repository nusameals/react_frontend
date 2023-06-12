import React, { useState } from 'react';
import { Row, Breadcrumb, Form, Input, Radio, Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './createMenu.css';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const CreateMenu = () => {

    // form menu
    const [formMenu] = Form.useForm();
    const onAdd = (values) => {

        formMenu.resetFields();

        console.log({ values })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { TextArea } = Input;

    const [avatar, setAvatar] = useState("");
    const [isLoadingUpload, uploadFile] = useSingleUploader(false);

    // upload img
    const handleChange = async (file) => {
        const body = {
            file: await getBase64(file.file.originalFileObj),
            upload_preset: uploaderConfig.upload_preset,
            public_id: file.file.name.replace(/\.[^.]*$/, ""),
            api_key: uploaderConfig.api_key,
        };
        uploadFile(body, (data) => {
            SkeletonAvatar(data.url);
        });
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>
                Upload
            </div>
        </div>
    )

    return (
        <div>
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

            <Form
                name='formMenu'
                form={formMenu}
                onFinish={onAdd}
                onFinishFailed={onFinishFailed}

                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                labelAlign='left'
                style={{
                    width: 900
                }}
            >
                <div style={{ display: 'flex', gap: 40 }}>
                    <div style={{ width: 500 }} >
                        <Form.Item label="Name">
                            <Input placeholder={'Please enter '} />
                        </Form.Item>
                        <Form.Item label="Radio">
                            <Radio.Group>
                                <Radio value="Foods"> Foods </Radio>
                                <Radio value="Drinks"> Drinks </Radio>
                                <Radio value="Saving Packages"> Saving Packages </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="City">
                            <Input placeholder={'Please enter the city of food'} />
                        </Form.Item>
                        <Form.Item label="Total Calories">
                            <Input placeholder={'Please enter the the calories'} />
                        </Form.Item>
                        <Form.Item label="Ingredients">
                            <TextArea rows={4} placeholder='Please enter the ingredients' />
                        </Form.Item>
                        <Form.Item label="Description">
                            <TextArea rows={4} placeholder='Please enter the description of menu' />
                        </Form.Item>
                    </div>
                    <div style={{ width: 150 }}>
                        <Form.Item label='avatar'
                        >
                            <Upload
                                showUploadList={false}
                                name='file'
                                maxCount={1}
                                onRemove={() => { }}
                                onChange={handleChange} >
                                <Button
                                    icon={<UploadOutlined />}
                                    type={!avatar ? 'dashed' : 'default'}>
                                    {avatar ? 'Change Avatar' : 'Upload Avatar'}
                                </Button>
                            </Upload>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default CreateMenu;
