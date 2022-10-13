import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../components/pages/Home";
import Create from "../components/pages/Create";
import Read from "../components/pages/Read";
import Search from "../components/pages/Search";
import Update from "../components/pages/Update";
import User from "../components/pages/User";
import NavBar from "../components/layout/NavBar";

const RoutesCrud = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <section className='content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default RoutesCrud;