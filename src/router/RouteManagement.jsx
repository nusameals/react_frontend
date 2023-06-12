import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutComponent from "../components/layouts/LayoutComponent";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";

import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";
import AdminPage from "../pages/adminPage/AdminPage";

const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const pathName = window.location.pathname;

  return (
    <Suspense fallback={<LoadingComponent />}>
      {!token && pathName === "/" ? (
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </LayoutComponent>
      ) : !token && pathName === "/admin" ? (
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<AdminPage />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default RouteManagement;
