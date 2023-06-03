import React, { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LayoutComponent from "../components/layouts/LayoutComponent";
import LoadingComponent from "../components/loadingComponent/LoadingComponent";


import HomePage from "../pages/homePage/HomePage";
import ProfilePage from "../pages/profilePage/ProfilePage";


const RouteManagement = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token]);

  return (
    <Suspense fallback={<LoadingComponent />}>

        <LayoutComponent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile-setting" element={<ProfilePage/>}/>
            {/* <Route path="/form" element={<FormComponent />} />
            <Route path="/form-exp" element={<FormComponentExp />} />
            <Route path="/form-crud" element={<FormCRUD />} />
            <Route path="/form-crud-api" element={<FormCRUDAPI />} />
            <Route path="/form-crud-exp" element={<FormCRUD_graph />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/about-me/:id" element={<AboutMe />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:uuid" element={<ProductDetail />} />
            <Route path="/content" element={<Contentful />} /> */}
          </Routes>
        </LayoutComponent>
      
    </Suspense>
  );
};

export default RouteManagement;
