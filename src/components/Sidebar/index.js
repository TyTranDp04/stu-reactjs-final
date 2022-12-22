import { faCalendar, faCodePullRequest, faList, faPeopleGroup, faPeopleRoof, faTableList, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from 'react'
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { SidebarCategory, SidebarCategoryGr, SidebarCol, SidebarDesc, SidebarGroup, SidebarInner } from './style'

const Sidebar = ({ isOpen, Toggle, setIsOpen, permission }) => {
  const userInfo = useSelector(state => state.users.userInfoState);
  const userRoleId = userInfo?.data?.RoleId;
  
  const [showItemSidebar,setShowItemSidebar] = useState(false)
  const handleItemSidebar = () => setShowItemSidebar(!showItemSidebar)

  useEffect(() => {
    setShowItemSidebar()
  }, [isOpen]);
  
  const [showItemSidebar1, setShowItemSidebar1] = useState(false)
  const handleItemSidebar1 = () => setShowItemSidebar1(!showItemSidebar1)

  useEffect(() => {
    setShowItemSidebar1()
  }, [isOpen]);

  const accountRouter = {
    daysoff: { name: "List", url: "/log-off", icon: faCalendar },
    requests: { name: "Requests", url: "/request-log-off", icon: faCodePullRequest },
  };
  const managerRouter = {
    sync: { name: "Day off history", displayIcon: userRoleId === "1" || userRoleId === "2" ? "none" : "inline-block", display: userRoleId === "1" || userRoleId === "2" ? "none" : 'inline', url: `${permission === "Admin" ? "/admin/day-off-history" : "/404"}`, icon: faList },
    User: { name: "User", displayIcon: userRoleId === "1" ? "none" : "inline-block", url: `${permission === "Staff" ? "/404" : "/admin/user"}`, display: userRoleId === "1" ? "none" : 'inline', icon: faUser },
  };

  return (
    <SidebarCol
      style={{ width: isOpen ? "16%" : "7%" }}
      className={isOpen ? "col-sm-3 col-lg-2" : "col-sm-3 col-lg-2"}
    >
      <SidebarInner style={{ height: showItemSidebar ? "120px" : "20px", marginBottom: userRoleId === "1" ? "10px" : "30px" }}>
        <Dropdown
          autoClose={isOpen ? "inside" : "true"}
          className={isOpen ? "" : 'end'}
          drop={isOpen ? "" : 'end'}
          style={{ border: "none", width: "100%" }}
          onClick={isOpen ? handleItemSidebar : ""}
        >
          <Dropdown.Toggle
            style={{ backgroundColor: "#8000ff", border: "none" }}
          >
            <OverlayTrigger
              overlay={
                <Tooltip>
                  Day Off
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                className="font-icon"
                style={{ display: "inline-block", color: 'white', paddingRight: isOpen ? "10px" : "0px", fontSize: "20px" }}
                icon={faTableList}
              />
            </OverlayTrigger>
            <SidebarCategory
              style={{ display: isOpen ? "inline-block" : "none" }}
            >Day Off
            </SidebarCategory>
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ backgroundColor: "#8000ff", border: "none", marginLeft: isOpen ? "0px" : "50px" }}
          >
            {Object.entries(accountRouter).map(([index, value]) =>
              <Dropdown.Item key={index}>
                <SidebarDesc style={{paddingLeft: isOpen ? "0px" : "40px"}}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        {value.name}
                      </Tooltip>
                    }
                  >
                    <Link to={value.url}>
                      <FontAwesomeIcon
                        className="font-icon"
                        style={{ color: 'white', paddingRight: "10px", fontSize: "20px" }}
                        icon={value.icon}
                      />
                    </Link>
                  </OverlayTrigger>
                  <Link to={value.url}>{value.name}</Link>
                </SidebarDesc>
              </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </SidebarInner>
      <SidebarInner style={{ height: userRoleId === "1" ? "0px" : showItemSidebar1 ? "120px" : "20px", marginBottom: userRoleId === "1" && userRoleId === "2" ? "0px" : "30px" }}>
        <Dropdown
          autoClose={isOpen ? "inside" : "outside"}
          className={isOpen ? "" : 'end'}
          drop={isOpen ? "" : 'end'}
          style={{ border: "none" }}
          onClick={isOpen ? handleItemSidebar1 : ""}
        >
          <Dropdown.Toggle
            style={{ display: userRoleId === "1" ? "none" : "inline-block", backgroundColor: "#8000ff", border: "none" }}
          >
            <OverlayTrigger
              overlay={
                <Tooltip>
                  Management
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                className="font-icon"
                style={{ display: userRoleId === "1" ? "none" : "inline-block", color: 'white', paddingRight: isOpen ? "10px" : "0px", fontSize: "20px" }}
                icon={faPeopleRoof}
              />
            </OverlayTrigger>
            <SidebarCategory
              style={{ display: userRoleId === "1" ? "none" : isOpen ? "inline-block" : "none" }}
            >
              Management
            </SidebarCategory>
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ backgroundColor: "#8000ff", border: "none", marginLeft: isOpen ? "0px" : "40px" }}
          >
            {Object.entries(managerRouter).map(([index, value]) =>
              <Dropdown.Item key={index}>
                <SidebarDesc style={{paddingLeft: isOpen ? "0px" : "20px"}}>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        {value.name}
                      </Tooltip>
                    }
                  >
                    <Link to={value.url}>
                      <FontAwesomeIcon
                        className="font-icon"
                        style={{ display: value.displayIcon, color: 'white', paddingRight: "10px", fontSize: "20px" }}
                        icon={value.icon}
                      />
                    </Link>
                  </OverlayTrigger>
                  <Link
                    style={{ display: value.display }}
                    to={value.url}>{value.name}
                  </Link>
                </SidebarDesc>
              </Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
      </SidebarInner>
      <SidebarCategoryGr  >
        <SidebarGroup >
          <OverlayTrigger
            overlay={
              <Tooltip>
                User Group
              </Tooltip>
            }
          >
            <Link to={"/user-group"}>
              <FontAwesomeIcon
                className="font-icon"
                style={{ color: 'white', paddingRight: isOpen ? "10px" : "0px", fontSize: "20px" }}
                icon={faPeopleGroup}
              />
            </Link>
          </OverlayTrigger>
          <Link
            style={{ display: isOpen ? "" : "none" }}
            to={"/user-group"}
          >User Group
          </Link>
        </SidebarGroup>
      </SidebarCategoryGr>
    </SidebarCol>
  )
}

export default Sidebar