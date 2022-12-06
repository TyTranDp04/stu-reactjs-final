import React from 'react';
import { Btn, H5 } from './style';
import { faRectangleXmark, faSquareCheck, faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URL_API } from '../../../api/dayoff.api';
import Swal from 'sweetalert2';
import axios from 'axios';
const ActionMaster = (props) => {
  const { arrayApprove, userId, status, requestUserId, requestId } = props;
  const { callApiTable, setCallApiTable, setShowModalUpdate, setIdRequest } = props.handle
  const urlReject = URL_API + "/reject"
  async function Reject() {
    await axios.post(urlReject, { RequestId: requestId })
      .then(data => {
        if (data?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Add request success',
            showConfirmButton: false,
            timer: 1500
          })
          setCallApiTable(!callApiTable)
        } else {
          Swal.fire("Error!", "", "error");
        }
      })
      .catch(err => console.log(err))
  }
  function handleReject() {
    Swal.fire({
      title: "Reject this request?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Reject()
          .then(() => {
            setCallApiTable(!callApiTable)
          })
      } else Swal.fire("Cancel", "", "error");
    });
  }

  const urlAprove = URL_API + "/approve"
  const formData = {
    RequestId: requestId,
    UserId: requestUserId,
    UserAproveId: userId,
  }
  async function Approve() {
    await axios.post(urlAprove, formData)
      .then(data => {
        if (data?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Add request success',
            showConfirmButton: false,
            timer: 1500
          })
          setCallApiTable(!callApiTable)
        } else {
          Swal.fire("Error!", "", "error");
        }
      })
      .catch(err => console.log(err))
  }
  function handleApprove() {
    Swal.fire({
      title: "Approve this request?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Approve()
      } else Swal.fire("Cancel", "", "error");
    });
  }
  async function DeleteData() {
    await fetch(URL_API + "/dayoff-soft/" + requestId, { method: "DELETE" })
      .then((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Add request success',
          showConfirmButton: false,
          timer: 1500
        })
        setCallApiTable(!callApiTable)
      })
      .catch(() => {
      })
  }
  function handleDelete() {
    Swal.fire({
      title: "Delete this request?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteData()
      } else Swal.fire(" Cancel", "", "error");
    });
  }
  function handleUpdate() {
    setIdRequest(requestId)
    setShowModalUpdate(true);
  }
  return (
    <div>
      {
        arrayApprove.includes(userId) ? status === 1 ? <H5>You appoved</H5> : '' : status === 2 ? '' : status === 3 ? '' : <Btn type='button' title="Approve" onClick={() => handleApprove()}>
          <FontAwesomeIcon style={{ color: '#FECC09' }} icon={faSquareCheck} />
        </Btn>
      }
      {
        status === 1 && userId !== requestUserId ? <Btn type='button' title="Reject" onClick={() => handleReject()}>
          <FontAwesomeIcon style={{ color: '#FB1717' }} icon={faRectangleXmark} />
        </Btn> : ''
      }
      {
        status === 1 ? requestUserId === userId ? <Btn type='button' title="Update" onClick={() => handleUpdate()}>
          <FontAwesomeIcon style={{ color: '#1FCE2D' }} icon={faSquarePen} />
        </Btn> : '' : ''
      }
      {status === 1 ? requestUserId === userId?
        <Btn type="button" title='Delete'>
          <FontAwesomeIcon style={{ color: '#00AEEF' }} icon={faTrash} onClick={() => handleDelete()} />
        </Btn> : '':''
      }
    </div>
  );
}

export default ActionMaster;