import React from "react";
import UseRole from "../Controller/useRole/useRole";
import UserDashboard from "./UserDashboard/UserDashboard";
import AdminDashboard from "./AdminDashboard/AdminDashboard";

const Dashboard = () => {
  const { role, roleLoading } = UseRole();
  if (roleLoading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default Dashboard;
