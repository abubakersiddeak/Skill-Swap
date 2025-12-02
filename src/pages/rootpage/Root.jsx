import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navber";
import Footer from "../../components/Footer";

export default function Root() {
  return (
    <div className="bg-linear-to-b from-blue-50 via-blue-100 to-blue-200">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
