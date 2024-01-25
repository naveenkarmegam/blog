import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {HiArrowCircleRight, HiDocumentText, HiUser} from 'react-icons/hi'
import {useSelector } from 'react-redux'
const DashSidebar = ({handleSignOut}) => {
  const location = useLocation();
  const {theme} =useSelector(state=>state.theme);
  const {currentUser} =useSelector(state=>state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabValue = urlParams.get("tab");
    if (tabValue) {
      setTab(tabValue);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
            active={tab==='profile'}
            label={currentUser.isAdmin?'admin':'user'}
            labelColor={theme==='light'?'dark':'light'}
            as='div'
            icon={HiUser}
            >Profile</Sidebar.Item>
          </Link>
          {
            currentUser.isAdmin && (
              <Link to={"/dashboard?tab=post"}>
              <Sidebar.Item
              active={tab==='post'}
              as='div'
              icon={HiDocumentText}
              >Post</Sidebar.Item>
            </Link>
            )
          }
          <Sidebar.Item icon={HiArrowCircleRight} onClick={handleSignOut} >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
