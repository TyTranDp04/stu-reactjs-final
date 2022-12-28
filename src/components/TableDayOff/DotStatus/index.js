import React, { useEffect, useState } from 'react';
import {
  Container,
  H3,
  Dot,
  H4,
  DotContent
} from './style'
const DotStatus = (props) => {
  const {data, idMaster, UserId} = props;
  const [statusDot, setStatusDot]= useState("")
  useEffect(()=>{
    if(data?.Status === 1){
      setStatusDot('Requested');
    }
    if(data?.Status === 2){
      setStatusDot('Approved');
    }
    if(data?.Status === 3){
      setStatusDot('Rejected');
    }
    if(data?.Status === 4){
      setStatusDot('Request change');
    }
    if(data?.Status === 5){
      setStatusDot('Reverted');
    }
  },[data?.Status])
  return (
    <Container>
      <DotContent>
      <Dot className={statusDot}></Dot>
      <H3>{statusDot}</H3>
      </DotContent>
      {
        statusDot === 'Requested' && data?.UserId === UserId?     
        <H4>{'Approved '+data?.Approve?.length+'/'+idMaster?.length}</H4>:''
      }
    </Container>
  );
}

export default DotStatus;