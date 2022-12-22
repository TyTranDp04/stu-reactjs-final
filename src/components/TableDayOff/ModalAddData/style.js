import styled from "styled-components"

const FormDataInput = styled.form`


`
const InPutContainerFrom = styled.div`
display: flex;
margin: 30px;
width: 100%;
`
const InPutContainer = styled.div`
    display: flex;
    position: relative;
    margin: 30px;
    #Quantity{
      width: 30%;
        border: 2px solid #8000ff;
        border-radius: 5px;
        height: 40px;
        padding-left:8px;
        outline: none;
    }
    .react-datepicker-wrapper{
      #DayOffTo{
        width: 70%;
        border: 2px solid #8000ff;
        border-radius: 5px;
        height: 40px;
        padding-left:8px;
        outline: none;
      }
      #DayOffFrom{
        width: 70%;
        border: 2px solid #8000ff;
        border-radius: 5px;
        height: 40px;
        padding-left:8px;
        outline: none;
      }
    }
  
  .react-datepicker-popper{
    z-index: 11;
  }
  select{
    width: 70%;
    border: 2px solid #8000ff;
    border-radius: 5px;
    &:focus{
    border: 2px solid #8000ff;
    box-shadow: none;
    }
  }
  .type__dayoff{
    input:checked{
      background-color: #8000ff;
      border-color: transparent;  
    }
  }
`

const LableInput = styled.label`
  display: flex;
  font-size: 18px;
  border-radius: 3px;
  font-weight: 500;
  padding-bottom: 3px;
  align-items: center;
  width: 22%;
`
const LableInputReason = styled.label`
position: absolute;
display: flex;
font-size: 14px;
border-radius: 3px;
text-align: center;
font-weight: 500;
padding-bottom: 4px;
color: #fff;
align-items: center;
justify-content: center;
top: -25%;
z-index: 10;
width: 65px;
left: 10px;
background-color: #8000FF;
border-left: 2px solid #8000FF;
border-right: 2px solid #8000FF
`
const InputArea = styled.textarea`
  border: 2px solid #8000FF;
  border-radius: 5px;
  width: 30%;
  outline: none;
  &:focus{
    border-color: #8000FF;
    box-shadow: none;
  }
`
const Option = styled.option`

`
const ModalBtn = styled.div`
margin-top:30px;
display: flex;
padding: 0 30px;
`
const Input = styled.input`
`

const BtnAdd = styled.button`
position: relative;
border: none;
width: 80px;
background-color:#8000ff;
color: #fff;
padding: 8px;
border-radius: 5px;
&:hover{
  opacity: .8;
}

`
const BtnCancel = styled.button`
position: relative;
border: none;
margin-left: 20px;
background-color: #6e7881;
color: #fff;
padding: 8px;
width: 80px;
border-radius: 5px;
&:hover{
  opacity: .8;
  cursor: pointer;
}

`




export {

  BtnAdd,
  BtnCancel,
  ModalBtn,
  LableInput,
  InPutContainer,
  FormDataInput,
  InputArea, LableInputReason, Input, InPutContainerFrom, Option
}