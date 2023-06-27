import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  Upload,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TABLE_BY_PK} from "./query";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";
import { useSingleUploader } from "../../../hooks/useSingleUploader";
import {uploaderConfig} from '../../../config/uploader-config';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditTable = () => {
  const [formAdmin] = Form.useForm();
  const [avatar, setAvatar] = useState("");
  const [isLoadingUpload, uploadFile] = useSingleUploader();
  const navigate = useNavigate();

  const id = localStorage.getItem("id");

  // get profile by id in localstorage
  const {
    data: profileData,
    loading: isProfileLoading,
    error: profileError,
  } = useQuery(GET_PROFILE_BY_PK, {
    variables: { id },
  });

  const [updateAdmin, { loading: isUpdateLoading }] = useMutation(
    UPDATE_PROFILE,
    {
      refetchQueries: [GET_PROFILE_BY_PK],
    }
  );

  const onEdit = (values) => {
    const id = localStorage.getItem("id");
    const body = {
      avatar: avatar,
      ...values,
    };

    updateAdmin({
      variables: { pk_columns: { id: id }, _set: { ...body } },
      onError: (err) => {
       if(!isUpdateLoading){
        // Modal.error({
        //   type: "error",
        //   content: "Gagal Menghapus Data!",
        //   okText: "Done"
        // });
       }
      },
      onCompleted: () => {
        Modal.success({
          type: "success",
          content: "Berhasil Menghapus Data!",
          okText: "Done",
          onOk() {
            navigate(-1)
          },
        });
        handleCancel();
      },
    });
  };

  const handleUpload = async (file) => {
    const body = {
      file: await getBase64(file.file.originFileObj),
      upload_preset: uploaderConfig.upload_preset,
      public_id: file.file.name.replace(/\.[^.]*$/, ""),
      api_key: uploaderConfig.api_key,
    };
    uploadFile(body, (data) => {
      setAvatar(data.url);
    });
  };

  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };

  return (
    <>
      <Row className="container-header-profile">
        <Breadcrumb
          items={[
            {
              title: "Profile",
            },
            {
              title: "My Profile",
            },
            {
              title: "Edit Profile",
            },
          ]}
        />
        <span className="text-edit-profile">Edit Profile</span>
      </Row>

      {isProfileLoading ? (
        <LoadingComponent />
      ) : (
        <Row justify="center" align="middle" className="container-profile-card">
          <Card className="card-edit-profile">
            <Form
              {...layout}
              form={formAdmin}
              onFinish={onEdit}
              className="container-edit-form"
            >
              <Row className="row-content-edit" justify="center" align="middle">
                <Col>
                  <Form.Item label="Username" name="username">
                    <Input
                      style={{ width: "320px" }}
                      placeholder={profileData?.admin_by_pk.username}
                    ></Input>
                  </Form.Item>

                  <Form.Item label="Gender" name="gender">
                    <Radio.Group
                      initialValues={profileData?.admin_by_pk?.gender}
                    >
                      <Space direction="horizontal">
                        <Radio value={"Male"}>Male</Radio>
                        <Radio value={"Female"}>Female</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        pattern: /^\d{11,12}$/,
                        message: "Phone number is not valid!",
                      },
                    ]}
                  >
                    <Input
                      style={{ width: "320px" }}
                      placeholder={profileData?.admin_by_pk.phone}
                    />
                  </Form.Item>
                  <Space className="container-btn-edit-profile">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Link to="/profile-setting">
                      <Button type="danger">Cancel</Button>
                    </Link>
                  </Space>
                </Col>

                <Col className="col-img-profile">
                  <Row>
                    <Form.Item>
                      <Upload
                        showUploadList={false}
                        name="file"
                        maxCount={1}
                        onRemove={() => {
                          setAvatar("");
                        }}
                        customRequest={() => {}}
                        onChange={handleUpload}
                      >
                        {isLoadingUpload ? (
                          <LoadingComponent />
                        ) : (
                          <Button
                            className="btn-edit-admin-ava"
                            style={{ width:"252px" }}
                            icon={<img src={avatar || profileData?.admin_by_pk?.avatar} alt="avatar-profile" className="avatar-profile"/>}
                          />
                        )}
                      </Upload>
                    </Form.Item>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Card>
        </Row>
      )}
    </>
  );
};

export default EditTable;
