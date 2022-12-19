import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { faCheck, faClockRotateLeft, faList, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table';
import {
  Main,
  ContainerDefault,
  BoxNav,
  InputSearch,
  FormData,
  Thead,
  Tbody,
  Tr,
  Th, BoxHeader, ButtonAddDayOff, TrHead, TableScroll, ThContent, Span,

} from './style'
import { URL_API } from '../../api/dayoff.api';
import DotStatus from '../TableDayOff/DotStatus';
import TimeDayOff from '../TableDayOff/TimeDayOff';
import { FormSearch, ButtonSearchDayOff } from '../TableDayOff/style';
import DetailDayOff from '../TableDayOff/DetailDayOff';
import { totalDay } from '../../constants/dayoff';
const TableShowDayOff = (props) => {
  const [data, setData] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [dataDetail, setDataDetail] = useState()
  const [showDetail, setShowDetail] = useState(false)
  const [dataAllUser, setDataAllUser] = useState()

  const dataUser = userInfo?.data?.user
  const idMaster = data?.idMaster
  const formData = {
    UserId: dataUser?.id,
    RoleId: dataUser?.RoleId,
    GroupId: dataUser?.GroupId,
    Name: dataUser?.Name,
  }
  const urlGetDayOff = URL_API + "/dayoff"
  async function getDataDayOff() {
    await Axios.post(urlGetDayOff, formData)
      .then(res => {
        const data = res?.data?.data
        const newData = []
        data?.map((e, index) => (
          newData[data?.length - index - 1] = e
        ))
        setData(newData)
      }

      )
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataDayOff()
  }, [callApiTable])

  useEffect(() => {
    switch (typeFilter) {
      case "all":
        const all = data?.filter(function (e) {
          return e.Status === 2 || e.Status === 3 || e.Status === 5
        })
        setDataDayOff(all)
        break;
      case "approved":
        const approved = data?.filter(function (e) {
          return e.Status === 2
        })
        setDataDayOff(approved)
        break;
      case "rejected":
        const rejected = data?.filter(function (e) {
          return e.Status === 3
        })
        setDataDayOff(rejected)
        break;
      case "reverted":
        const reverted = data?.filter(function (e) {
          return e.Status === 5
        })
        setDataDayOff(reverted)
        break;
      default:
        setDataDayOff(data)
        break;
    }
  }, [data, typeFilter, callApiTable])
  function handleDetail(data) {
    setDataDetail(data)
    setShowDetail(true)
  }
  async function getDataUser() {
    const urlGetDataUser = URL_API + "/user"
    await Axios.get(urlGetDataUser)
      .then(res => setDataAllUser(res?.data))
      .catch(err => console.log(err))
  }
  useEffect(()=>{
    getDataUser()
  },[])
  
  return (
    <Main id="site-main" className='col-sm-9 col-lg-10'>
      {
        !showDetail ?
          <ContainerDefault >
            <BoxHeader>
              <BoxNav class="box-nav d-flex justify-between">
                <Span>{dataDayOff?.length} Log-off</Span>
                <ButtonAddDayOff onClick={() => setTypeFilter('all')}>
                  <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faList} />
                  {" All day off"}
                </ButtonAddDayOff>
                <ButtonAddDayOff onClick={() => setTypeFilter('approved')}>
                  <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faCheck} />
                  Approved day off
                </ButtonAddDayOff>
                <ButtonAddDayOff onClick={() => setTypeFilter('rejected')}>
                  <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faXmark} />
                  Rejected day off
                </ButtonAddDayOff>
                <ButtonAddDayOff onClick={() => setTypeFilter('reverted')}>
                  <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faClockRotateLeft} />
                  Reverted day off
                </ButtonAddDayOff>
              </BoxNav>
              <FormSearch>
                <InputSearch type="search" placeholder="Search day off..." aria-label="Search" />
                <ButtonSearchDayOff type="submit">
                  <FontAwesomeIcon style={{ color: '#8000FF' }} icon={faMagnifyingGlass} />
                </ButtonSearchDayOff>
              </FormSearch>
            </BoxHeader>
            <FormData action="/" method="POST">
              <TableScroll>
                <Table striped bordered hover>
                  <Thead class="thead-dark">
                    <TrHead>
                      <Th>
                        <ThContent>#</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Request for date</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Quantity</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Requester</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Status</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Request date</ThContent>
                      </Th>
                    </TrHead>
                  </Thead>
                  <Tbody >
                    {
                      dataDayOff?.map((e, index) => (
                        e?.Status !== 1 && e?.Status !== 4 ?
                          <Tr key={index} onClick={() => handleDetail(e)}>
                            <Th style={{ padding: '12px 0', width: '50px' }} >
                              <ThContent>
                                {index + 1}
                              </ThContent>
                            </Th>
                            <Th onClick={() => handleDetail(e)}>
                              {e?.Quantity <= 1 ?
                                <ThContent>
                                  <TimeDayOff date={e.DayOffFrom}></TimeDayOff>
                                </ThContent>
                                : <ThContent>
                                  <TimeDayOff date={e.DayOffFrom}></TimeDayOff> -
                                  <TimeDayOff date={e.DayOffTo}></TimeDayOff>
                                </ThContent>
                              }
                            </Th>
                            <Th onClick={() => handleDetail(e)}>
                              <ThContent>
                                {e?.Quantity}
                              </ThContent>
                            </Th >
                            <Th onClick={() => handleDetail(e)}>
                              <ThContent>
                                {e?.Name}
                              </ThContent>
                            </Th >
                            <Th onClick={() => handleDetail(e)}>
                              <ThContent>
                                <DotStatus data={e} idMaster={idMaster} UserId={dataUser?.id}></DotStatus>
                              </ThContent>
                            </Th>
                            <Th onClick={() => handleDetail(e)}>
                              <ThContent>
                                {
                                  totalDay(e?.createdAt)
                                }
                              </ThContent>
                            </Th >
                          </Tr> : ''
                      ))
                    }
                  </Tbody>
                </Table>
              </TableScroll>
            </FormData>
          </ContainerDefault>
          : <DetailDayOff dataAllUser={dataAllUser} formData={formData} data={dataDetail} idMaster={idMaster} dataUser={dataUser} handle={{ setShowDetail, callApiTable, setCallApiTable }} ></DetailDayOff>
      }

    </Main>
  );
}

export default TableShowDayOff;