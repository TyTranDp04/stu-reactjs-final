import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getListRoleIdAction } from '../../stores/slices/roleId.slice'
import { HeaderLogo, HeaderLogoInner, HeaderLogoWrapper, StImg } from '../Header/style'
import { Fabar, Row, SidebarCategory, SidebarCol, SidebarDesc, SidebarInner, BtnArrow, P } from './style'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faArrowRightLong, faArrowRightToBracket, faBars, faCalendar, faCodePullRequest, faList, faPeopleGroup, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

const Sidebar = ({isOpen, Toggle}) => {
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
    requests: { name: "Requests", url: "/request-log-off", icon: faCodePullRequest },
    daysoff: { name: "Days off", url: "/log-off", icon: faCalendar },
    groups: { name: "Groups", url: "/user-group", icon: faPeopleGroup },
  };
  const managerRouter = {
    sync: { name: "Day off history", displayIcon: userRoleId === "1" || userRoleId === "2" ? "none" : "inline-block", display: userRoleId === "1" || userRoleId === "2" ? "none" : isOpen ? 'inline' : 'none', url: `${permission === "Admin" ? "/admin/day-off-history" : "/404"}`, icon: faList },
    User: { name: "User", displayIcon: userRoleId === "1" ? "none" : "inline-block", url: `${permission === "Admin" ? "/admin/user" : "/404"}`, display: userRoleId === "1" ? "none" : isOpen ? 'inline' : 'none', icon: faUser },
  };

  return (
    <SidebarCol style={{ width: isOpen ? "16%" : "6%" }} className={isOpen ? "col-sm-3 col-lg-2" : "col-sm-3 col-lg-2"}>
      <SidebarInner>
        {Object.entries(accountRouter).map(([index, value]) => <SidebarDesc key={index}>
          <OverlayTrigger
            overlay={
              <Tooltip>
                {value.name}
              </Tooltip>
            }
          >
            <Link to={value.url}>
            <FontAwesomeIcon style={{ color: 'white', paddingRight: "10px", fontSize: "20px" }} icon={value.icon} />
            </Link>
          </OverlayTrigger>
          <Link style={{ display: isOpen ? 'inline' : 'none' }} to={value.url}>{value.name}</Link></SidebarDesc>)}
      </SidebarInner>
      <SidebarInner>
        <SidebarCategory style={{ display: isOpen ? "inline-block" : "none" }}>Management</SidebarCategory>
        {Object.entries(managerRouter).map(([index, value]) => <SidebarDesc key={index}>
          <OverlayTrigger
            overlay={
              <Tooltip>
                {value.name}
              </Tooltip>
            }
          >
            <Link to={value.url}>
            <FontAwesomeIcon style={{ display: value.displayIcon, color: 'white', paddingRight: "10px", fontSize: "20px" }} icon={value.icon} />
            </Link>
          </OverlayTrigger>
          <Link style={{ display: value.display }}
            to={value.url}>{value.name}</Link></SidebarDesc>)}
      </SidebarInner>
    </SidebarCol>
  )
}

export default Sidebar