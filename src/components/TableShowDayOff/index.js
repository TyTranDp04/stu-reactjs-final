import { faCheck, faClockRotateLeft, faList, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { URL_API } from '../../api/dayoff.api';
import DotStatus from '../TableDayOff/DotStatus';
import TimeDayOff from '../TableDayOff/TimeDayOff';
import {
  BoxHeader,
  BoxNav,
  ButtonAddDayOff,
  ContainerDefault,
  ContentSearch,
  FormData,
  FormSearch,
  Main,
  Span,
  TableScroll,
  Tbody,
  Th,
  ThContent,
  Thead,
  TittleSearch,
  Tr,
  TrHead,
} from './style';
import {  ButtonSearchDayOff } from '../TableDayOff/style';
import DetailDayOff from '../TableDayOff/DetailDayOff';
import { searchDataDayOff, totalDay } from '../../constants/dayoff';
import ReactDatePicker from 'react-datepicker';
import ShowNodata from '../TableDayOff/ShowNodata';
import ModalUpdateData from '../TableDayOff/ModalUpdateData';

const TableShowDayOff = (props) => {
  const [data, setData] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const [dataDetail, setDataDetail] = useState()
  const [idRequest, setIdRequest] = useState()
  const [showDetail, setShowDetail] = useState(false)
  const [dataAllUser, setDataAllUser] = useState()
  const [dataSearch, setDataSearch] = useState()
  const [dataFilterSearch, setDataFilterSearch] = useState()
  const [showModalUpdate, setShowModalUpdate] = useState(false)
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
  function searchDayOff() {
    const newData =  searchDataDayOff(dataFilterSearch, dataSearch)
    setDataDayOff(newData)
  }
  return (
    <Main id="site-main">
      <ContainerDefault >
        <BoxHeader>
          <BoxNav class="box-nav d-flex justify-between">
            <Span>{dataDayOff?.length} Log-off</Span>
            <ButtonAddDayOff onClick={() => setTypeFilter('all')}>
              <FontAwesomeIcon className='IconFontAwesome' style={{ color: '#fff', marginRight: '5px' }} icon={faList} />
              {" All day off"}
            </ButtonAddDayOff>
            <ButtonAddDayOff onClick={() => setTypeFilter('approved')}>
              <FontAwesomeIcon className='IconFontAwesome' style={{ color: '#fff', marginRight: '5px' }} icon={faCheck} />
              Approved day off
            </ButtonAddDayOff>
            <ButtonAddDayOff onClick={() => setTypeFilter('rejected')}>
              <FontAwesomeIcon className='IconFontAwesome' style={{ color: '#fff', marginRight: '5px' }} icon={faXmark} />
              Rejected day off
            </ButtonAddDayOff>
            <ButtonAddDayOff onClick={() => setTypeFilter('reverted')}>
              <FontAwesomeIcon className='IconFontAwesome' style={{ color: '#fff', marginRight: '5px' }} icon={faClockRotateLeft} />
              Reverted day off
            </ButtonAddDayOff>
          </BoxNav>
          <ContentSearch>
          <TittleSearch>Filter by:</TittleSearch>
          <FormSearch>
          
            <ReactDatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={dataSearch} id='SearchDate' name='dateFrom' onChange={(e) => handleSearch(e)} dateFormat='dd/MM/yyyy' />
            <ButtonSearchDayOff style={{ width: '45px' }} type="button" onClick={() => clearSearch()}>
              <FontAwesomeIcon style={{ color: '#8000FF', }} icon={faXmark} />
            </ButtonSearchDayOff>
            <ButtonSearchDayOff type="button" onClick={() => searchDayOff()}>
              <FontAwesomeIcon style={{ color: '#8000FF' }} icon={faMagnifyingGlass} />
            </ButtonSearchDayOff>
          </FormSearch>
          </ContentSearch>
        </BoxHeader>

        <FormData action="/" method="POST">
          <TableScroll>
            <Table striped bordered hover style={{ marginBottom: '0' }}>
              <Thead class="thead-dark">
                <TrHead>
                  <Th>
                    <ThContent>No</ThContent>
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
            {
              dataDayOff?.length === 0 ?
                < ShowNodata ></ShowNodata> : ''
            }
          </TableScroll>
        </FormData>
        <ModalUpdateData user={formData} show={showModalUpdate} handle={{ setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate }} idRequest={idRequest}></ModalUpdateData>

        {
          !showDetail ? ''
            : <DetailDayOff dataAllUser={dataAllUser} formData={formData} data={dataDetail} idMaster={idMaster} dataUser={dataUser} handle={{ setShowDetail, callApiTable, setCallApiTable, setIdRequest, setShowModalUpdate }} ></DetailDayOff>
        }
      </ContainerDefault>
    </Main >
  );
}

export default TableShowDayOff;