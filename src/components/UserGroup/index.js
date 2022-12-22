import { faAngleLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import {
  Container,
  User, Group, GroupDetail, HeaderContainer, BtnContainer, Avatar, Header, TdContent, BtnAddGroup, Thead, Tr, Th, Td, Tbody,
  Content, Name, NameTitle, Master, MemberContainer, MemberInfo, BtnDelete, Icon, Members, NameTextInfo, NameText, BtnDeleteGroup
} from './style'
import axios from 'axios';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import ModalAddUserGroup from './AddUserGroup';
import ModalAddGroup from './ModalAddGroup';
import AvatarDefault from '../../assets/images/avatar-default.jpg'


function UserGroup(props) {
  const [showDetail, setShowDetail] = useState(true)
  const [dataUser, setDataUser] = useState()
  const [dataGroup, setDataGroup] = useState()
  const [dataDetail, setDataDetail] = useState()
  const [callApiGroup, setCallApiGroup] = useState(false)
  const [showAddNewGroup, setShowAddNewGroup] = useState(false)
  const [showAddUserGroup, setShowAddUserGroup] = useState(false)
  const userInfo = useSelector(state => state.users.userInfoState);
  const urlGetUser = process.env.REACT_APP_URL_WEBSITE + '/user'
  const urlGetGroup = process.env.REACT_APP_URL_WEBSITE + '/group'
  const urlDeleteUserGroup = process.env.REACT_APP_URL_WEBSITE + '/user-group/delete'

  async function getDataUser() {
    await axios.get(urlGetUser)
      .then(res => setDataUser(res?.data))
      .catch(err => { })
  }
  async function getDataGroup() {
    await axios.get(urlGetGroup)
      .then(res => {
        const dataApiGroup = res?.data?.data
        switch (userInfo?.data?.RoleId) {
          case "1":
            const data = dataApiGroup.filter(function (e) {
              return userInfo?.data?.GroupId.includes(e._id)
            })
            setDataGroup(data)
            break;
          case "2":
            const dataMaster = dataApiGroup.filter(function (e) {
              return userInfo?.data?.GroupId.includes(e._id)
            })
            setDataGroup(dataMaster)
            break;
          case "3":
            setDataGroup(dataApiGroup)
            break;
          default:
            setDataGroup([])

        }
      })
      .catch(err => { })
  }
  useEffect(() => {
    getDataUser()
    getDataGroup()
  }, [callApiGroup])
  async function deleteUserGroup(UserId, GroupId) {
    const form = {
      UserId: UserId,
      GroupId: GroupId
    }
    await axios.post(urlDeleteUserGroup, form)
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Delete success',
          showConfirmButton: false,
          timer: 1000
        })
        setCallApiGroup(!callApiGroup)
      })
      .catch(err => { })
  }

  function handleShowDetail(group) {
    setDataDetail(group)
    setShowDetail(false)
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
        deleteUserGroup(UserId, GroupId)
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  }
  function handleDeleteGroup(GroupId) {
    const url = process.env.REACT_APP_URL_WEBSITE + '/group/' + GroupId
    Swal.fire({
      title: "Delete this Group?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(url)
          .then((data) => {
            setCallApiGroup(!callApiGroup)
            Swal.fire({
              icon: 'success',
              title: 'Delete success',
              showConfirmButton: false,
              timer: 1000
            })
          })
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  }
  return (
    <Container>
      {
        showDetail ?
          <Group>
            <Header>
              {
                userInfo?.data?.RoleId === "3" ?
                  <BtnAddGroup onClick={() => setShowAddNewGroup(true)}>+ New Group</BtnAddGroup> : ''
              }
              <ModalAddGroup dataGroup={dataGroup} handle={{ callApiGroup, setCallApiGroup, setShowAddNewGroup }} show={showAddNewGroup}></ModalAddGroup>
            </Header>
            <Content>
              <Table striped bordered hover>
                <Thead>
                  <Tr>
                    <Th>Group</Th>
                    <Th>Member(s)</Th>
                    <Th>Master(s)</Th>
                    {
                      userInfo?.data?.RoleId === "3" ?
                        <Th>Action</Th> : ''
                    }
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    dataGroup?.map((e, index) => (
                      <Tr key={index}>
                        <Td onClick={() => handleShowDetail(e)}><TdContent>{e.Name} </TdContent></Td>
                        <Td onClick={() => handleShowDetail(e)} style={{ display: 'flex' }}>
                          {
                            dataUser?.map((user, id) => (
                              user?.GroupId?.includes(e._id) && user.RoleId !== "3" ? <User key={id}>
                                <OverlayTrigger
                                  overlay={
                                    <Tooltip>
                                      {user?.Name}
                                    </Tooltip>
                                  }
                                >
                                  <Avatar src={user?.Avatar ? user?.Avatar : AvatarDefault}></Avatar>
                                </OverlayTrigger>
                              </User> : ''
                            ))
                          }
                        </Td>
                        <Td onClick={() => handleShowDetail(e)}>
                          <TdContent>
                            {
                              dataUser?.map((user, id) => (
                                user?.GroupId?.includes(e._id) && user?.RoleId === "2" ? <User key={id}>
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip>
                                        {user?.Name}
                                      </Tooltip>
                                    }
                                  >
                                    <Avatar src={user?.Avatar ? user?.Avatar : AvatarDefault}></Avatar>
                                  </OverlayTrigger>
                                </User> : ''
                              ))
                            }
                          </TdContent>
                        </Td>
                        {
                          userInfo?.data?.RoleId === "3" ?
                            <Td>
                              <TdContent>
                                <BtnDeleteGroup onClick={() => handleDeleteGroup(e?._id)}>Delete</BtnDeleteGroup>
                              </TdContent>
                            </Td> : ''
                        }
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </Content>
          </Group >
          :
          <GroupDetail>
            <Header>
              <HeaderContainer>
                <NameText style={{ fontWeight: 'bold', width: '50%' }}>{dataDetail?.Name} infomation</NameText>
                <BtnContainer>
                  <BtnAddGroup style={{ marginRight: '20px', width: "70px" }} onClick={() => setShowDetail(true)}>
                    <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faAngleLeft} />
                    Back
                  </BtnAddGroup>
                  {
                    userInfo?.data?.RoleId === "1" ? '' :
                      <BtnAddGroup onClick={() => setShowAddUserGroup(true)}>+ New User</BtnAddGroup>
                  }
                  <ModalAddUserGroup group={dataDetail} show={showAddUserGroup} handle={{ setShowAddUserGroup, showAddUserGroup, callApiGroup, setCallApiGroup }}></ModalAddUserGroup>
                </BtnContainer>
              </HeaderContainer>
            </Header>
            <Name>
              <NameText>Name</NameText>
              <NameTitle>{userInfo?.data?.RoleId === "1" ? "Staff" : userInfo?.data?.RoleId === "2" ? 'Manager' : 'Admin'}</NameTitle>
            </Name>
            <Master>
              <NameText>Master</NameText>
              <MemberContainer>
                {
                  dataUser?.map((user, id) => (
                    user?.GroupId?.includes(dataDetail._id) && user?.RoleId === "2" ? <MemberInfo key={id}>
                      <Icon alt={user?.Name} src={user?.Avatar ? user?.Avatar : AvatarDefault}></Icon>
                      <NameTextInfo>{user?.Name}</NameTextInfo>
                      {
                        userInfo?.data?.RoleId === "3" ?
                          <BtnDelete onClick={() => handleDeleteUser(user?._id, dataDetail?._id)}>
                            <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faXmark} />
                          </BtnDelete> : ''
                      }

                    </MemberInfo> : ''
                  ))
                }
              </MemberContainer>
            </Master>
            <Members>
              <NameText>Members</NameText>
              <MemberContainer>
                {
                  dataUser?.map((user, id) => (
                    user?.GroupId.includes(dataDetail._id) && user?.RoleId === "1" ? <MemberInfo key={id}>
                      <Icon alt={user?.Name} src={user?.Avatar ? user?.Avatar : AvatarDefault}></Icon>
                      <NameTextInfo>{user?.Name}</NameTextInfo>
                      {
                        userInfo?.data?.RoleId !== "1" && user.RoleId === "1" ?
                          <BtnDelete onClick={() => handleDeleteUser(user?._id, dataDetail?._id)}>
                            <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faXmark} />
                          </BtnDelete> : ''
                      }

                    </MemberInfo> : ''
                  ))
                }
              </MemberContainer>
            </Members>
          </GroupDetail>
      }
    </Container >
  );
}

export default UserGroup;