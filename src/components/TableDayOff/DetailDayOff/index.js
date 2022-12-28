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
  FormDetailcontainer,
  CustomCssDate,
  BtnContainer,
  ContainerRepository
} from './style'
import ActionUser from '../ActionUser';
import ActionMaster from '../ActionMaster';
import { faRightLong, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonAddDayOff } from '../../TableShowDayOff/style';
import DotStatus from '../DotStatus';
import TimeDayOff from '../TimeDayOff';
import ModalUpdateData from '../ModalUpdateData';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { checkTime, checkTypeRequest } from '../../../constants/dayoff';
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
      <Modal dialogClassName="my-modal" show={true}>
        <BtnBack>
          <ButtonAddDayOff style={{
            height: '45px', backgroundColor: 'transparent',
          }} onClick={() => setShowDetail(false)}>
            <FontAwesomeIcon style={{ color: '#8000FF', fontSize: '28px' }} icon={faXmark} />
          </ButtonAddDayOff>
        </BtnBack>
        <Modal.Body >
          <ModalUpdateData user={formData} show={showModalUpdate}
            handle={{ setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate }}
            idRequest={dataDayOff?._id}></ModalUpdateData>
          <Container fluid className='h-100'>
            <Row >
              <ContainerRepository>
              <Col  className=''>
                <Row style={{ marginBottom: '15px'}} className='d-flex flex-column'>
                  <H3>Day off detail</H3>
                </Row>
                <Row className='d-flex flex-column row__info'>
                  <Col>
                    <Row className='d-flex'>
                      <Col className='col-4 detail__title'>
                        <H4>Type:</H4>
                      </Col>
                      <Col>
                        <H4>{dataDayOff?.Type === 0 ? "OFF" : "WFH"}</H4>
                      </Col>
                    </Row>
                    <Row className='d-flex align-items-center'>
                      <Col className='col-4 detail__title'>
                        <H4>From:</H4>
                      </Col>
                      <Col>
                        <CustomCssDate>
                          <TimeDayOff date={dataDayOff?.DayOffFrom}></TimeDayOff>
                        </CustomCssDate>
                      </Col>
                    </Row>
                    <Row className='d-flex align-items-center'>
                      <Col className='col-4 detail__title'>
                        <H4>To:</H4>
                      </Col>
                      <Col>
                        <CustomCssDate>
                          <TimeDayOff date={dataDayOff?.DayOffTo}></TimeDayOff>
                        </CustomCssDate>
                      </Col>
                    </Row>
                    <Row className='d-flex align-items-center'>
                      <Col className='col-4 detail__title'>
                        <H4>Time:</H4>
                      </Col>
                      <Col>
                        <H4>{
                          checkTime(dataDayOff?.Time)
                        }</H4>
                      </Col>
                    </Row>
                    <Row className='d-flex align-items-center'>
                      <Col className='col-4 detail__title'>
                        <H4>Quantity:</H4>
                      </Col>
                      <Col>
                        <H4>{dataDayOff?.Quantity}</H4>
                      </Col>
                    </Row>
                    <Row className='d-flex '>
                      <Col className='col-4 detail__title'>
                        <H4>Reason:</H4>
                      </Col>
                      <Col>
                        <H4 style={{ marginTop: '5px' }}>{dataDayOff?.Reason}</H4>
                      </Col>
                    </Row>
                    <Row className='d-flex '>
                      <Col className='col-4 detail__title'>
                        <H4 >Status:</H4>
                      </Col>
                      <Col>
                        <CustomCssDate style={{ marginTop: '4px' }}>
                          <DotStatus data={dataDayOff} UserId={dataUser?.id} idMaster={idMaster}></DotStatus>
                        </CustomCssDate>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row style={{  marginTop: '30px' }} className='d-flex flex-column '>
                  <Col style={{ marginBottom: '0' }}>
                    <H3>Action</H3>
                  </Col>
                  <Col className='d-flex btn__container'>
                    <BtnContainer>
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
                    </BtnContainer>
                  </Col>
                </Row>
              </Col>
              <Col className='col__history' style={{ maxHeight: '500px', overflowY: 'auto',overflowX: 'hidden', position: 'relative'}}>
                <H3 style={{ position: 'sticky', top: '-5px', height: '50px', backgroundColor: '#fff', width: '100%', zIndex: '1' }}>Histories</H3>
                {
                  dataHistory?.map((e, index) => (
                    <Row style={{ marginTop: '10px' }} key={index}>
                      {e?.Status === 1 ?
                        <>
                          {
                            checkTypeRequest(e?.Status, e?.Parent[0]?.Name, e?.Parent?.length === 2)
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
                              <Span>Time: {checkTime(e?.Parent[0]?.Time)}</Span>
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
                                  <Span>Time: {checkTime(e?.Parent[1]?.Time)}</Span>
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
                                user?._id === e?.UserId ?
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
              </ContainerRepository>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <BtnBack>
            <ButtonAddDayOff style={{
              height: '45px', backgroundColor: '#6e7881'
            }} onClick={() => setShowDetail(false)}>
              Close
            </ButtonAddDayOff>
          </BtnBack>
        </Modal.Footer>
      </Modal>
    </ContainerStyled >
  );
}

export default DetailDayOff;