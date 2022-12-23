import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { InPutContainer, Option } from '../style';

const SelectTime = (props) => {
  const { setSelectHour, setCurrentQuantity } = props.handle
  const [hour, setHour] = useState()
  const { quantity } = props
  function handleOnChangeTime(e) {
    setHour(e.target.value)

  }
  useEffect(() => {
    if (quantity >= 1) {
      setHour(8)
    }
  }, [quantity])
  useEffect(() => {
    if(hour >=1 && hour <=2) {
      setCurrentQuantity(0.25)
    }
    if(hour >2 && hour <=4) {
      setCurrentQuantity(0.5)
    }
    if(hour >4 && hour <=6) {
      setCurrentQuantity(0.75)
    }
    if(hour >6 && hour <=8){
      setCurrentQuantity(1)
    }
  },[hour])

  return (
    <InPutContainer style={{ width: '100%', margin: '0', }} className="mb-6 input__select">
      <Form.Select style={{ width: '100%', margin: '0', }} id='Quantity' onChange={(e) => handleOnChangeTime(e)} aria-label="Default select example">
        {
          quantity <= 1 ?
            <Option value={1}>1 hour</Option> : ''
        }
        {
          quantity <= 1 ?
            <Option value={2}>2 hour</Option>
            : ''
        }
        {
          quantity <= 1 ?
            <Option value={3}>3 hour</Option>
            : ''
        }
        {
          quantity <= 1 ?
            <Option value={4}>4 hour</Option>
            : ''
        }
        {
          quantity <= 1 ?
            <Option value={5}>5 hour</Option> : ''
        }
        {
          quantity <= 1 ?
            <Option value={6}>6 hour</Option> : ''
        }
        {
          quantity <= 1 ?
            <Option value={7}>7 hour</Option> : ''
        }
            <Option value={8}>8 hour</Option>
      </Form.Select>
    </InPutContainer>
  );
}

export default SelectTime;