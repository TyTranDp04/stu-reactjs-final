import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { faAngleLeft, faMagnifyingGlass, faRecycle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DotStatus from './DotStatus';
import { useSelector } from 'react-redux'
import TimeDayOff from './TimeDayOff';
import "react-datepicker/dist/react-datepicker.css";

import {
  Main,
  ContainerDefault,
  BoxNav,
  Span,
  FormSearch,
  InputSearch,
  FormData,
  Table,
  Thead,
  Tbody,
  Tr,
  ContainerRestore,
  Th, SelectRequest, BoxHeader, ButtonAddDayOff, ButtonSearchDayOff, TrHead, TableScroll, TextArea, ThContent, ButtonRestoreDayOff

} from './style'
import ActionUser from './ActionUser';
import ActionMaster from './ActionMaster';
import ModalAddData from './ModalAddData';
import ActionRestore from './ActionRestore';
import { URL_API } from '../../api/dayoff.api';
import ModalUpdateData from './ModalUpdateData';
const TableDayOff = (props) => {
  const [showRestore, setShowRestore] = useState(true)
  const [data, setData] = useState()
  const [dataStore, setDataStore] = useState()
  const [idRequest, setIdRequest] = useState()
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const dataUser = userInfo?.data?.user
  const formData = {
    UserId: dataUser?.id,
    RoleId: dataUser?.RoleId,
    GroupId: dataUser?.GroupId,
    Name: dataUser?.Name,
  }
  const urlGetDayOff = URL_API+"/dayoff"
  const urlGetDayOffStore = URL_API+"/dayoff-soft"

  async function getDataDayOff() {
    await Axios.post(urlGetDayOff, formData)
      .then(res => setData(res))
      .catch(err => console.log(err))
  }
  async function getDataDayOffStore() {
    await Axios.post(urlGetDayOffStore, {UserId: dataUser?.id,RoleId: dataUser?.RoleId,})
      .then(res => setDataStore(res))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataDayOff()
    getDataDayOffStore()
  }, [callApiTable])
  const Data = data?.data?.data
  const dataDayOff = Data?.reverse()
  const dataDayOffStore = dataStore?.data?.data
  const idMaster = data?.data?.idMaster
  return (
    <Main id="site-main" className='col-sm-9 col-lg-10'>
      { showRestore?
      <ContainerDefault >
        <BoxHeader>
          <BoxNav class="box-nav d-flex justify-between">
            <Span>{dataDayOff?.length} Day Off Request</Span>
            <ButtonAddDayOff onClick={() => setShowModalAdd(true)}>
              + Add day off
            </ButtonAddDayOff>
            <ButtonRestoreDayOff onClick={() => setShowRestore(false)}>
              <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faRecycle} />
              Restore day off
            </ButtonRestoreDayOff>
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
            <Table className="table">
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
                      <Th style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", padding: '12px 0', width: '50px' }}>
                        <ThContent>
                          {index + 1}
                        </ThContent>
                      </Th>
                      <Th>
                        <ThContent>
                          {e.Name}
                        </ThContent>
                      </Th>
                      <Th>
                        <ThContent>
                          <TimeDayOff date={e.DayOffFrom}></TimeDayOff>
                        </ThContent>
                      </Th>
                      <Th>
                        <ThContent>
                          <TimeDayOff date={e.DayOffTo}></TimeDayOff>
                        </ThContent>
                      </Th>
                      <Th style={{ minWidth: '200px' }}>
                        <TextArea style={{ minWidth: '200px' }} value={e.Reason} disabled></TextArea>
                      </Th>
                      <Th style={{ border: "none" }}>
                        <ThContent>
                          <DotStatus idMaster={idMaster} status={e.Status} arrayApprove={e.Approve}></DotStatus>
                        </ThContent>
                      </Th>
                      {
                        dataUser?.RoleId === "3" ? '' : <Th style={{ borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
                          <ThContent>
                            {
                              dataUser?.RoleId === "1" ? <ActionUser requestId={e._id} status={e.Status} handle={{ callApiTable, setCallApiTable, setShowModalUpdate,setIdRequest }}></ActionUser> : <ActionMaster handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }} requestId={e._id} status={e.Status} arrayApprove={e.Approve} userId={dataUser?.id} requestUserId={e.UserId}></ActionMaster>
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
      </ContainerDefault>:
      <ContainerRestore>
        <BoxHeader>
          <BoxNav class="box-nav d-flex justify-between">
            <Span>{dataDayOffStore?.length} Day Off Request</Span>
            <ButtonAddDayOff onClick={() => setShowRestore(true)}>
                <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faAngleLeft} />
                Back
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
            <Table className="table">
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
                  dataDayOffStore?.map((e, index) => (
                    <Tr key={index}>
                      <Th style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", padding: '12px 0', width: '50px' }}>
                      <ThContent>
                          {index + 1}
                        </ThContent>
                      </Th>
                      <Th>
                        <ThContent>
                          {e.Name}
                        </ThContent>
                      </Th>
                      <Th>
                        <ThContent>
                          <TimeDayOff date={e.DayOffFrom} value={true}></TimeDayOff>
                        </ThContent>
                      </Th>
                      <Th>
                        <ThContent>
                          <TimeDayOff date={e.DayOffTo} value={false}></TimeDayOff>
                        </ThContent>
                      </Th>
                      <Th style={{ minWidth: '200px' }}>
                        <TextArea style={{ minWidth: '200px' }} value={e.Reason} disabled></TextArea>
                      </Th>
                      <Th style={{ border: "none" }}>
                        <ThContent>
                          <DotStatus idMaster={idMaster} status={e.Status} arrayApprove={e.Approve}></DotStatus>
                        </ThContent>
                      </Th>
                      {
                        dataUser?.RoleId === "3" ? '' : <Th style={{ borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
                          <ThContent>
                            <ActionRestore requestId={e._id} status={e.Status} handle={{ callApiTable, setCallApiTable }}></ActionRestore>
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
      </ContainerRestore>
      }
    </Main>
  );
}

export default TableDayOff;