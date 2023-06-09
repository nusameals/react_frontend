import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutComponent from "../components/layouts/LayoutComponent";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";

import HomePage from "../pages/homePage/HomePage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import EditProfile from "../pages/profilePage/editProfile/EditProfile";
import CreateMenuPage from "../pages/menuPage/Create Menu/createMenu";
import EditMenu from "../pages/menuPage/Edit Menu/editMenu";
import OrderPage from "../pages/orderPage/orderPage";
import ReservationsPage from "../pages/reservationsPage/reservationsPage";
import MenuPage from "../pages/menuPage/MenuPage";
import DetailMenuPage from "../pages/menuPage/crud/DetailMenuPage";
import ReportPage from "../pages/reportPage/reportPage";
import LoginPage from "../pages/loginPage/LoginPage";
import AdminPage from "../pages/adminPage/AdminPage";
import AddTable from "../pages/reservationsPage/AddTable/addTable";
import DetailTable from "../pages/reservationsPage/detailTable";
// 
const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  return (
    <Suspense fallback={<LoadingComponent />}>
      {!token && pathName === "/" ? (
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </LayoutComponent>
      ) : !token && pathName === "/admin" ? (
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
        </Routes>
      ) : (
        <LayoutComponent>
          <Routes>
            <Route path="/dashboard" element={<AdminPage />} />
            <Route path="/profile-setting/:id" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/menu-page" element={<MenuPage />} />
            <Route path="/menu-page-create" element={<CreateMenuPage />} />
            <Route path="/menu-page/:id" element={<DetailMenuPage />} />
            <Route path="/edit-menu/:id" element={<EditMenu />} />
            <Route path="/order-page" element={<OrderPage />} />
            <Route path="/reservations-page" element={<ReservationsPage />} />
            <Route path="/report-page" element={<ReportPage />} />
            <Route path="/add-table" element={<AddTable/>} />
            <Route path="/reservations-page/:id" element={<DetailTable />} />

          </Routes>
        </LayoutComponent>
      )}
    </Suspense>
  );
};

export default RouteManagement;
