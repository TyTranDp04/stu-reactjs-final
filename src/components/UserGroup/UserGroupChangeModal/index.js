import { faAngleLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
// import avatarnull from "../../../assets/images/avatar-default.jpg";

import {
  Container,
  GroupDetail,
  HeaderContainer,
  BtnContainer,
  Header,
  BtnAddGroup,
  Name,
  NameTitle,
  Master,
  MemberContainer,
  MemberInfo,
  BtnDelete,
  Icon,
  Members,
  NameTextInfo,
  NameText,
} from "../style.js";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalAddUserGroup from "../AddUserGroup";

function UserGroupModal(props) {
  const [showDetail, setShowDetail] = useState(true);
  const [dataUser, setDataUser] = useState();
  const [dataGroup, setDataGroup] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [callApiGroup, setCallApiGroup] = useState(false);
  const [showAddUserGroup, setShowAddUserGroup] = useState(false);
  const userInfo = useSelector((state) => state.users.userInfoState);
  const urlGetUser = process.env.REACT_APP_URL_WEBSITE + "/user";
  const urlGetGroup = process.env.REACT_APP_URL_WEBSITE + "/group";
  const urlDeleteUserGroup =
    process.env.REACT_APP_URL_WEBSITE + "/user-group/delete";

  async function getDataUser() {
    await axios.get(urlGetUser).then((res) => setDataUser(res?.data));
  }
  async function getDataGroup() {
    await axios.get(urlGetGroup).then((res) => {
      const dataApiGroup = res?.data?.data;
      switch (userInfo?.data?.user?.RoleId) {
        case "1":
          const data = dataApiGroup.filter(function (e) {
            return userInfo?.data?.user?.GroupId.includes(e._id);
          });
          setDataGroup(data);
          break;
        case "2":
          const dataMaster = dataApiGroup.filter(function (e) {
            return userInfo?.data?.user?.GroupId.includes(e._id);
          });
          setDataGroup(dataMaster);
          break;
        case "3":
          setDataGroup(dataApiGroup);
          break;
        default:
          setDataGroup([]);
      }
    });
  }
  useEffect(() => {
    getDataUser();
    getDataGroup();
  }, [callApiGroup]);
  async function deleteUserGroup(UserId, GroupId) {
    const form = {
      UserId: UserId,
      GroupId: GroupId,
    };
    await axios.post(urlDeleteUserGroup, form).then((data) => {
      Swal.fire({
        icon: "success",
        title: "Delete success",
        showConfirmButton: false,
        timer: 1000,
      });
      setCallApiGroup(!callApiGroup);
    });
  }

  function handleDeleteUser(UserId, GroupId) {
    Swal.fire({
      title: "Delete this User?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserGroup(UserId, GroupId);
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  }
  return (
    <Container className="col-sm-9 col-lg-10">
      <GroupDetail>
        <Header>
          <HeaderContainer>
            <NameText style={{ fontWeight: "bold", width: "50%" }}>
              {dataDetail?.Name} infomation
            </NameText>
            <BtnContainer>
              <BtnAddGroup
                style={{ marginRight: "20px", width: "70px" }}
                onClick={() => setShowDetail(true)}
              >
                <FontAwesomeIcon
                  style={{ color: "#fff", marginRight: "5px" }}
                  icon={faAngleLeft}
                />
                Back
              </BtnAddGroup>
              {userInfo?.data?.user?.RoleId === "1" ? (
                ""
              ) : (
                <BtnAddGroup onClick={() => setShowAddUserGroup(true)}>
                  + New User
                </BtnAddGroup>
              )}
              <ModalAddUserGroup
                group={dataDetail}
                show={showAddUserGroup}
                handle={{
                  setShowAddUserGroup,
                  showAddUserGroup,
                  callApiGroup,
                  setCallApiGroup,
                }}
              ></ModalAddUserGroup>
            </BtnContainer>
          </HeaderContainer>
        </Header>
        <Name>
          <NameText>Name</NameText>
          <NameTitle>
            {userInfo?.data?.user?.RoleId === "1"
              ? "Staff"
              : userInfo?.data?.user?.RoleId === "2"
              ? "Manager"
              : "Admin"}
          </NameTitle>
        </Name>
        <Master>
          <NameText>Master</NameText>
          <MemberContainer>
            {dataUser?.map((user, id) =>
              user.GroupId.includes(dataDetail._id) && user.RoleId === "2" ? (
                <MemberInfo key={id}>
                  <Icon alt={user?.Name} src={user?.Avatar}></Icon>
                  <NameTextInfo>{user?.Name}</NameTextInfo>
                  {userInfo?.data?.user?.RoleId === "3" ? (
                    <BtnDelete
                      onClick={() =>
                        handleDeleteUser(user?._id, dataDetail?._id)
                      }
                    >
                      <FontAwesomeIcon
                        style={{ color: "#fff", marginRight: "5px" }}
                        icon={faXmark}
                      />
                    </BtnDelete>
                  ) : (
                    ""
                  )}
                </MemberInfo>
              ) : (
                ""
              )
            )}
          </MemberContainer>
        </Master>
        <Members>
          <NameText>Members</NameText>
          <MemberContainer>
            {dataUser?.map((user, id) =>
              user.GroupId.includes(dataDetail._id) && user.RoleId === "1" ? (
                <MemberInfo key={id}>
                  <Icon alt={user?.Name} src={user?.Avatar}></Icon>
                  <NameTextInfo>{user?.Name}</NameTextInfo>
                  {userInfo?.data?.user?.RoleId !== "1" &&
                  user.RoleId === "1" ? (
                    <BtnDelete
                      onClick={() =>
                        handleDeleteUser(user?._id, dataDetail?._id)
                      }
                    >
                      <FontAwesomeIcon
                        style={{ color: "#fff", marginRight: "5px" }}
                        icon={faXmark}
                      />
                    </BtnDelete>
                  ) : (
                    ""
                  )}
                </MemberInfo>
              ) : (
                ""
              )
            )}
          </MemberContainer>
        </Members>
      </GroupDetail>
    </Container>
  );
}

export default UserGroupModal;
