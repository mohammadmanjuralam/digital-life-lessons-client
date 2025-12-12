import React from "react";

import { CiDeliveryTruck } from "react-icons/ci";
import {
  FaCreditCard,
  FaHome,
  FaMotorcycle,
  FaPlus,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFavoriteBorder, MdHistory, MdPendingActions } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";

import { SiGoogletasks } from "react-icons/si";
import UseRole from "../Controller/useRole/useRole";

const DashBoardLayout = () => {
  const { role } = UseRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Digital Life Session</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            {/* <li>
              <Link to="/">
                <span>
                  <img src={logoImg} alt="" />
                </span>
              </Link>
            </li> */}
            <li>
              <NavLink
                to="/"
                className="s-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="DashBoard Home"
              >
                <FaHome />
                <span className="is-drawer-close:hidden">
                  Digital Life Session
                </span>
              </NavLink>
            </li>
            <li>
              {/* Our Dashboard Link */}
              <NavLink
                to="/dashboard/add-lesson"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Add Lesson"
              >
                <FaPlus />
                <span className="is-drawer-close:hidden">Add Lesson</span>
              </NavLink>
            </li>
            {/* Our Dashboard Link */}
            <li>
              <NavLink
                to="/dashboard/my-lessons"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Lesson"
              >
                <MdFavoriteBorder />
                <span className="is-drawer-close:hidden">My Lesson</span>
              </NavLink>
            </li>

            {/* ================= */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
