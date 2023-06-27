import React, { useState } from "react";
import {
  Row,
  Breadcrumb,
  Form,
  Input,
  Radio,
  Upload,
  Modal,
  Col,
  Space,
  Button,
  Spin,
  Image,
  InputNumber,
} from "antd";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./createMenu.css";
import { uploaderConfig } from "../../../config/uploader-config";
import { useGetMenu, usePostMenu, useUploader } from "../hooks/useMenus";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";
import { Link } from "react-router-dom";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateMenu = () => {
  const [isLoadingUpload, uploadFile] = useUploader();
  const [isLoadingPostMenu, createMenu] = usePostMenu();
  const [images, setImages] = useState("");
  const [menu, getMenu] = useGetMenu();
  const [rowData, setRowData] = useState(menu);

  // form menu
  const [formMenu] = Form.useForm();

  const onAdd = (values) => {
    const body = {
      images: images,
      ...values,
    };
    createMenu(body, () => {
      showModal();
      formMenu.resetFields();
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { TextArea } = Input;

  const handleUpload = async (file) => {
    const body = {
      file: await getBase64(file.file.originFileObj),
      upload_preset: uploaderConfig.upload_preset,
      public_id: file.file.name.replace(/\.[^.]*$/, ""),
      api_key: uploaderConfig.api_key,
    };
    uploadFile(body, (data) => {
      setImages(data.url);
    });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const handleOk = () => {
    setModalOpen(false);
  };
  const handleCancelModal = () => {
    setModalOpen(false);
  };

  // loading
  const [loading, setLoading] = useState();

  const onLoading = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="body">
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
            name="formMenu"
            form={formMenu}
            onFinish={onAdd}
            onFinishFailed={onFinishFailed}
            fields={[
              {
                name: ["name"],
                value: rowData?.name,
              },
              {
                name: ["city"],
                value: rowData?.city,
              },
              {
                name: ["calories"],
                value: rowData?.calories,
              },
              {
                name: ["price"],
                value: rowData?.price,
              },
              {
                name: ["images"],
                value: rowData?.images,
              },
            ]}
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 18,
            }}
            labelAlign="left"
            style={{
              width: 900,
              margin: 50,
            }}
          >
            <div style={{ display: "flex", gap: 40 }}>
              <div style={{ width: 500 }}>
                <Form.Item label="Name" name="name">
                  <Input placeholder={"Please enter "} />
                </Form.Item>
                <Form.Item label="Radio" name="category_id  ">
                  <Radio.Group>
                    <Radio value={6}>Foods</Radio>
                    <Radio value={2}> Drinks </Radio>
                    <Radio value={3}> Saving Packages </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="City" name="city">
                  <Input placeholder="Please enter the city of food" />
                </Form.Item>
                <Form.Item label="Total Calories" name="calories">
                  <Input placeholder="Please enter the calories" />
                </Form.Item>
                <Form.Item label="Price" name="price">
                  <InputNumber
                    placeholder="Please enter the price"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item label="Ingredients" name="ingredients">
                  <TextArea
                    rows={4}
                    placeholder="Please enter the ingredients"
                  />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <TextArea
                    rows={4}
                    placeholder="Please enter the description of menu"
                  />
                </Form.Item>
              </div>
              <div style={{ width: 150 }}>
                <Form.Item>
                  <Upload
                    name="images"
                    showUploadList={false}
                    maxCount={1}
                    onRemove={() => {
                      setImages("");
                    }}
                    customRequest={() => {}}
                    onChange={handleUpload}
                  >
                    {isLoadingUpload ? (
                      <LoadingComponent />
                    ) : (
                      <Button
                        className="btn-upload"
                        style={{ width: "200px", height: "200px" }}
                      >
                        {!images ? (
                          uploadButton
                        ) : (
                          <img
                            src={images}
                            alt="menu-images"
                            style={{ width: "100%" }}
                          />
                        )}
                      </Button>
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>
            <Space style={{ display: "flex", marginLeft: 105 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  borderRadius: "0%",
                }}
                loading={isLoadingPostMenu}
              >
                Save
              </Button>
              <Link to="/menu-page">
                <Button type="primary" className="buttoncancel">
                  Cancel
                </Button>
              </Link>
            </Space>
          </Form>
        </Col>
      </Row>

      {/* modal confirm */}
      <Modal
        style={{
          marginTop: 100,
        }}
        open={modalOpen}
        footer={null}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancelModal}
      >
        <div>
          <div style={{ display: "flex", gap: 10 }}>
            <CheckCircleOutlined
              style={{ color: "greenyellow", fontSize: 17, marginTop: 20 }}
            />
            <div>
              <p style={{ fontSize: 16 }}>
                Your data has been saved! <br />{" "}
                <span style={{ fontSize: 14 }}>Click done to continue</span>
              </p>
            </div>
          </div>
          <span>
            <Button
              type="primary"
              style={{ marginLeft: 400 }}
              onClick={handleOk}
              loading={loading}
            >
              Done
            </Button>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default CreateMenu;
