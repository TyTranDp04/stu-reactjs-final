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
  ReasonChange
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

  useEffect(() => {
    setDataUser(userInfo?.data?.user)
  }, [userInfo])
  const urlGetDayOff = URL_API + "/notification/" + dataUser?.id
  async function getDataDayOff() {
    await axios.get(urlGetDayOff)
      .then(res => {
        if (dataUser?.RoleId === '2') {
          const newData = res?.data?.data.filter(function (d) {
            return d.Status === 1 || d.Status === 5
          })
          setData(newData)
          setInverseData(!inverseData)
        }
        if (dataUser?.RoleId === '1') {
          const newData = res?.data?.data.filter(function (d) {
            return d.Status === 4 || d.Status === 3
          })
          setData(newData)
          setInverseData(!inverseData)
        }
      })
      .catch(err => console.log(err))
  }
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
    console.log("e....fini",e)
    updateDataDayOff(e)
      .then(() => {
        setCallApi(!callApi)
      })
  }
  function statusText(status) {
    switch (status) {
      case 1:
        return "New Request"
      case 3:
        return "Rejected"
      case 4:
        return "Request change"
      case 5:
        return "Reverted"
        default:
        return ''
    }
  }
  return (
    <>
      {dataUser?.RoleId === 3 ? '' :
        <Container>
          <HeaderIcon className={showMenu ? '' : 'hideAffter'} onClick={() => { setShowMenu(!showMenu) }}>
            <FontAwesomeIcon style={{ color: '#FECC09' }} icon={faBell} />
            <Span style={{display: data?.length === 0 ? "none" : "" }} >{data?.length === 0 ? "" : data?.length }</Span>
          </HeaderIcon>
          {
            showMenu ? <Content>
              <H3>Notifycation</H3>
              <Menu>
                {
                  data?.map((e, index) => (
                    <Link key={index} to="/request-log-off">
                      <Item onClick={() => handleIsRead(e)}>
                        <ItemContent>
                          {
                            <ContentStatus style={{ display: 'flex',flexDirection: 'column', marginBottom: '5px' }}>
                              <B style={{ color: '#8000FF' }} className={statusText(e?.Status)}>
                                {
                                  statusText(e?.Status)
                                }
                              </B>
                              {
                                e?.Status === 1 ? '' :
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

                            <Date>
                              <H4><B style={{ marginRight: '5px' }}>Day Off From:</B></H4>
                              <TimeDayOff date={e?.DayOffFrom}></TimeDayOff>
                            </Date>
                            <Date>
                              <H4><B style={{ marginRight: '5px' }}>Day Off To:</B></H4>
                              <TimeDayOff date={e?.DayOffFrom}></TimeDayOff>
                            </Date>
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
              </Menu>
            </Content> : ''
          }
        </Container>
      }
    </>
  );
}

export default Notifycation;