import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import {  faCheck, faClockRotateLeft, faList, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSelector } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import Table from 'react-bootstrap/Table';

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
  Th, BoxHeader, ButtonAddDayOff, ButtonSearchDayOff, TrHead, TableScroll, TextArea, ThContent, 

} from './style'
import { URL_API } from '../../api/dayoff.api';
import DotStatus from '../TableDayOff/DotStatus';
import TimeDayOff from '../TableDayOff/TimeDayOff';
const TableShowDayOff = (props) => {
  const [data, setData] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const userInfo = useSelector(state => state.users.userInfoState);
  const [callApiTable, setCallApiTable] = useState(false)
  const [typeFilter, setTypeFilter] = useState('all')
  const dataUser = userInfo?.data?.user
  const formData = {
    UserId: dataUser?.id,
    RoleId: dataUser?.RoleId,
    GroupId: dataUser?.GroupId,
    Name: dataUser?.Name,
  }
  const urlGetDayOff = URL_API + "/dayoff"
  async function getDataDayOff() {
    await Axios.post(urlGetDayOff, formData)
      .then(res => setData(res?.data?.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataDayOff()
  }, [callApiTable])

  useEffect(()=>{
    switch (typeFilter) {
      case "all":
        setDataDayOff(data)
        break;
      case "approved":
        const approved = data.filter(function (e) {
          return e.Status === 2
        })
        setDataDayOff(approved)
        break;
      case "rejected":
        const rejected = data.filter(function (e) {
          return e.Status === 3
        })
        setDataDayOff(rejected)
        break;
      case "reverted":
        const reverted = data.filter(function (e) {
          return e.Status === 5
        })
        setDataDayOff(reverted)
        break;
      default:
        setDataDayOff(data)
        break;
    }
  }, [data, typeFilter, callApiTable])
  
  return (
    <Main id="site-main" className='col-sm-9 col-lg-10'>
      <ContainerDefault >
        <BoxHeader>
          <BoxNav class="box-nav d-flex justify-between">
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
                </TrHead>
              </Thead>
              <Tbody >
                {
                  dataDayOff?.map((e, index) => (
                    e?.Status !== 1 ?
                      <Tr key={index}>
                        <Th style={{ padding: '12px 0', width: '50px' }}>
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
                        <Th>
                          <ThContent>
                            <DotStatus status={e.Status} arrayApprove={e.Approve}></DotStatus>
                          </ThContent>
                        </Th>
                      </Tr> : ''
                  ))
                }
              </Tbody>
            </Table>
          </TableScroll>
        </FormData>
      </ContainerDefault>
    </Main>
  );
}

export default TableShowDayOff;