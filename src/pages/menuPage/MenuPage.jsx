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
  Tabs,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./menu.css";
import { INITIAL_TABLE_DATA } from "./Constant";
import { useGetMenu } from "./hooks/useMenus";
import { Link, useParams } from "react-router-dom";

const MenuPage = () => {
  const { Search } = Input;
  const [isLoadingMenu, menu, getMenu] = useGetMenu();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState();
  // const [key, setKey] = useState("Intelligent");
  const [activeCategory, setActiveCategory] = useState("makanan");
  const { id } = useParams();

  useEffect(() => {
    getMenu((data) => {
      setSearchData(
        data.filter((item) => {
          const isMatchCategory = item.category === "makanan";
          return isMatchCategory;
        })
      );
    });
  }, []);

  const onSearch = (value) => console.log(value);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  };

  const paginationConfig = {
    total: searchData,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}items`,
    defaultPageSize: 10,
    defaultCurrent: 1,
    current: currentPage,
    onChange: (page) => setCurrentPage(page),
  };

  // console.log(searchData)

  const TABLE_COLUMNS = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (_, record, index) => (
        <img
          src={record.images}
          alt={`images-${index}`}
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
          <Link to={`${record.id}`}>
            <Button type="link">View Detail</Button>
          </Link>
        ) : null,
    },
  ];

  const handleSearch = (value) => {
    const filteredData = menu.filter((item) => {
      const isMatchMenu = value
        ? item.name.toLowerCase().includes(value.toLowerCase())
        : true;
      return isMatchMenu;
    });
    setSearchData(filteredData);
  };

  const items = [
    // {
    //   key: "All",
    //   label: `All`,
    // },
    {
      key: "makanan",
      label: `Food`,
    },
    {
      key: "minuman",
      label: `Drink`,
    },
    {
      key: "saving packages",
      label: `Saving & Package`,
    },
  ];

  const handleTabChange = (key) => {
    setActiveCategory(key);
    if (key === "All") {
      setSearchData(menu);
    } else {
      const filteredData = menu.filter((item) => {
        const isMatchCategory = item.category === key;
        return isMatchCategory;
      });
      setSearchData(filteredData);
    }
  };

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
          onSearch={handleSearch}
          className="menu-search-box"
        />
        <Row justify="space-between" style={{ width: "100%" }}>
          <Tabs
            defaultActiveKey="makanan"
            onChange={handleTabChange}
            items={items}
          />
          <Link to="/menu-page-create">
            <Button className="btn-add-menu" type="primary">
              Add Menu
            </Button>
          </Link>
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
              rowKey="ID"
              columns={TABLE_COLUMNS}
              dataSource={searchData}
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
