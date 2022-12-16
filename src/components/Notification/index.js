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
  Name,
  Reason,
  Date,
  H4,
  B
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
        setData(res?.data?.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    if (dataUser) {
      getDataDayOff()
        .then(() => {
          setInverseData(!inverseData)
        })
    }
  }, [dataUser, userInfo, callApi, showMenu])
  useEffect(()=>{
    const newDataNoti = []
    data?.map((e, index) => {
      newDataNoti[data?.length - index - 1] = e
    })
    setData(newDataNoti)
  },[inverseData])
  
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
  return (
    <>
      {
        dataUser?.RoleId === '2' ? <Container>
          <HeaderIcon className={showMenu ? '' : 'hideAffter'} onClick={() => { setShowMenu(!showMenu) }}>
            <FontAwesomeIcon style={{ color: '#FECC09' }} icon={faBell} />
            <Span>{data?.length}</Span>
          </HeaderIcon>
          {
            showMenu ? <Content>
              <H3>New log day off</H3>
              <Menu>
                {
                  data?.map((e, index) => (
                    <Link key={index} to="/day-off">
                      <Item onClick={() => handleIsRead(e)}>
                        <ItemContent>
                          <Name><B>Name: </B> {e.Name}</Name>
                          <Date>
                            <H4><B style={{ marginRight: '5px' }}>Day Off From:</B></H4>
                            <TimeDayOff date={e.DayOffFrom}></TimeDayOff>
                          </Date>
                          <Date>
                            <H4><B style={{ marginRight: '5px' }}>Day Off To:</B></H4>
                            <TimeDayOff date={e.DayOffFrom}></TimeDayOff>
                          </Date>
                          <Date>
                            <H4><B>Type: </B> {e.Type ? e.Type : 'none'}</H4>
                          </Date>
                          <Reason><B>Reason: </B>{e.Reason}</Reason>
                        </ItemContent>
                      </Item>
                    </Link>
                  ))
                }
              </Menu>
            </Content> : ''
          }
        </Container> : ''
      }
    </>
  );
}

export default Notifycation;