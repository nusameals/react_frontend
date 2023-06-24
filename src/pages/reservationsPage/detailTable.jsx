import { useParams, Link } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Row, Col, Card, Button, Space, Breadcrumb, Modal } from "antd";
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const GET_TABLE = gql`
  query GetTable($id: uuid!) {
    table_by_pk(id: $id) {
      id
      detail
      image
      numberofTables
      seats
      type
    }
  }
`;
const DELETE_TABLE = gql`
  mutation DeleteTable($id: uuid!) {
    delete_table_by_pk(id: $id) {
      id
    }
  }
`;


const DetailTable = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_TABLE, {
    variables: { id },
  });

  const table = data?.table_by_pk;

  const [deleteTable] = useMutation(DELETE_TABLE, {
    onCompleted: () => {
      // Perform any necessary actions after deletion
      // For example, navigate to a different page
    },
    onError: (error) => {
      // Handle error in case of failure
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const showConfirmModal = () => {
    Modal.confirm({
      title: "Delete Table",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this table?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        deleteTable({ variables: { id } });
      },
    });
  };
  return (
    <div>
      {/* <p>ID: {id}</p>
      <p>Detail: {table.detail}</p> */}
      {/* Render other table properties as needed */}
      <Row className="container-header-menu">
        <Breadcrumb
          items={[
            {
              title: "Reservations",
            },
            {
              title: "Reservations Data",
            },
            {
              title: "Table Detail",
            },
          ]}
        />
        <span className="text-menuList">Table Detail</span>
      </Row>
      <Row
        justify="center"
        align="middle"
        className="container-detail-menu-card"
      >
        <Card className="card-detail-menu" style={{height:"480px"}}>
          <Link to="/reservations-page">
            <Button
              type="text"
              icon={<ArrowLeftOutlined style={{ padding: "0px" }} />}
              className="btn-back-menu"
            >
              Back
            </Button>
          </Link>
          <Row className="row-content-detail-menu">
            <Col className="col-text-detail-menu">

                                <Row className="role-detail-menu" justify="space-between">
                    <Col>
                      <span className="text-name">Number of table</span>
                      <span className="text-detail-menu-name">
                        {table.numberofTables}
                      </span>
                    </Col>
                    <Col>
                      <span className="text-name">Seats</span>
                      <span className="text-detail-menu-name">
                        {table.seats}
                      </span>
                    </Col>
                    <Col>
                      <span className="text-name">Type</span>
                      <span className="text-detail-menu-name">
                        {table.type} 
                      </span>
                    </Col>
                  </Row>
                  <Row justify="start" className="name-detail-menu">
                <span className="text-name">Tables location</span>
                <span className="text-detail-menu-name">{table.detail}</span>
              </Row>
            </Col>
            <Col className="col-img-detail-menu">
                  <Row>
                    <Space direction="vertical">
                      <img
                        src={table.image}
                        alt="avatar-detail-menu"
                        className="avatar-detail-menu"
                      />
                      <Row justify="space-between" align="middle" style={{marginTop:"50px",}}>
                        <Button type="primary" className="btn-action-menu" style={{borderRadius:"2px"}}>
                          Edit Menu
                        </Button>
                        <Button
                          type="primary"
                          className="btn-action-menu"
                          danger style={{borderRadius:"2px"}}
                          onClick={showConfirmModal}
                        >
                          Delete Menu
                        </Button>
                      </Row>
                    </Space>
                  </Row>
                </Col>
          </Row>
          
        </Card>
      </Row>
    </div>
  );
};

export default DetailTable;
