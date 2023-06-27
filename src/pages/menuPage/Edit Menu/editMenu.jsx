import React, { useEffect, useState } from "react";
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
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./editMenu.css";
import soto from "../../../assets/images/soto.jpg";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMenu,
  useGetMenuById,
  useUpdateMenu,
  useUploader,
} from "../hooks/useMenus";
import { uploaderConfig } from "../../../config/uploader-config";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoadingUpload, uploadFile] = useUploader();
  const [isLoadingMenuById, menuById, getMenuById] = useGetMenuById(id);
  const [isLoadingUpdateMenu, updateMenu] = useUpdateMenu();
  const [menu, getMenu] = useGetMenu();
  const [images, setImages] = useState("");
  const [rowData, setRowData] = useState(menu);

  useEffect(() => {
    getMenuById();
  }, []);

  // form edit menu
  const [formEditMenu] = Form.useForm();

  const onUpdate = (values) => {
    const id = menuById?.id;
    const body = {
      images: images,
      ...values,
    };
    updateMenu(id, body, () => {
      showModal();
      formEditMenu.resetFields();
    });
    navigate(-2);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { TextArea } = Input;

  //  modal
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

  return (
    <div className="body">
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
            name="formEditMenu"
            form={formEditMenu}
            onFinish={onUpdate}
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
                  <Input placeholder={menuById?.name} />
                </Form.Item>
                <Form.Item label="Radio" name="category_id">
                  <Radio.Group >
                    <Radio value={6}> Foods </Radio>
                    <Radio value={2}> Drinks </Radio>
                    <Radio value={3}> Saving Packages </Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="City" name="city">
                  <Input placeholder={menuById?.city} />
                </Form.Item>
                <Form.Item label="Total Calories" name="calories">
                  <Input placeholder={menuById?.calories} />
                </Form.Item>
                <Form.Item label="Price" name="price">
                  <Input placeholder={menuById?.price} />
                </Form.Item>
                <Form.Item label="Ingredients" name="ingredients">
                  <TextArea rows={4} placeholder={menuById?.ingredients} />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <TextArea rows={4} placeholder={menuById?.description} />
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
                          <img
                            src={menuById?.images}
                            alt="menu-images"
                            style={{ width: "100%" }}
                          />
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
                onClick={showModal}
              >
                Save
              </Button>
              <Button type="primary" className="buttoncancel">
                Cancel
              </Button>
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
            >
              Done
            </Button>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default EditMenu;
