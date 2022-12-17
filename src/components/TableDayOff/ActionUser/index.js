import React from 'react';
import { Btn } from '../ActionMaster/style';
import { faSquarePen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {URL_API} from '../../../api/dayoff.api'
import Swal from "sweetalert2";

const ActionUser = (props)=>{
  const { status, requestId } = props;
  const {callApiTable, setCallApiTable,  setShowModalUpdate, setIdRequest  } = props.handle
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
        setCallApiTable(!callApiTable)
      })
      .catch(() => {
    })
  }
  function handleUpdate(){
    setIdRequest(requestId)
    setShowModalUpdate(true);
  }
  function handleDelete(){
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

  return (
    <div>
      {
        status === 1 ?
          <Btn type='button' onClick={()=> handleUpdate()}>
            <FontAwesomeIcon style={{ color: '#F7941D' }} icon={faSquarePen} />
          </Btn> : ''
      }
      {status === 1 || status === 3 ?
        <Btn type='button' onClick={()=>handleDelete()}>
          <FontAwesomeIcon style={{ color: '#00AEEF' }} icon={faTrash} />
        </Btn> : ''
      }
    </div>
  );
}

export default ActionUser;