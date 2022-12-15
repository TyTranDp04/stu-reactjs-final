import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  ContainerStyled,
  H3,
  H4,
  BtnBack
} from './style'
import ActionUser from '../ActionUser';
import ActionMaster from '../ActionMaster';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonAddDayOff } from '../../TableShowDayOff/style';
import DotStatus from '../DotStatus';
import TimeDayOff from '../TimeDayOff';
import ModalUpdateData from '../ModalUpdateData';
import { useState } from 'react';
const DetailDayOff = (props) => {
  const { callApiTable, setShowDetail, setCallApiTable, setIdRequest } = props.handle
  const { dataUser, data, idMaster, formData } = props
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  return (
    <ContainerStyled>
      <Container fluid className='h-100'>
        <Row>
          <BtnBack>
            <ButtonAddDayOff onClick={() => setShowDetail(false)}>
              <FontAwesomeIcon style={{ color: '#fff', marginRight: '5px' }} icon={faAngleLeft} />
              Back to list day off
            </ButtonAddDayOff>
            <ModalUpdateData user={formData} show={showModalUpdate} handle={{ setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate }} idRequest={data?._id}></ModalUpdateData>
          </BtnBack>
          <Col>
            <Row style={{ display: 'flex', flexDirection: 'column' }}>
              <Col className='d-flex'>
                <H3>Day off detail</H3>
              </Col>
              <Col className='d-flex w-100 col__info'>
                <Row className='d-flex flex-column row__info w-30'>
                  <H4>From</H4>
                  <H4>To</H4>
                  <H4>Time</H4>
                  <H4>Quantity</H4>
                  <H4>Reason</H4>
                  <H4>Status</H4>
                </Row>
                <Row className=' d-flex flex-column row__info  w-70'>
                  <H4  className="text__start">
                  <TimeDayOff date={data?.DayOffFrom}></TimeDayOff>
                  </H4>
                  <H4  className="text__start">
                  <TimeDayOff  date={data?.DayOffTo}></TimeDayOff>
                  </H4>
                  <H4>
                    {data?.Time}
                  </H4>
                  <H4>{data?.Quantity}</H4>
                  <H4>{data?.Reason}</H4>
                  <H4  className="text__start">
                    <DotStatus  UserRequestId={data?.UserId} UserId={dataUser?.id} status={data?.Status} idMaster={idMaster} arrayApprove={data?.Approve}  ></DotStatus>
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
                            requestId={data?._id}
                            status={data?.Status}
                            handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }}>
                          </ActionUser> :
                          <ActionMaster
                          
                            handle={{ callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest }}
                            requestId={data?._id}
                            status={data?.Status}
                            arrayApprove={data?.Approve}
                            userId={dataUser?.id}
                            requestUserId={data?.UserId}>
                          </ActionMaster>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <H3>History</H3>
          </Col>
        </Row>
      </Container>
    </ContainerStyled>
  );
}

export default DetailDayOff;