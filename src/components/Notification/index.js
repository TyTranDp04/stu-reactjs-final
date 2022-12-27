import React, { useEffect } from 'react';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import {
  HeaderIcon,
  Span,
  Container,
  Content,
  Item,
  Menu,
  H3,
  ItemContent,
  Reason,
  Date,
  H4,
  B, ContentStatus,
  ContentDayOff,
  ReasonChange,
  BtnReadAll
} from "./style";
import { useState } from 'react';
import { URL_API } from '../../api/dayoff.api';
import axios from 'axios';
import { useSelector } from 'react-redux'
import TimeDayOff from '../TableDayOff/TimeDayOff';
const Notifycation = (props) => {
  const [showMenu, setShowMenu] = useState(false)
  const [data, setData] = useState()
  const [dataUser, setDataUser] = useState()
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApi, setCallApi] = useState(false)
  const [inverseData, setInverseData] = useState(false)
  const [dataGroup, setDataGroup] = useState()
  useEffect(() => {
    setDataUser(userInfo?.data)
  }, [userInfo])
  const urlGetDayOff = URL_API + "/notification/" + dataUser?.id
  async function getDataDayOff() {
    await axios.get(urlGetDayOff)
      .then(res => {
        if (dataUser?.RoleId === '2') {
          const newData = res?.data?.data?.filter(function (d) {
            return d?.Status === 1 || d?.Status === 5
          })
          setData(newData)
          setInverseData(!inverseData)
        }
        if (dataUser?.RoleId === '1') {
          const newData = res?.data?.data?.filter(function (d) {
            return d?.Status === 4 || d?.Status === 3 || d?.Status === 6 || d?.Status === 2
          })
          setData(newData)
          setInverseData(!inverseData)
        }
      })
      .catch()
  }
  useEffect(() => {
    const urlGetDayOff = URL_API + "/group"
    axios.get(urlGetDayOff)
      .then(res => {
        setDataGroup(res?.data?.data)
      })
  }, [dataUser])

  useEffect(() => {
    if (dataUser) {
      getDataDayOff()
    }
  }, [dataUser, userInfo, callApi, showMenu])
  useEffect(() => {
    const newDataNoti = []
    data?.map((e, index) => (
      newDataNoti[data?.length - index - 1] = e
    ))
    setData(newDataNoti)
  }, [inverseData])

  async function updateDataDayOff(e) {
    const body = {
      UserRead: dataUser.id,
      NotifyId: e?._id
    }
    const urlUpdateDayOff = URL_API + "/delete-notification"
    await axios.post(urlUpdateDayOff, body)
      .then(res => { })
      .catch(err => { })
  }
  function handleIsRead(e) {
    updateDataDayOff(e)
      .then(() => {
        setCallApi(!callApi)
      })
  }
  function handleReadAll() {
    readAll()
      .then(() => {
        setTimeout(() => {
          setCallApi(!callApi)
        }, 500)
      })
  }
  async function readAll() {
    const urlReadAll = URL_API + "/notification/" + dataUser?.id
    await axios.post(urlReadAll)
      .then((data) => {
      })
      .catch()
  }
  function statusText(status) {
    switch (status) {
      case 1:
        return "New Request"
      case 2:
        return "Approved"
      case 3:
        return "Rejected"
      case 4:
        return "Request change"
      case 5:
        return "Reverted"
      case 6:
        return "New group"
      default:
        return ''
    }
  }
  function checkGroup(dataGroup, id) {
    const group = dataGroup?.filter(function (data) {
      return data?._id === id
    })
    return group[0]?.Name
  }

  return (
    <>
      {dataUser?.RoleId === 3 ? '' :
        <Container>
          {
            data?.length === 0 ? '' :
              <HeaderIcon className={showMenu ? '' : 'hideAffter'} onClick={() => { setShowMenu(!showMenu) }}>
                <FontAwesomeIcon style={{ color: '#FECC09' }} icon={faBell} />
                <Span style={{ display: data?.length === 0 ? "none" : "" }} >{data?.length === 0 ? "" : data?.length}</Span>
              </HeaderIcon>
          }
          {
            data?.length !== 0 && showMenu ? <Content>
              <H3>Notification</H3>
              <Menu>
                {
                  data?.map((e, index) => (
                    <Link key={index} to={e?.Status === 1 || e?.Status === 4 ? "/request-log-off" : "/log-off"}>
                      <Item onClick={() => handleIsRead(e)}>
                        <ItemContent>
                          {
                            <ContentStatus style={{ display: 'flex', flexDirection: 'column', marginBottom: '5px' }}>
                              <B style={{ color: '#8000FF' }} className={statusText(e?.Status)}>
                                {
                                  statusText(e?.Status)
                                }
                              </B>
                              {
                                e?.Status === 1 || e?.Status === 6 ? '' : e?.Status === 2?'':
                                  <ReasonChange><B>Reason: </B>{e.ReasonChange}</ReasonChange>
                              }
                            </ContentStatus>
                          }
                          <ContentDayOff>
                            {
                              dataUser?.RoleId !== "2" ? '' :
                                <Date>
                                  <H4><B>Name: </B> {e?.Name}</H4>
                                </Date>
                            }
                            {
                              e?.Status === 6 ? <ReasonChange><B>You have been added to the group </B>
                                <B>{
                                  checkGroup(dataGroup, e?.GroupId)
                                }</B>
                              </ReasonChange> :
                                <Date>
                                  <H4><B style={{ marginRight: '5px' }}>Day Off From:</B></H4>
                                  <TimeDayOff date={e?.DayOffFrom}></TimeDayOff>
                                </Date>
                            }
                            {
                              e?.Status === 6 ? '' :
                                <Date>
                                  <H4><B style={{ marginRight: '5px' }}>Day Off To:</B></H4>
                                  <TimeDayOff date={e?.DayOffFrom}></TimeDayOff>
                                </Date>
                            }
                            {
                              dataUser?.RoleId !== "2" ? '' :
                                <Date>
                                  <H4><B>Type: </B> {e?.Type === 0 ? "OFF" : 'WFH'}</H4>
                                </Date>
                            }
                            {
                              dataUser?.RoleId !== "2" ? '' :
                                <Date>
                                  <Reason><B>Reason: </B>{e?.Reason}</Reason>
                                </Date>
                            }
                          </ContentDayOff>
                        </ItemContent>
                      </Item>
                    </Link>
                  ))
                }
                <Link to={'/request-log-off'}>
                  <BtnReadAll type='button' onClick={() => handleReadAll()}>
                    Read all
                  </BtnReadAll>
                </Link>
              </Menu>
            </Content> : ''
          }
        </Container>
      }
    </>
  );
}

export default Notifycation;