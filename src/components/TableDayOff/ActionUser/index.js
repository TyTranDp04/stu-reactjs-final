import React, { useEffect, useState } from 'react';
import { Btn } from '../ActionMaster/style';
import { faClockRotateLeft, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalRequestChange from '../ModalRequestChange';
const ActionUser = (props)=>{
  const { data, formData } = props;
  const {setShowModalUpdate, setIdRequest, setCallApiTable, callApiTable  } = props.handle
  const [time, setTime] = useState()
  const [showRequestChange, setShowRequestChange] = useState(false)
  function handleUpdate(){
    setIdRequest(data?._id)
    setShowModalUpdate(true);
  }
  useEffect(()=>{
    const today = new Date ()
    const dayOff = new Date(data?.DayOffFrom)
    const newtime = (((dayOff - today) / 360 / 24 / 10000) + 1)
    setTime(newtime)
  }, [data])

  return (
    <div>
      <ModalRequestChange type={'revert'} data={data} formData={formData} handle={{ showRequestChange, setShowRequestChange, setCallApiTable, callApiTable }}></ModalRequestChange>
      {
        data?.Status === 1 || data?.Status === 4 || data?.Status === 5?
          <Btn type='button' onClick={()=> handleUpdate()}>
            <FontAwesomeIcon style={{ color: '#85CBA6' }} icon={faSquarePen} />
          </Btn> : ''
      }
      { time > 1?
        data?.Status === 2 || data?.Status === 1? <Btn type='button' title="Revert" onClick={()=>setShowRequestChange(true)}>
          <FontAwesomeIcon style={{ color: '#C66DAD', marginRight: '5px' }} icon={faClockRotateLeft} />
        </Btn> : '':''
      }
    </div>
  );
}

export default ActionUser;