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

const MenuPage = () => {
  const { Search } = Input;
  const [isLoadingMenu, menu, getMenu] = useGetMenu();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchData, setSearchData] = useState();
  // const [key, setKey] = useState("Intelligent");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    getMenu((data) => {
      setSearchData(data);
    });
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
    {
      key: "All",
      label: `All`,
    },
    {
      key: "Intelligent",
      label: `Food`,
    },
    {
      key: "Drink",
      label: `Drink`,
    },
    {
      key: "Saving & Package",
      label: `Saving & Package`,
    },
  ];

  // const categoryFilter = (key) => {
  //   const filteredData = menu.filter((item) => {
  //     const isMatchMenu = key
  //       ? item.name.toLowerCase().includes(key.toLowerCase())
  //       : true;
  //     return isMatchMenu;
  //   });
  //   setSearchData(filteredData);
  // };

  // if (key === "Intelligent") {
  //   const filteredCategory = menu.filter((item) => {
  //     const isMatchMenu = key
  //       ? item.category.toLowerCase().includes(value.toLowerCase())
  //       : true;
  //     return isMatchMenu;
  //   });
  //   setSearchData(filteredCategory);
  // } else if (key === "Drink") {
  //   searchData?.filter((data) => data.category === "Drink");
  // } else {
  //   searchData?.filter((data) => data.category !== "Intelligent" && data.category !== "Drink");
  // }


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
        <Row justify="space-between">
          <Tabs
            defaultActiveKey="All"
            onChange={handleTabChange}
            items={items}
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
