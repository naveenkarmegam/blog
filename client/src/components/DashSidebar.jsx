import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {HiAnnotation, HiArrowCircleRight, HiChartPie, HiDocumentText, HiUser, HiUserGroup} from 'react-icons/hi'
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
          {
            currentUser.isAdmin && (
              <Link to={"/dashboard?tab=dash"}>
              <Sidebar.Item
              active={tab==='dash'}
              as='div'
              icon={HiChartPie}
              >Dashboard</Sidebar.Item>
            </Link>
            )
          }
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
              <>
             
              <Link to={"/dashboard?tab=post"}>
              <Sidebar.Item
              active={tab==='post'}
              as='div'
              icon={HiDocumentText}
              >Post</Sidebar.Item>
            </Link>
              <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
              active={tab==='users'}
              as='div'
              icon={HiUserGroup}
              >Users</Sidebar.Item>
            </Link>
              <Link to={"/dashboard?tab=comment"}>
              <Sidebar.Item
              active={tab==='comment'}
              as='div'
              icon={HiAnnotation}
              >Comment</Sidebar.Item>
            </Link>
            </>
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
