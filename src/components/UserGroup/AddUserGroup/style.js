import styled from "styled-components";

export const Input = styled.input`
  outline: none;
  height: 45px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 75%;
  padding: 10px;
`;

export const Option = styled.option`
  height: 45px;
`;
export const OptionUser = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  background-color: #f4f4f4;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
  &:hover {
    background-color: #c3c3c3;
  }
`;
export const BoxUser = styled.div`
  position: absolute;
  z-index: 10;
  max-height: 300px;
  overflow: auto;
  left: 25%;
  top: 93%;
  @media (max-width: 995px){
    left: 40%;
  }
  @media (max-width: 500px){
    left: 0;
  }
`;
export const IconUser = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
`;
export const NameUser = styled.span`
  margin-left: 10px;
  display: block;
  color: #000;
`;
export const LableInput = styled.label`
display: flex;
font-size: 18px;
border-radius: 3px;
font-weight: 500;
padding-bottom: 3px;
align-items: center;
width: 25%;
@media (max-width: 500px) {
  width: 100%;
}
@media (min-width: 501px) and (max-width: 992px) {
  width: 50%;
}
.la
}
`;
export const InPutContainer = styled.div`
  display: flex;
  position: relative;
  margin: 30px;
  #Quantity {
    width: 30%;
    border: 2px solid #8000ff;
    border-radius: 5px;
    height: 40px;
    padding-left: 8px;
    outline: none;
  }
  .react-datepicker-wrapper {
    #DayOffTo {
      width: 70%;
      border: 2px solid #8000ff;
      border-radius: 5px;
      height: 40px;
      padding-left: 8px;
      outline: none;
    }
    #DayOffFrom {
      width: 70%;
      border: 2px solid #8000ff;
      border-radius: 5px;
      height: 40px;
      padding-left: 8px;
      outline: none;
    }
  }

  .react-datepicker-popper {
    z-index: 11;
  }
  select {
    width: 70%;
    border: 2px solid #8000ff;
    border-radius: 5px;
    &:focus {
      border: 2px solid #8000ff;
      box-shadow: none;
    }
  }
  .type__dayoff {
    input:checked {
      background-color: #8000ff;
      border-color: transparent;
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

