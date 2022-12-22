import { faCheck, faClockRotateLeft, faList, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { URL_API } from '../../api/dayoff.api';
import DetailDayOff from '../TableDayOff/DetailDayOff';
import DotStatus from '../TableDayOff/DotStatus';
import TimeDayOff from '../TableDayOff/TimeDayOff';
import { ButtonSearchDayOff, FormSearch, SearchHeaderText } from '../TableDayOff/style';
import {
  BoxHeader,
  BoxNav,
  ButtonAddDayOff,
  ContainerDefault,
  FormData,
  Main,
  Span,
  TableScroll,
  Tbody,
  Th,
  ThContent,
  Thead,
  Tr,
  TrHead
} from './style';
const TableShowDayOff = (props) => {
  const [data, setData] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [dataDetail, setDataDetail] = useState()
  const [showDetail, setShowDetail] = useState(false)
  const [dataAllUser, setDataAllUser] = useState()
  const [dataSearch, setDataSearch] = useState()
  const [dataFilterSearch, setDataFilterSearch] = useState()
  const dataUser = userInfo?.data
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
        setDataFilterSearch(newData)
      }

      )
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
  }
  useEffect(() => {
    getDataUser()
  }, [])
  function handleSearch(e) {
    setDataSearch(e)
  }
  function clearSearch() {
    setDataSearch(null)
    setDataDayOff(dataFilterSearch)
  }
  function totalDay(dataSearch, DayOffFrom) {
    const time = (((dataSearch - new Date(DayOffFrom)) / 360 / 24 / 10000) + 1)
    return time
  }
  function searchDayOff() {
    const newData = dataFilterSearch?.filter(function (e) {
      return (totalDay(dataSearch, new Date(e?.DayOffFrom)) <= 1 && totalDay(dataSearch, new Date(e?.DayOffFrom)) >= 0) || (totalDay(dataSearch, new Date(e?.DayOffTo)) <= 1 && totalDay(dataSearch, new Date(e?.DayOffTo)) >= 0);
    })
    setDataDayOff(newData)
    console.log(newData)
  }
  return (
    <Main id="site-main">
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
                <SearchHeaderText>Filter by:</SearchHeaderText>
                <ReactDatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={dataSearch} id='SearchDate' name='dateFrom' onChange={(e) => handleSearch(e)} dateFormat='dd/MM/yyyy' />
                <ButtonSearchDayOff style={{ width: '45px' }} type="button" onClick={() => clearSearch()}>
                  <FontAwesomeIcon style={{ color: '#8000FF', }} icon={faXmark} />
                </ButtonSearchDayOff>
                <ButtonSearchDayOff type="button" onClick={() => searchDayOff()}>
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