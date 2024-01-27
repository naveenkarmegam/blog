import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import DashPost from "../components/DashPost";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComment";
import DashboardComp from "../components/DashboardComp";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabValue = urlParams.get("tab");
    if (tabValue) {
      setTab(tabValue);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const response = await fetch("api/user/sign-out", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSidebar handleSignOut={handleSignOut} />
      </div>
      {tab === "profile" && <DashProfile handleSignOut={handleSignOut} />}
      {tab === "post" && <DashPost />}
      {tab === "users" && <DashUsers />}
      {tab === "comment" && <DashComments />}
      {tab === "dash" && <DashboardComp />}
    </div>
  );
};

export default Dashboard;
