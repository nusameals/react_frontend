import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutComponent from "../components/layouts/LayoutComponent";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";


import HomePage from "../pages/homePage/HomePage";
import LoginPage from "../pages/loginPage/LoginPage";


const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Suspense fallback={<LoadingComponent />}>

        <Routes>
          <Route path="/" element={<LoginPage/>} />
        </Routes>
      
    </Suspense>
  );
};

export default RouteManagement;
