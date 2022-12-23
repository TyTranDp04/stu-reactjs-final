import React from 'react'
import {  Menu } from "antd";
import { ApartmentOutlined, DiffOutlined, HistoryOutlined, PullRequestOutlined, UnorderedListOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons/lib/icons"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NewSideBar = () => {
    const naviGate = useNavigate();
    const userInfo = useSelector(state => state.users.userInfoState);
    const userRoleId = userInfo?.data?.RoleId;
    return (
            <Menu
            mode="inline"
            onClick={({ key }) => {
                naviGate(key)
            }}
            items={[
                { label: "Day Off", icon: <DiffOutlined />, children:[
                { label: "List", key: "/log-off", icon: <UnorderedListOutlined /> },
                { label: "Requests", key: "/request-log-off", icon: <PullRequestOutlined /> } 
                ] },
                userRoleId === "1"? "" : { label:"Management" ,icon: <ApartmentOutlined />, children:[
                userRoleId === "2"? "":{ label: "Day Off History", key: "/admin/day-off-history" , icon: <HistoryOutlined /> },
                { label: "User", key: "/admin/user", icon: <UserOutlined /> }
                ] },
                { label: "User Group", key: "/user-group", icon: <UsergroupAddOutlined /> },
            ]}
            />
    )
}

export default NewSideBar