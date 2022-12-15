import React from 'react';
import {

  BoxNav,
  Span,
  FormSearch,
  InputSearch,
  FormData,
  Thead,
  Tbody,
  Tr,
  ContainerRestore,
  Th, BoxHeader, ButtonAddDayOff, ButtonSearchDayOff, TrHead, TableScroll, TextArea, ThContent

} from '../style'
import Table from 'react-bootstrap/Table';
import { faAngleLeft, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TimeDayOff from '../TimeDayOff';
import DotStatus from '../DotStatus';
import ActionRestore from '../ActionRestore';
const  TableRestore = (props) => {
  const {callApiTable, setCallApiTable, setShowRestore, idMaster, dataUser} = props.handle
  const {dataStore} = props
  return (
    <>
      <ContainerRestore>
        <BoxHeader>
          <BoxNav class="box-nav d-flex justify-between">
            <Span>{dataStore?.length} Day Off Request</Span>
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
                  dataStore?.map((e, index) => (
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
                      <Th >
                        <ThContent>
                          <DotStatus idMaster={idMaster} status={e.Status} arrayApprove={e.Approve}></DotStatus>
                        </ThContent>
                      </Th>
                      {
                        dataUser?.RoleId === "3" ? '' : <Th>
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
    </>
  );
}

export default TableRestore;