import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "react-pro-sidebar";
import {
  FaTv,
  FaHeart,
  FaBook,
  FaRoute,
  FaRegPaperPlane,
  FaUser,
  FaNetworkWired,
  FaStop,
  FaNewspaper,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <ProSidebar collapsed={false} width="20vw">
        <SidebarHeader>
          <div style={{ display: "flex", justifyContent: "center", margin:"10px 0px 10px 0px" }}>
            <h3> Smart Pharma 360</h3>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle" popperArrow={true}>
            <SubMenu title="Employees" icon={<FaUser />}>
              <MenuItem>
                <Link to="/adminemployees" />
                Employees Gist
              </MenuItem>
              <MenuItem>
                <Link to="/adminaddemployee" />
                Add Employee
              </MenuItem>
            </SubMenu>
            <SubMenu title="Designation" icon={<FaBook />}>
              <MenuItem>
                <Link to="/admindesignations" />
                Designation Gist
              </MenuItem>
              <MenuItem>
                <Link to="/adminadddesignation" />
                Add Designation
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <h5 style={{ display: "flex", justifyContent: "center" }}>
            Smart Pharma 360
          </h5>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}

export default Sidebar;
