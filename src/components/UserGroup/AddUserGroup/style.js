import styled from "styled-components";

export const Input =  styled.input`
  outline: none;
  height: 45px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 50%;
  padding: 10px;
`

export const Option = styled.option`
  height: 45px;

`
export const OptionUser = styled.div`
height: 50px;
display: flex;
width: 100%;
justify-content: start;
align-items: center;
padding: 5px;
border-bottom: 1px solid #ccc;
cursor: pointer;
background-color: #f4f4f4;
  &:last-child{
  border-bottom: 1px solid transparent;

  }
  &:hover{
    background-color: #c3c3c3;
  }
`
export const BoxUser = styled.div`
position: absolute;
z-index: 10;
max-height: 300px;
overflow: auto;
`
export const IconUser = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
`
export const NameUser = styled.span`
 margin-left: 10px;
 color: #000;
`