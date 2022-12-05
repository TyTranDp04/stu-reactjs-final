
import styled from "styled-components";
export const H1 = styled.h1`
{
  color: DodgerBlue;
  text-align: center;
}
`
export const Lable = styled.label `{
  color: DodgerBlue;
  text-align: center;
}`
export const P = styled.p` {
  text-align: center;
}`
export const Input = styled.input` {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  width: 100%;
  resize: vertical;
  padding: 15px;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
&:focus{
outline:none;
}
}`
export const Signupbtn = styled.button` {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  float: left;
  width: 100%;
  border-radius: 15px;
  border: 0;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
&:hover {
  opacity: 1;
}
}`

export const Cancelbtn = styled.button` {
  padding: 14px 20px;
  background-color: #f44336;
}`

export const Container = styled.div` {
  padding: 16px;
}`
export const Clearfix = styled.div`
&:after {
  content: "";
  clear: both;
  display: table;
}
`


