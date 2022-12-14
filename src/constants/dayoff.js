import { HeaderH4, H4, StatusContent } from "../components/TableDayOff/DetailDayOff/style";
import moment from 'moment/moment';
import React from 'react'
import { dataHoliday } from "./holiday";
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


export const countDate = (From, To) => {
  const time = (((From - To) / 360 / 24 / 10000) + 1)
  return Math.floor(time)
}
export const checkHoliday = (DayForm, DayTo) => {

  const from = (From) => {
    const quantity = Math.floor(((new Date(From) - DayForm) / 360 / 24 / 10000))
    return quantity
  }
  const to = (To) => {
    const quantity = Math.floor(((new Date(To) - DayTo) / 360 / 24 / 10000))
    return quantity
  }
  let status = false
  for (var i = 0; i <= dataHoliday?.length - 1; i++) {
    if (from(dataHoliday[i]) === 0 || to(dataHoliday[i]) === 0) {
      status = true
      break;
    }
  }
  return status
}
export const checkSunDay = (date) => {
  const day = new Date(date)
  const getDay = day.getDay()
  let status = false
  if (getDay === 0 || getDay === 6) {
    status = true
  }
  return status
}
export const render = (d) => {
  const nexDate = (d?.getMonth() + 1) + '/' + (d?.getDate()) + '/' + d?.getFullYear()
  return nexDate
}


export const getDateBetween = (From, To) =>{
  const date = new Date(From?.getTime());
  const dates = [];
  while (date <= To) {
    dates.push(new Date(date));
    date?.setDate(date?.getDate() + 1);
  }
  return dates;
}

export const getArraySemDay = (From, To) =>{
  const dayFrom = new Date(From)
  const dayTo = new Date(To)
  const arrayDate = []
  const quantity = getDateBetween(dayFrom,dayTo)
  quantity?.forEach((date)=> {
    if (checkHolidate(render(date))) {
    } else {
      arrayDate.push(render(date))
    }}
  )
  return arrayDate
}
export const checkSameDay = (From, To, data) => {
  const arrayDateLog = getArraySemDay(From, To)
  let status = false
  for (var j = 0; j <= data?.length; j++) {
    const dateFrom = new Date(data[j]?.DayOffFrom)
    const dateTo = new Date(data[j]?.DayOffTo)
    const lengthDate = getArraySemDay(dateFrom,dateTo)
    const array = lengthDate?.filter(function(e){
      return arrayDateLog.includes(e)
    })
    if (array?.length > 0) {
      status = true
      break;
    }
  }
  return status
} 
export const checkHolidate = (date) =>{
  if(dataHoliday?.includes(date)){
    return true
  }else{
    return false
  }
}
export const returnQuantity = (From, To) => {
  const arrayDate = []
  const quantity = getDateBetween(From,To)
  quantity?.forEach((date)=> {
    if (checkHolidate(render(date))) {
    } else {
      arrayDate.push(render(date))
    }
  })
  return arrayDate?.length
} 

export const searchDataDayOff = (data, search) => {
  const arrayData = []
  data?.map((date)=> {
    const dateFrom = new Date(date?.DayOffFrom)
    const dateTo = new Date(date?.DayOffTo)
    const quantity = getDateBetween(dateFrom, dateTo)
    quantity?.forEach((e)=> {
      if (render(e) === render(search)) {
        arrayData.push(date)
      } else {}
    })
  })
  return arrayData
} 
export const checkTime = (time)=>{
  if(time ===1){
    return "Morning"
  }
  if(time ===2){
    return "afternoon"
  }
  if(time ===3){
    return "All day"
  }
}