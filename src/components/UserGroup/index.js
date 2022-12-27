import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import {
  Container,
  User,
  Group,
  GroupDetail,
  HeaderContainer,
  BtnContainer,
  Avatar,
  Header,
  TdContent,
  BtnAddGroup,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Content,
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
  BtnDeleteGroup,
  BtncloseGroup,
  TdDesc,
} from "./style";
import axios from "axios";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ModalAddUserGroup from "./AddUserGroup";
import ModalAddGroup from "./ModalAddGroup";
import AvatarDefault from "../../assets/images/avatar-default.jpg";

function UserGroup(props) {
  const [showDetail, setShowDetail] = useState(true);
  const [dataUser, setDataUser] = useState();
  const [dataGroup, setDataGroup] = useState();
  const [dataDetail, setDataDetail] = useState();
  const [callApiGroup, setCallApiGroup] = useState(false);
  const [showAddNewGroup, setShowAddNewGroup] = useState(false);
  const [showAddUserGroup, setShowAddUserGroup] = useState(false);
  const userInfo = useSelector((state) => state.users.userInfoState);
  const urlGetUser = process.env.REACT_APP_URL_WEBSITE + "/user";
  const urlGetGroup = process.env.REACT_APP_URL_WEBSITE + "/group";
  const urlDeleteUserGroup =
    process.env.REACT_APP_URL_WEBSITE + "/user-group/delete";

  async function getDataUser() {
    await axios
      .get(urlGetUser)
      .then((res) => setDataUser(res?.data))
      .catch((err) => {});
  }
  async function getDataGroup() {
    await axios
      .get(urlGetGroup)
      .then((res) => {
        const dataApiGroup = res?.data?.data;
        switch (userInfo?.data?.RoleId) {
          case "1":
            const data = dataApiGroup.filter(function (e) {
              return userInfo?.data?.GroupId.includes(e._id);
            });
            setDataGroup(data);
            break;
          case "2":
            const dataMaster = dataApiGroup.filter(function (e) {
              return userInfo?.data?.GroupId.includes(e._id);
            });
            setDataGroup(dataMaster);
            break;
          case "3":
            setDataGroup(dataApiGroup);
            break;
          default:
            setDataGroup([]);
        }
      })
      .catch((err) => {});
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
    await axios
      .post(urlDeleteUserGroup, form)
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Delete success",
          showConfirmButton: false,
          timer: 1000,
        });
        setCallApiGroup(!callApiGroup);
      })
      .catch((err) => {});
  }

  function handleShowDetail(group) {
    setDataDetail(group);
    setShowDetail(false);
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
      confirmButtonColor: "#8000ff",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserGroup(UserId, GroupId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Cancel!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }

  function handleDeleteGroup(GroupId) {
    const url = process.env.REACT_APP_URL_WEBSITE + "/group/" + GroupId;
    Swal.fire({
      title: "Delete this Group?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#8000ff",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url).then((data) => {
          setCallApiGroup(!callApiGroup);
          Swal.fire({
            icon: "success",
            title: "Delete success",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Cancel!",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }

  return (
    <Container>
      <Group>
        <Header>
          {userInfo?.data?.RoleId === "3" ? (
            <BtnAddGroup style={{width : "120px"}} onClick={() => setShowAddNewGroup(true)}>
               New Group
            </BtnAddGroup>
          ) : (
            ""
          )}
          <ModalAddGroup
            dataGroup={dataGroup}
            handle={{ callApiGroup, setCallApiGroup, setShowAddNewGroup }}
            show={showAddNewGroup}
          ></ModalAddGroup>
        </Header>
        <Content>
          <Table striped bordered hover>
            <Thead>
              <Tr>
                <Th>Group</Th>
                <Th>Member(s)</Th>
                <Th>Master(s)</Th>
                {userInfo?.data?.RoleId === "3" ? <Th>Action</Th> : ""}
              </Tr>
            </Thead>
            <Tbody>
              {dataGroup?.map((e, index) => (
                <Tr key={index}>
                  <Td onClick={() => handleShowDetail(e)}>
                    <TdContent>{e.Name} </TdContent>
                  </Td>
                  <Td
                    onClick={() => handleShowDetail(e)}
                    style={{ display: "flex" }}
                  >
                    {dataUser?.map((user, id) =>
                      user?.GroupId?.includes(e._id) && user.RoleId !== "3" ? (
                        <User key={id}>
                          <OverlayTrigger
                            overlay={<Tooltip>{user?.Name}</Tooltip>}
                          >
                            <Avatar
                              src={user?.Avatar ? user?.Avatar : AvatarDefault}
                            ></Avatar>
                          </OverlayTrigger>
                        </User>
                      ) : (
                        ""
                      )
                    )}
                  </Td>
                  <Td onClick={() => handleShowDetail(e)}>
                    <TdContent>
                      {dataUser?.map((user, id) =>
                        user?.GroupId?.includes(e._id) &&
                        user?.RoleId === "2" ? (
                          <User key={id}>
                            <OverlayTrigger
                              overlay={<Tooltip>{user?.Name}</Tooltip>}
                            >
                              <Avatar
                                src={
                                  user?.Avatar ? user?.Avatar : AvatarDefault
                                }
                              ></Avatar>
                            </OverlayTrigger>
                          </User>
                        ) : (
                          ""
                        )
                      )}
                    </TdContent>
                  </Td>
                  {userInfo?.data?.RoleId === "3" ? (
                    <Td>
                      <TdContent>
                        <BtnDeleteGroup
                          onClick={() => handleDeleteGroup(e?._id)}
                        >
                          Delete
                        </BtnDeleteGroup>
                      </TdContent>
                    </Td>
                  ) : (
                    ""
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Content>
        {showDetail ? (
          ""
        ) : (
          <Modal dialogClassName="my-modal-group" show={true}>
            <Modal.Header
              style={{ border: "none", display: "flex", justifyContent: "end" }}
            >
              <BtnAddGroup
                style={{ backgroundColor: "transparent", width: "40px" }}
                onClick={() => setShowDetail(true)}
              >
                <FontAwesomeIcon
                  style={{ color: "#8000FF", fontSize: "28px" }}
                  icon={faXmark}
                />
              </BtnAddGroup>
            </Modal.Header>
            <GroupDetail>
              <Header>
                <HeaderContainer>
                  <NameText style={{ fontWeight: "bold", width: "100%" }}>
                    {dataDetail?.Name} infomation
                  </NameText>
                  <BtnContainer>
                    {userInfo?.data?.RoleId === "1" ? (
                      ""
                    ) : (
                      <BtnAddGroup
                        style={{ width: "120px" }}
                        onClick={() => setShowAddUserGroup(true)}
                      >
                         New User
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
                  {userInfo?.data?.RoleId === "1"
                    ? "Staff"
                    : userInfo?.data?.RoleId === "2"
                    ? "Manager"
                    : "Admin"}
                </NameTitle>
              </Name>
              <Master>
                <NameText>Master</NameText>
                <MemberContainer>
                  {dataUser?.map((user, id) =>
                    user?.GroupId?.includes(dataDetail._id) &&
                    user?.RoleId === "2" ? (
                      <MemberInfo key={id}>
                        <Icon
                          alt={user?.Name}
                          src={user?.Avatar ? user?.Avatar : AvatarDefault}
                        ></Icon>
                        <NameTextInfo>{user?.Name}</NameTextInfo>
                        {userInfo?.data?.RoleId === "3" ? 
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
                        : 
                          ""
                        }
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
                    user?.GroupId.includes(dataDetail._id) &&
                    user?.RoleId === "1" ? (
                      <MemberInfo key={id}>
                        <Icon
                          alt={user?.Name}
                          src={user?.Avatar ? user?.Avatar : AvatarDefault}
                        ></Icon>
                        <NameTextInfo>{user?.Name}</NameTextInfo>
                        {userInfo?.data?.RoleId !== "1" &&
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
            <Modal.Footer>
              <BtncloseGroup
                style={{ marginRight: "20px", width: "70px" }}
                onClick={() => setShowDetail(true)}
              >
                Close
              </BtncloseGroup>
            </Modal.Footer>
          </Modal>
        )}
      </Group>
    </Container>
  );
}

export default UserGroup;
