import React, { useEffect, useState } from 'react';
import {
  Container,
  H3,
  Dot,
  H4,
  DotContent
} from './style'
const DotStatus = (props) => {
  const {status, arrayApprove, idMaster, UserId, UserRequestId} = props;
  const [statusDot, setStatusDot]= useState("")
  useEffect(()=>{
    if(status === 1){
      setStatusDot('Requested');
    }
    if(status === 2){
      setStatusDot('Approved');
    }
    if(status === 3){
      setStatusDot('Rejected');
    }
    if(status === 3){
      setStatusDot('Changed');
    }
    if(status === 3){
      setStatusDot('Reverted');
    }
  },[status])
  return (
    <Container>
      <DotContent>
      <Dot className={statusDot}></Dot>
      <H3>{statusDot}</H3>
      </DotContent>
      {
        statusDot === 'Requested' && UserRequestId === UserId?     
        <H4>{'Approved '+arrayApprove?.length+'/'+idMaster?.length}</H4>:''
      }
    </Container>
  );
}

export default DotStatus;