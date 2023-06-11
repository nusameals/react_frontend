import React, { useEffect, useState } from "react";
import {
  Row,
  Breadcrumb,
  Input,
  Segmented,
  Card,
  Button,
  Tag,
  Table,
  Popconfirm,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./menu.css";
import { INITIAL_TABLE_DATA } from "./Constant";
import { useGetMenu } from "./hooks/useMenus";

const MenuPage = () => {
  const { Search } = Input;
  const [value, setValue] = useState("Food");
  const [isLoadingMenu, menu, getMenu] = useGetMenu();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getMenu();
  }, []);

  const onSearch = (value) => console.log(value);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const paginationConfig = {
    total: menu,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
    defaultPageSize: 8,
    defaultCurrent: 1,
    current: currentPage,
    onChange: (page) => setCurrentPage(page),
    showSizeChanger: true,
    onShowSizeChange: { onShowSizeChange },
  };

  const TABLE_COLUMNS = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record, index) => (
        <img
          src={record.avatar}
          alt={`avatar-${index}`}
          style={{ height: "30px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        INITIAL_TABLE_DATA.length >= 1 ? (
          <Button type="link">View Detail</Button>
        ) : null,
    },
  ];

  return (
    <>
      <Row className="container-header-menu">
        <Breadcrumb
          items={[
            {
              title: "Menus",
            },
            {
              title: "Menu List",
            },
          ]}
        />
        <span className="text-menuList">Menu List</span>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          className="menu-search-box"
        />
        <Row justify="space-between">
          <Segmented
            style={{ borderRadius: "8px", fontSize: "12px", marginTop: "5px" }}
            value={value}
            onChange={setValue}
            options={[
              {
                label: "Food",
                value: "Food",
              },
              {
                label: "Drink",
                value: "Drink",
              },
              {
                label: "Saving & Package",
                value: "Saving & Package",
              },
            ]}
          />
        </Row>
      </Row>

      <div className="menu-data">
        <Row className="container-table-menu">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Card>
              <span>Category :</span>
              <Tag color="processing" className="tag-all-menu">
                All
              </Tag>
              <span>Low Calories</span>
            </Card>
            <Table
              rowKey="id"
              columns={TABLE_COLUMNS}
              dataSource={menu}
              loading={isLoadingMenu}
              pagination={paginationConfig}
            />
          </Space>
        </Row>
      </div>
    </>
  );
};

export default MenuPage;
