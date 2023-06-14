import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <h1>ADMIN PAGE</h1>
      <Link to="/">
        <Button
          type="primary"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("id");
          }}
          danger
        >
          Logout
        </Button>
      </Link>
    </div>
  );
};

export default AdminPage;
