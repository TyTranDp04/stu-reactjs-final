import React from 'react';
import { Btn } from '../ActionMaster/style';
import { faRecycle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { URL_API } from '../../../api/dayoff.api'
import Swal from "sweetalert2";

const ActionRestore = (props) => {
  const { status, requestId } = props;
  const { callApiTable, setCallApiTable } = props.handle
  async function DeleteData() {
    await fetch(URL_API + "/dayoff/" + requestId, { method: "DELETE" })
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
  async function RestoreData() {
    await fetch(URL_API + "/dayoff-soft/" + requestId, { method: "PATCH" })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Restore request success',
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
      } else Swal.fire("Cancel", "", "error");
    });
  }
  function handleRestore() {
    let timerInterval
    Swal.fire({
      title: "Restore this request?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        RestoreData()
      } else Swal.fire(" Cancel", "", "error");
    });
  }
  return (
    <div>
      {
        status === 1 ?
          <Btn type='button'>
            <FontAwesomeIcon onClick={() => handleRestore()} style={{ color: '#1FCE2D' }} icon={faRecycle} />
          </Btn> : ''
      }
      {status === 1 ?
        <Btn type='button' onClick={() => handleDelete()}>
          <FontAwesomeIcon style={{ color: '#00AEEF' }} icon={faTrash} />
        </Btn> : ''
      }
    </div>
  );
}

export default ActionRestore;