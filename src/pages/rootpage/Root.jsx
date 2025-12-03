import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navber";
import Footer from "../../components/Footer";

export default function Root() {
  return (
    <div className="">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
