import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import {
  Container,
  User, Group, GroupDetail, HeaderContainer, BtnContainer, H3, Avatar, H4, Header, TdContent, BtnAddGroup, Thead, Tr, Th, Td, Tbody,
  Content, Name, NameTitle, Master, MemberContainer, MemberInfo, BtnDelete, Icon, Members, NameTextInfo, NameText, BtnDeleteGroup
} from './style'
import axios from 'axios';
function UserGroup(props) {
  const [showDetail, setShowDetail] = useState(true)
  const [dataUser, setDataUser] = useState()
  const [dataGroup, setDataGroup] = useState()
  const [dataDetail, setDataDetail] = useState()
  const urlGetUser = process.env.REACT_APP_URL_WEBSITE + '/user'
  const urlGetGroup = process.env.REACT_APP_URL_WEBSITE + '/group'
  async function getDataUser() {
    await axios.get(urlGetUser)
      .then(res => setDataUser(res?.data))
      .catch(err => console.log(err))
  }
  async function getDataGroup() {
    await axios.get(urlGetGroup)
      .then(res => setDataGroup(res?.data?.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataUser()
    getDataGroup()
  }, [])
  function handleShowDetail(group){
    setDataDetail(group)
    setShowDetail(false)
  }
  return (
    <Container className='col-sm-9 col-lg-10'>
      {
        showDetail ?
          <Group>
            <Header>
              <BtnAddGroup>+ New Group</BtnAddGroup>
            </Header>
            <Content>

              <Table striped bordered hover>
                <Thead>
                  <Tr>
                    <Th>Group</Th>
                    <Th>Member(s)</Th>
                    <Th>Master(s)</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    dataGroup?.map((e, index) => (
                      <Tr key={index}>
                        <Td onClick={()=> handleShowDetail(e)}>{e.Name}</Td>
                        <Td style={{display: 'flex'}}>
                          {
                            dataUser?.map((user, id) => (
                              user.GroupId.includes(e._id) && user.RoleId !== "3"? <User>
                                <Avatar src={user.Avatar}></Avatar>
                                <H4>{user.Name}</H4>
                              </User>:''
                            ))
                          }
                        </Td>
                        <Td>
                          <TdContent>
                          {
                            dataUser?.map((user, id) => (
                              user.GroupId.includes(e._id) && user.RoleId == "2"? <User>
                                <Avatar src={user.Avatar}></Avatar>
                                <H4>{user.Name}</H4>
                              </User>:''
                            ))
                          }
                          </TdContent>
                        </Td>
                        <Td>
                          <BtnDeleteGroup>Delete</BtnDeleteGroup>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>


            </Content>
          </Group>
          :
          <GroupDetail>
            <Header>
              <HeaderContainer>
              <NameText>Basic infomation</NameText>
              <BtnContainer>
                <BtnAddGroup>+ New Group</BtnAddGroup>
                <BtnAddGroup>+ New Group</BtnAddGroup>
              </BtnContainer>
              </HeaderContainer>
            </Header>
          </GroupDetail>
      }
    </Container>
  );
}

export default UserGroup;