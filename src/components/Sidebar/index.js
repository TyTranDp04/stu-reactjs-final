import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getListRoleIdAction } from '../../stores/slices/roleId.slice'
import { SidebarCategory, SidebarCol, SidebarDesc, SidebarInner } from './style'

const Sidebar = () => {
  const roleId = useSelector(state => state.roleId.roleIdState);
  const userInfo = useSelector(state => state.users.userInfoState);
  const dispatch = useDispatch()

  const roleIdData = roleId?.data;
  const userRoleId = userInfo?.data?.user?.RoleId;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  
  useEffect(() => {
    dispatch(getListRoleIdAction())
  }, [dispatch]);

  const accountRouter = {
    requests: { name: "Requests", url: "/request-log-off", icon: "" },
    daysoff: { name: "Days off", url: "/log-off", icon: "" },
    groups: { name: "Groups", url: "/user-group", icon: "" },
  };
  const managerRouter = {
    sync: { name: "Day off history", url: `${ permission === "Admin" ? "/admin/day-off-history" : "/404"}`, icon: "" },
    User:{name:"User", url: `${ permission === "Admin" ? "/admin/user" : "/404"}`, icon: ""},
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
    </SidebarCol>
  )
}

export default Sidebar