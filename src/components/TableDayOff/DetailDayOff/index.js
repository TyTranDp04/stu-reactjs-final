import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  ContainerStyled,
  H3,
  H4,
  BtnBack,
  FormDetail,
  Span,
  FormDetailcontainer
} from './style'
import ActionUser from '../ActionUser';
import ActionMaster from '../ActionMaster';
import { faAngleLeft,faRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonAddDayOff } from '../../TableShowDayOff/style';
import DotStatus from '../DotStatus';
import TimeDayOff from '../TimeDayOff';
import ModalUpdateData from '../ModalUpdateData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { checkTypeRequest } from '../../../constants/dayoff';
const DetailDayOff = (props) => {
  const { callApiTable, setShowDetail, setCallApiTable, showModalUpdate, setIdRequest, setShowModalUpdate } = props.handle
  const { dataUser, data, idMaster, formData, dataAllUser } = props
  const [dataDayOff, setDataDayOff] = useState(data)
  const [dataHistory, setDataHistory] = useState()
  const idDayOff = data?._id

  async function getHistory() {
    const urlGetHistory = process.env.REACT_APP_URL_WEBSITE + "/history/" + idDayOff
    await axios.get(urlGetHistory)
      .then(res => setDataHistory(res?.data?.data))
  }
  useEffect(() => {
    getHistory()
    getDataDayOff()
  }, [callApiTable])
  async function getDataDayOff() {
    const urlGetDayOff = process.env.REACT_APP_URL_WEBSITE + "/dayoff/" + idDayOff
    await axios.get(urlGetDayOff, formData)
      .then(res => setDataDayOff(res?.data?.data))
  }
  useEffect(() => {
    getDataDayOff()
  }, [callApiTable])
  return (
    <ContainerStyled>
      <ModalUpdateData user={formData} show={showModalUpdate}
        handle={{ setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate }}
        idRequest={dataDayOff?._id}></ModalUpdateData>
      <Container fluid className='h-100'>
        <Row>
          <BtnBack>
            <ButtonAddDayOff onClick={() => setShowDetail(false)}>
              <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faAngleLeft} />
              Back to list day off
            </ButtonAddDayOff>
          </BtnBack>
          <Col>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              <Col className='d-flex'>
                <H3>Day off detail</H3>
              </Col>
              <Col className='d-flex w-100 col__info'>
                <Row className='d-flex flex-column row__info w-30'>
                  <H4>Type</H4>
                  <H4>From</H4>
                  <H4>To</H4>
                  <H4>Time</H4>
                  <H4>Quantity</H4>
                  <H4>Reason</H4>
                  <H4>Status</H4>
                </Row>
                <Row className=' d-flex flex-column row__info  w-70'>
                  <H4 >
                    {dataDayOff?.Type === 0 ? 'OFF' : "WFH"}
                  </H4>
                  <H4 className="text__start">
                    <TimeDayOff date={dataDayOff?.DayOffFrom}></TimeDayOff>
                  </H4>
                  <H4 className="text__start">
                    <TimeDayOff date={dataDayOff?.DayOffTo}></TimeDayOff>
                  </H4>
                  <H4>
                    {dataDayOff?.Time}
                  </H4>
                  <H4>{dataDayOff?.Quantity}</H4>
                  <H4>{dataDayOff?.Reason}</H4>
                  <H4 className="text__start">
                    <DotStatus data={dataDayOff} UserId={dataUser?.id} idMaster={idMaster} ></DotStatus>
                  </H4>
                </Row>
              </Col>
              <Col >
                <Row className='d-flex flex-column md-6 col__info'>
                  <Col style={{ marginBottom: '0' }}>
                    <H3>Action</H3>
                  </Col>
                  <Col className='d-flex btn__container'>
                    {
                      dataUser?.RoleId === "3" ? '' :
                        dataUser?.RoleId === "1" ?
                          <ActionUser
                            formData={formData}
                            data={dataDayOff}
                            handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }}>
                          </ActionUser> :
                          <ActionMaster
                            formData={formData}
                            userId={dataUser?.id}
                            handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }}
                            data={dataDayOff}>
                          </ActionMaster>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <H3>Histories</H3>
            {
              dataHistory?.map((e, index) => (
                <Row style={{marginTop: '10px'}} key={index}>
                  {e?.Status === 1 ?
                    <>
                      {
                        checkTypeRequest(e?.Status, e?.Parent[0]?.Name, e?.Parent?.length === 2 )
                      }
                      <FormDetail className='d-flex'>
                        <FormDetailcontainer>
                          <Span>From:
                            &nbsp;
                            <TimeDayOff date={e?.Parent[0]?.DayOffFrom}></TimeDayOff>
                          </Span>
                          <Span>To:
                            &nbsp;
                            {
                              <TimeDayOff date={e?.Parent[0]?.DayOffTo}></TimeDayOff>
                            }</Span>
                          <Span>Time: {e?.Parent[0]?.Time}</Span>
                          <Span>Quantity: {e?.Parent[0]?.Quantity}</Span>
                          <Span>Reason: {e?.Parent[0]?.Reason}</Span>
                        </FormDetailcontainer>
                        {
                          e?.Parent?.length !== 2 ? '' :
                            <FontAwesomeIcon style={{ color: '#838383' }} icon={faRightLong} />
                        }
                        {
                          e?.Parent?.length === 2 ?
                            <FormDetailcontainer>
                              <Span>From:
                                &nbsp;
                                <TimeDayOff date={e?.Parent[1]?.DayOffFrom}></TimeDayOff>
                              </Span>
                              <Span>To:
                                &nbsp;
                                {
                                  <TimeDayOff date={e?.Parent[1]?.DayOffTo}></TimeDayOff>
                                }</Span>
                              <Span>Time: {e?.Parent[1]?.Time}</Span>
                              <Span>Quantity: {e?.Parent[1]?.Quantity}</Span>
                              <Span>Reason: {e?.Parent[1]?.Reason}</Span>
                            </FormDetailcontainer> : ''
                        }
                      </FormDetail>
                    </> :
                    <>
                      <FormDetailcontainer>
                        <H4>{
                          dataAllUser?.map((user) => (
                            user?._id === e?.UserActionId ?
                              checkTypeRequest(e?.Status, user?.Name) : ''
                          ))
                        }
                        </H4>
                        {
                          e?.Status === 2 ? '' :
                            <Span className='reason__change'>
                              Reason: &nbsp;
                              {e?.ReasonChange}
                            </Span>
                        }
                      </FormDetailcontainer>
                    </>
                  }
                </Row>
              ))
            }
          </Col>
        </Row>
      </Container>
    </ContainerStyled>
  );
}

export default DetailDayOff;