import { HeaderH4, H4, StatusContent } from "../components/TableDayOff/DetailDayOff/style";
import moment from 'moment/moment';
import React from 'react'

export const checkTypeRequest = (Type, Name, secsion) => {
  switch (Type) {
    case 1:
      return (<StatusContent>
        <HeaderH4>Requested</HeaderH4>
        {
          secsion ? <H4 style={{ fontWeight: 'bold', color: '#838383', paddingLeft: '15px' }}>{Name} update request</H4> :
            <H4 style={{ fontWeight: 'bold', color: '#838383', paddingLeft: '15px' }}>{Name} requested</H4>
        }
      </StatusContent>
      );
    case 2:
      return (<StatusContent>
        <HeaderH4>Approved</HeaderH4>
        <H4 style={{ fontWeight: 'bold', color: '#838383', paddingLeft: '15px' }}>{Name} approved</H4>
      </StatusContent>
      );
    case 3:
      return (<StatusContent>
        <HeaderH4>Rejected</HeaderH4>
        <H4 style={{ fontWeight: 'bold', color: '#838383', paddingLeft: '15px' }}>{Name} rejected</H4>
      </StatusContent>
      );
    case 4:
      return (<StatusContent>
        <HeaderH4>Request change</HeaderH4>
        <H4 style={{ fontWeight: 'bold', color: '#838383', paddingLeft: '15px' }}>{Name} requested for change</H4>
      </StatusContent>
      );
    case 5:
      return (<StatusContent>
        <HeaderH4>Reverted</HeaderH4>
        <H4 style={{ fontWeight: 'bold', color: '#838383', paddingLeft: '15px' }}>{Name} reverted</H4>
      </StatusContent>
      );
    default:
      return;
  }

}
export const totalDay = (date) => {
  const today = new Date()
  const dateRequest = new Date(date)
  const time = (today - dateRequest) / (60 * 1500) + 1
  if (time < 60) {
    return `${Math.floor(time)} minutes ago`
  }
  if (time >= 60 && time < 1440) {
    const newtime = time / 60
    return `${Math.floor(newtime)} hour ago`
  }
  if (time >= 1440 && time < 2280) {
    return `Yesterday`
  }
  if (time >= 2280) {
    const newtime = time / (24 * 60)
    return `${Math.floor(newtime)} day ago`
  }
}

export const formatDate = (date) => {
  const newDate = date ? moment.utc(date).format('DD/MM/YYYY') : ''
  return newDate
}


export const checkSameDay = (data, DayOffFrom, DayOffTo) => {
  const from = (From) => { 
    const quantity = Math.floor(((new Date(From) - DayOffFrom) / 360 / 24 / 10000)) 
    return quantity
  }
  const to = (To) => { 
    const quantity = Math.floor(((new Date(To) - DayOffTo) / 360 / 24 / 10000) ) 
    return quantity
  }
  const fromto = (From) => { 
    const quantity = Math.floor(((new Date(From) - DayOffTo) / 360 / 24 / 10000) ) 
    return quantity
  }
  const tofrom = (To) => { 
    const quantity = Math.floor(((new Date(To) - DayOffFrom) / 360 / 24 / 10000) ) 
    return quantity
  }
  let status = false;
  for(var i = 0; i <= data?.length -1; i++) {
    if(from(data[i]?.DayOffFrom) === 0 ||to(data[i]?.DayOffTo) === 0 ||fromto(data[i]?.DayOffFrom) === 0 ||tofrom(data[i]?.DayOffTo) === 0){
      status = true
      break;
    }
  }
  return status;
}
export const  countDate = (From, To) => {
    const time = (((From - To) / 360 / 24 / 10000) + 1)
   return Math.floor(time)
}
export const checkHoliday = (data, DayForm, DayTo)=>{

  const from = (From) => { 
    const quantity = Math.floor(((new Date(From) - DayForm) / 360 / 24 / 10000) ) 
    return quantity
  }
  const to = (To) => { 
    const quantity = Math.floor(((new Date(To) -  DayTo) / 360 / 24 / 10000) ) 
    return quantity
  }
  let status = false
  for(var i = 0; i <= data?.length -1; i++) {
    if(from(data[i]) === 0 || to(data[i]) === 0){
      status = true
      break;
    }
  }
  return status
}