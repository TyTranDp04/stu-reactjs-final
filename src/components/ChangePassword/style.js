import styled from "styled-components";

export const H1 = styled.h1`
  font-size: 40px;
  color: DodgerBlue;
  text-align: center;
  @media (max-width: 767px){
    font-size: 30px;
  }
  @media (max-width: 480px){
    font-size: 22px;
  }
`;
export const Lable = styled.label`
  color: DodgerBlue;
  text-align: center;
`;
export const P = styled.p`
  text-align: center;
`;
export const Input = styled.input`
  padding: 10px;
  margin: 5px 0 13px 0;
  display: inline-block;
  width: 100%;
  resize: vertical;
  border-radius: 15px;
  border: 0.1px solid ;
  &:focus {
    outline: none;
  }
  &:hover {
    border: 2px solid #8000ff;
  }
  @media (max-width: 576px) {
    font-size: 13px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`;
export const Signupbtn = styled.button`
  width: 100%;
  background-color: #8000ff;
  color: white;
  border: none;
  opacity: 0.9;
  float: left;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  &:hover {
    opacity: 1;
    border-radius: 50px;
  }
`;
export const SubmitDiv = styled.div`
flex: 0 0 auto;
width: 50%;
padding-right: 5px;
@media (max-width: 576px) {
  font-size: 13px;
}
@media (max-width: 425px) {
  font-size: 10px;
}
`
export const FormInner = styled.div`
@media (max-width: 992px) {
  padding: 30px 80px;
}

@media (max-width: 767px) {
  padding: 30px 20px;
}
`
export const Cancelbtn = styled.button`
  padding: 14px 20px;
  background-color: #f44336;
`;

export const Container = styled.div`
  padding: 30px 0;
  background-color: #F0F4F7;
`;
export const Clearfix = styled.div`
  display: flex;
  margin: 20px 0;
  align-items: center;

  &:after {
    content: "";
    clear: both;
    display: table;
  }
`;
export const Cancel = styled.div`
flex: 0 0 auto;
width: 50%;
background-color: #6e7881;
color: white;
border: none;
opacity: 0.9;
float: left;
border-radius: 15px;
box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
&:hover {
opacity: 1;
border-radius: 50px;
}

@media (max-width: 576px) {
  font-size: 13px;
}
@media (max-width: 425px) {
  font-size: 10px;
}

.linkcanel{
  text-decoration-line: none;
  color: white;
  width: 100% ;
  display: block;
  height : 100%;
  padding: 10px;
}
`;
