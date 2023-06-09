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
  Card,
} from "antd";
import {
  CheckCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./addTable.css";
import { useMutation, gql } from "@apollo/client";
import { maintenance } from "../../../assets/index";

export const ADD_TABLE = gql`
  mutation user($object: table_insert_input!) {
    insert_table_one(object: $object) {
      uuid
    }
  }
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddTable = () => {
  const [formTable] = Form.useForm();
  const onAdd = (values) => {
    formTable.resetFields();
    console.log({ values });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { TextArea } = Input;

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
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChangePreview = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
          width: "500px",
        }}
      >
        Upload
      </div>
    </div>
  );

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

  const [loading, setLoading] = useState();

  const onLoading = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="body">
      <Row className="container-header-profile">
        <Breadcrumb
          items={[
            {
              title: "Reservations",
            },
            {
              title: "Reservation Data",
            },
            {
              title: "Create Data Table",
            },
          ]}
        />
        <span className="textorder">Create Data Table</span>
      </Row>

      <Row justify="center" align="middle" style={{ marginLeft: 0 }}>
        <Col>
          <Card style={{ margin: "10% 8%" }}>
            <Form
              name="formTable"
              form={formTable}
              onFinish={onAdd}
              onFinishFailed={onFinishFailed}
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                width: 900,
                margin: 50,
              }}
            >
              <div style={{ display: "flex", gap: 40 }}>
                <div style={{ width: 600, textAlign: "left" }}>
                  <Form.Item
                    label="Number of table"
                    name="numberofTables"
                    rules={[
                      {
                        required: true,
                        pattern: /^\d+$/,

                        message: "Please enter number of table",
                      },
                    ]}
                  >
                    <Input placeholder={"Please enter the number of table"} />
                  </Form.Item>
                  <Form.Item
                    label="Seats"
                    name="seats"
                    rules={[
                      {
                        required: true,
                        pattern: /^\d+$/,
                        message: "Please enter a valid number",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter seat quantity" />
                  </Form.Item>
                  <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a type",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="Indoor"> Indoor </Radio>
                      <Radio value="Outdoor"> Outdoor </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label="Tables location"
                    name="detail"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a location",
                      },
                    ]}
                  >
                    <Input
                      placeholder={"Please enter tables location in restaurant"}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item>
                    <div></div>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChangePreview}
                    >
                      {fileList.length === 1 ? null : uploadButton}
                    </Upload>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="avatar"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </div>
              </div>

              <Space style={{ display: "flex", marginLeft: 130 }}>
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
          </Card>
        </Col>
      </Row>

      <Modal
        footer={null}
        open={modalOpen}
        onCancel={handleCancelModal}
        width={864}
      >
        <div className="modal-repass">
          <h1>Sorry, this feature is under maintenance!</h1>
          <img
            src={maintenance}
            alt="forget-pass"
            style={{ width: 369, height: 320 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddTable;
