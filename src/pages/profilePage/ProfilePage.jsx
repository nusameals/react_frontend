import React, { useEffect } from "react";
import "./profile.css";
import { Breadcrumb, Button, Card, Col, Row, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { mangga } from "../../assets";
import { Link, useParams } from "react-router-dom";
import { useGetProfileById } from "./hooks/useProfile";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";

const ProfilePage = () => {
  const { id } = useParams();

  const [isLoadingProfileById, profileById, getProfileById] =
    useGetProfileById(id);

  // useEffect(() => {
  //   getProfileById();
  // }, []);

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
          ]}
        />
        <span className="text-profile">My Profile</span>
      </Row>

      <Row justify="center" align="middle" className="container-profile-card">
        <Card className="card-profile">
          <Button
            type="text"
            icon={<ArrowLeftOutlined style={{ padding: "0px" }} />}
            className="btn-back-profile"
          >
            Back
          </Button>
          {/* {isLoadingProfileById ? (
            <LoadingComponent />
          ) : (
            profileById && ( */}
              <Row className="row-content-profile">
                <Col className="col-text-profile">
                  <Row className="name-profile">
                    <span className="text-name">Username</span>
                    <span className="text-profile-name">
                      {/* {profileById.username} */}
                      {localStorage.getItem("username")}
                    </span>
                  </Row>
                  <Row className="name-profile">
                    <span className="text-name">Gender</span>
                    <span className="text-profile-name">Male</span>
                  </Row>
                  <Row className="name-profile">
                    <span className="text-name">Phone</span>
                    <span className="text-profile-name">081234567890</span>
                  </Row>
                </Col>
                <Col className="col-img-profile">
                  <Row>
                    <Space direction="vertical">
                      <img
                        src={mangga}
                        alt="avatar-profile"
                        className="avatar-profile"
                      />
                      <Link to="/edit-profile">
                        <Button className="btn-edit-profile">
                          Edit Profile
                        </Button>
                      </Link>
                    </Space>
                  </Row>
                </Col>
              </Row>
            {/* )
          )} */}
        </Card>
      </Row>
    </>
  );
};

export default ProfilePage;
