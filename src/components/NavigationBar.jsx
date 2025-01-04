import React from "react";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import { LuProportions } from "react-icons/lu";
import { RiMastercardLine } from "react-icons/ri";
import { RxDashboard, RxEnvelopeClosed, RxFile } from "react-icons/rx";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";

const NavigationBar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <RxDashboard /> },
    { name: "Enquiry", path: "/enquiry", icon: <HiOutlineViewfinderCircle /> },
    { name: "Proposal", path: "/proposal", icon: <LuProportions /> },
    { name: "Master", path: "/master", icon: <RiMastercardLine /> },
  ];
  return (
    <div className="bg-gray-200 py-4 px-6 pr-10 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-12 object-fit rounded-md"
          />
        </Link>
      </div>
      <ul className="flex gap-8">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition duration-300"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationBar;
