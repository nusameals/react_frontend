import React from 'react';
import { Row, Breadcrumb, Form, Input, Radio } from 'antd';
import './createMenu.css'

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
                layout='horizontal'
            >
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
            </Form>
        </div>
    );
}

export default CreateMenu;
