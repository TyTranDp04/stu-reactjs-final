import React from 'react'
import { SidebarCategory, SidebarCol, SidebarDesc, SidebarInner } from './style'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  const accountRouter = {
    dashboard: { name: "Dashboard", url: "/dashboard", icon: "" },
    requests: { name: "Requests", url: "/requests", icon: "" },
    daysoff: { name: "Days off", url: "/log-off", icon: "" },
  };
  const managerRouter = {
    members: { name: "Members", url: "/members", icon: "" },
    groups: { name: "Groups", url: "/user-group", icon: "" },
    notifications: { name: "Notifications", url: "/notifications", icon: "" },
    sync: { name: "Day off history", url: "/admin/day-off-history", icon: "" },
  };

  return (
    <SidebarCol className='col-sm-3 col-lg-2'>
      <SidebarInner>
        {Object.entries(accountRouter).map(([index, value]) => <SidebarDesc key={index}><Link to={value.url}>{value.name}</Link></SidebarDesc>)}
      </SidebarInner>
      <SidebarInner>
        <SidebarCategory>Manager</SidebarCategory>
        {Object.entries(managerRouter).map(([index, value]) => <SidebarDesc key={index}><Link to={value.url}>{value.name}</Link></SidebarDesc>)}
      </SidebarInner>
      <SidebarInner>
        <SidebarCategory>Administrator</SidebarCategory>
        <SidebarDesc><Link to='/workspaces'>Workspaces</Link></SidebarDesc>
      </SidebarInner>
    </SidebarCol>
  )
}

export default Sidebar