import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { faMagnifyingGlass, faXmark, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DotStatus from './DotStatus';
import { useSelector } from 'react-redux'
import TimeDayOff from './TimeDayOff';
import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table';
import DetailDayOff from './DetailDayOff';

import {
  Main,
  ContainerDefault,
  BoxNav,
  Span,
  FormSearch,
  SearchHeaderText,
  FormData,
  Thead,
  Tbody,
  Tr,
  Th, BoxHeader, ButtonAddDayOff, ButtonSearchDayOff, TrHead, TableScroll, ThContent,

} from './style'
import ActionUser from './ActionUser';
import ActionMaster from './ActionMaster';
import ModalAddData from './ModalAddData';
import { URL_API } from '../../api/dayoff.api';
import ModalUpdateData from './ModalUpdateData';
import { searchDataDayOff, totalDay } from '../../constants/dayoff';
import ReactDatePicker from "react-datepicker";
import ShowNodata from './ShowNodata';

const TableDayOff = (props) => {
  const [data, setData] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const [idRequest, setIdRequest] = useState()
  const [dataDetail, setDataDetail] = useState()
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [dataSearch, setDataSearch] = useState()
  const [dataFilterSearch, setDataFilterSearch] = useState()
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const dataUser = userInfo?.data;
  const idMaster = data?.idMaster
  const dayOffData = data?.data
  const [dataAllUser, setDataAllUser] = useState()

  const formData = {
    UserId: dataUser?.id,
    RoleId: dataUser?.RoleId,
    GroupId: dataUser?.GroupId,
    Name: dataUser?.Name,
  }
  async function getDataDayOff() {
    const urlGetDayOff = URL_API + "/dayoff"
    await Axios.post(urlGetDayOff, formData)
      .then(res => {
        setData(res?.data)
      }
      )
  }
  async function getDataUser() {
    const urlGetDataUser = URL_API + "/user"
    await Axios.get(urlGetDataUser)
      .then(res => setDataAllUser(res?.data))
  }

  useEffect(() => {
    getDataUser()
  }, [])
  useEffect(() => {
    getDataDayOff()
  }, [callApiTable])

  useEffect(() => {
    const newDataDayOff = []
    dayOffData?.map((e, index) => (
      newDataDayOff[dayOffData?.length - index - 1] = e
    ))
    const dataDayOffFilter = newDataDayOff.filter(function (e) {
      return e.Status !== 2 && e.Status !== 5
    })
    setDataDayOff(dataDayOffFilter)
    setDataFilterSearch(dataDayOffFilter)
  }, [data])
  function handleDetail(data) {
    setDataDetail(data)
    setShowDetail(true)
  }
  function handleSearch(e) {
    setDataSearch(e)
  }
  function clearSearch() {
    setDataSearch(null)
    setDataDayOff(dataFilterSearch)
  }
  function searchDayOff() {
    const newData =  searchDataDayOff(dataFilterSearch, dataSearch)
    setDataDayOff(newData)
  }
  
  return (
    <Main id="site-main">
    
        <ContainerDefault >
          <BoxHeader>
            <BoxNav class="box-nav d-flex justify-between">
              <Span>{dataDayOff?.length} Day Off Request</Span>
              {
                dataUser?.RoleId === "3" ? '' :
                  <ButtonAddDayOff onClick={() => setShowModalAdd(true)}>
                    + Add day off
                  </ButtonAddDayOff>
              }
            </BoxNav>
            <FormSearch>
              <SearchHeaderText>Filter by:</SearchHeaderText>
              <ReactDatePicker required autoComplete='off' placeholderText="DD/MM/YYYY"  selected={dataSearch} id='SearchDate' name='dateFrom' onChange={(e) => handleSearch(e)} dateFormat='dd/MM/yyyy' />
              <ButtonSearchDayOff style={{ width: '45px' }} type="button"  onClick={() => clearSearch()}>
                <FontAwesomeIcon style={{ color: '#8000FF' }} icon={faXmark} />
              </ButtonSearchDayOff>
              <ButtonSearchDayOff type="button" onClick={() => searchDayOff()}>
                <FontAwesomeIcon style={{ color: '#8000FF' }} icon={faMagnifyingGlass} />
              </ButtonSearchDayOff>
            </FormSearch>
          </BoxHeader>


          <FormData action="/" method="POST">
            <TableScroll>
              <Table striped bordered hover style={{ marginBottom: '0' }}>
                <Thead class="thead-dark">
                  <TrHead>
                    <Th  style={{ color: '#fff' }}>
                      <ThContent>No</ThContent>
                    </Th>
                    <Th style={{ color: '#fff' }}>
                      <ThContent>Request for date</ThContent>
                    </Th>
                    <Th style={{ color: '#fff' }}>
                      <ThContent>Quantity</ThContent>
                    </Th>
                    <Th style={{ color: '#fff' }}>
                      <ThContent>Requester</ThContent>
                    </Th>
                    <Th style={{ color: '#fff' }}>
                      <ThContent>Status</ThContent>
                    </Th>
                    <Th style={{ color: '#fff' }} >
                      <ThContent>Request date</ThContent>
                    </Th>
                    {
                      dataUser?.RoleId === "3" ? '' : <Th style={{ color: '#fff' }}>
                        <ThContent>Action</ThContent>
                      </Th>
                    }
                  </TrHead>
                </Thead>

                <Tbody >
                  {
                    dataDayOff?.map((e, index) => (
                      e?.Status === 2 || e?.Status === 5 ? '' :
                        <Tr key={index}>
                          <Th style={{ padding: '12px 0', width: '50px' }} onClick={() => handleDetail(e)}>
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
                          {
                            dataUser?.RoleId === "3" ? '' : <Th>
                              <ThContent>
                                {
                                  dataUser?.RoleId === "1" ? <ActionUser data={e} handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }}></ActionUser> : <ActionMaster handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }} data={e} userId={dataUser?.id}></ActionMaster>
                                }
                              </ThContent>
                            </Th>
                          }
                        </Tr>
                    ))
                  }
                </Tbody>
              </Table>
              {dataDayOff?.length === 0 ?
                  < ShowNodata ></ShowNodata> :''
              }
            </TableScroll>
          </FormData>
          <ModalAddData user={formData} show={showModalAdd} handle={{ setShowModalAdd, setCallApiTable, callApiTable }}></ModalAddData>
          <ModalUpdateData user={formData} show={showModalUpdate} handle={{ setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate }} idRequest={idRequest}></ModalUpdateData>
          {!showDetail ?'':
          <DetailDayOff dataAllUser={dataAllUser} formData={formData} data={dataDetail} idMaster={idMaster} dataUser={dataUser} handle={{ setShowDetail, callApiTable, setCallApiTable, setShowModalUpdate, showModalUpdate, setIdRequest }} ></DetailDayOff>
            }
          </ContainerDefault>
    </Main>
  );
}

export default TableDayOff;