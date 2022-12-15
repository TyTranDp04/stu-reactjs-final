import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { faMagnifyingGlass, faRecycle } from '@fortawesome/free-solid-svg-icons';
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
  InputSearch,
  FormData,
  Thead,
  Tbody,
  Tr,
  Th, BoxHeader, ButtonAddDayOff, ButtonSearchDayOff, TrHead, TableScroll, TextArea, ThContent, ButtonRestoreDayOff

} from './style'
import ActionUser from './ActionUser';
import ActionMaster from './ActionMaster';
import ModalAddData from './ModalAddData';
import { URL_API } from '../../api/dayoff.api';
import ModalUpdateData from './ModalUpdateData';
import TableRestore from './TableRestore';
const TableDayOff = (props) => {
  const [showRestore, setShowRestore] = useState(true)
  const [data, setData] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const [dataStore, setDataStore] = useState()
  const [idRequest, setIdRequest] = useState()
  const [dataDetail, setDataDetail] = useState()
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const dataUser = userInfo?.data?.user

  const formData = {
    UserId: dataUser?.id,
    RoleId: dataUser?.RoleId,
    GroupId: dataUser?.GroupId,
    Name: dataUser?.Name,
  }

  const urlGetDayOff = URL_API + "/dayoff"

  const urlGetDayOffStore = URL_API + "/dayoff-soft"
  async function getDataDayOff() {
    await Axios.post(urlGetDayOff, formData)
      .then(res => setData(res?.data))
      .catch(err => console.log(err))
  }
  async function getDataDayOffStore() {
    await Axios.post(urlGetDayOffStore, { UserId: dataUser?.id, RoleId: dataUser?.RoleId, })
      .then(res => setDataStore(res?.data?.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataDayOff()
    getDataDayOffStore()
  }, [callApiTable])
  const idMaster = data?.idMaster
  const dayOffData = data?.data
  useEffect(() => {
    const newDataDayOff = []
    dayOffData?.map((e, index) => {
      newDataDayOff[dayOffData?.length - index - 1] = e
    })
    setDataDayOff(newDataDayOff)
  }, [data])
  function handleDetail(data) {
    setDataDetail(data)
    setShowDetail(true)
  }

  return (
    <Main id="site-main" className='col-sm-9 col-lg-10'>
      {!showDetail ?
        showRestore ?
          <ContainerDefault >
            <BoxHeader>
              <BoxNav class="box-nav d-flex justify-between">
                <Span>{dataDayOff?.length} Day Off Request</Span>
                {
                  dataUser?.RoleId === "3" ? '' :
                    <ButtonAddDayOff onClick={() => setShowModalAdd(true)}>
                      + Add day off
                    </ButtonAddDayOff>
                }{
                  dataUser?.RoleId === "3" ? '' :
                    <ButtonRestoreDayOff onClick={() => setShowRestore(false)}>
                      <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faRecycle} />
                      Restore day off
                    </ButtonRestoreDayOff>
                }
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
                        <ThContent>Member</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Dayoff from</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Dayoff to</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Reason</ThContent>
                      </Th>
                      <Th>
                        <ThContent>Status</ThContent>
                      </Th>
                      {
                        dataUser?.RoleId === "3" ? '' : <Th>
                          <ThContent>Action</ThContent>
                        </Th>
                      }
                    </TrHead>
                  </Thead>
                  <Tbody >
                    {
                      dataDayOff?.map((e, index) => (
                        <Tr key={index}>
                          <Th style={{ padding: '12px 0', width: '50px' }} onClick={() => handleDetail(e)}>
                            <ThContent>
                              {index + 1}
                            </ThContent>
                          </Th>
                          <Th onClick={() => handleDetail(e)}>
                            <ThContent>
                              {e.Name}
                            </ThContent>
                          </Th>
                          <Th onClick={() => handleDetail(e)}>
                            <ThContent>
                              <TimeDayOff date={e.DayOffFrom}></TimeDayOff>
                            </ThContent>
                          </Th>
                          <Th onClick={() => handleDetail(e)}>
                            <ThContent>
                              <TimeDayOff date={e.DayOffTo}></TimeDayOff>
                            </ThContent>
                          </Th >
                          <Th style={{ minWidth: '200px' }} onClick={() => handleDetail(e)}>
                            <TextArea style={{ minWidth: '200px' }} value={e.Reason} disabled></TextArea>
                          </Th>
                          <Th onClick={() => handleDetail(e)}>
                            <ThContent>
                              <DotStatus UserRequestId={e?.UserId} UserId={dataUser?.id} idMaster={idMaster} status={e.Status} arrayApprove={e.Approve}></DotStatus>
                            </ThContent>
                          </Th>
                          {
                            dataUser?.RoleId === "3" ? '' : <Th>
                              <ThContent>
                                {
                                  dataUser?.RoleId === "1" ? <ActionUser requestId={e._id} status={e.Status} handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }}></ActionUser> : <ActionMaster handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }} requestId={e._id} status={e.Status} arrayApprove={e.Approve} userId={dataUser?.id} requestUserId={e.UserId}></ActionMaster>
                                }
                              </ThContent>
                            </Th>
                          }
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableScroll>
            </FormData>
            <ModalAddData user={formData} show={showModalAdd} handle={{ setShowModalAdd, setCallApiTable, callApiTable }}></ModalAddData>
            <ModalUpdateData user={formData} show={showModalUpdate} handle={{ setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate }} idRequest={idRequest}></ModalUpdateData>
          </ContainerDefault> :
          <TableRestore
            handle={{ dataStore, setShowRestore, idMaster, dataUser, callApiTable, setCallApiTable }}
            dataStore={dataStore}
          ></TableRestore>
        : <DetailDayOff formData={formData} data={dataDetail} idMaster={idMaster} dataUser={dataUser} handle={{ setShowDetail, callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }} ></DetailDayOff>
      }
    </Main>
  );
}

export default TableDayOff;