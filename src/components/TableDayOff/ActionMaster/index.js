import React, { useEffect, useState } from 'react';
import { Btn, H5 } from './style';
import { faClockRotateLeft, faRectangleXmark, faRotateLeft, faSquareCheck, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URL_API } from '../../../api/dayoff.api';
import Swal from 'sweetalert2';
import axios from 'axios';
import ModalRequestChange from '../ModalRequestChange';
const ActionMaster = (props) => {
  const [showRequestChange, setShowRequestChange] = useState(false)
  const [typeModal, setTypeModal] = useState()
  const [time, setTime] = useState()
  const { userId, data } = props;
  const { callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest } = props.handle
  const formData = {
    RequestId: data?._id,
    UserId: data?.UserId,
    UserActionId: userId,
  }
  useEffect(() => {
    const today = new Date()
    const dayOff = new Date(data?.DayOffFrom)
    const newtime = (((dayOff - today) / 360 / 24 / 10000) + 1)
    setTime(newtime)
  }, [data])
  async function Approve() {
    const urlAprove = URL_API + "/approve"
    await axios.post(urlAprove, formData)
      .then(data => {
        if (data?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Approve success',
            showConfirmButton: false,
            timer: 1000,

          })
          setCallApiTable(!callApiTable)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Cancel!',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
  }
  function handleApprove() {
    Swal.fire({
      title: "Are you sure?",
      icon: "question",
      iconHtml: "?",
      cancelButtonText: "Cancel",
      confirmButtonText: "Approve",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#8000ff',

    }).then((result) => {
      if (result.isConfirmed) {
        Approve()
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cancel!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    });
  }
  function handleUpdate() {
    setIdRequest(data?._id)
    setShowModalUpdate(true);
  }
  function handleModal(value) {
    setTypeModal(value)
    setShowRequestChange(true)
  }

  return (
    <div>
      <ModalRequestChange type={typeModal} data={data} formData={formData} handle={{ showRequestChange, setShowRequestChange, setCallApiTable, callApiTable }}></ModalRequestChange>
      {
        data?.Approve?.includes(userId) && data?.Status === 1 && userId !== data?.UserId ? <H5>You appoved</H5> : data?.Status === 1 && !data?.Approve?.includes(userId) ? <Btn type='button' title="Approve" onClick={() => handleApprove()}>
          <FontAwesomeIcon style={{ color: '#1DF73E' }} icon={faSquareCheck} />
        </Btn> : ''
      }
      {
        data?.Status === 1 && userId !== data?.UserId ? <Btn type='button' title="Reject" onClick={() => handleModal('reject')}>
          <FontAwesomeIcon style={{ color: '#FB1717' }} icon={faRectangleXmark} />
        </Btn> : ''
      }
      {
        data?.Status === 1 && data?.UserId === userId ||  data?.Status === 5 && data?.UserId === userId ||  data?.Status === 4 && data?.UserId === userId? <Btn type='button' title="Update" onClick={() => handleUpdate()}>
          <FontAwesomeIcon style={{ color: '#85CBA6' }} icon={faSquarePen} />
        </Btn> : ''
      }
      {
        data?.Status === 1 ? data?.UserId !== userId ? <Btn type='button' title="Request change" onClick={() => handleModal('change')}>
          <FontAwesomeIcon style={{ color: '#85CBA6' }} icon={faRotateLeft} />
        </Btn> : '' : ''
      }
      {time > 1 ?
        data?.Status === 2 || data?.Status === 1 ? data?.UserId === userId ? <Btn type='button' title="Revert" onClick={() => handleModal('revert')}>
          <FontAwesomeIcon style={{ color: '#C66DAD', marginRight: '5px' }} icon={faClockRotateLeft} />
        </Btn> : '' : '' : ''
      }

    </div>
  );
}

export default ActionMaster;