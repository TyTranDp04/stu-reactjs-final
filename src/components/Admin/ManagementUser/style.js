import styled from "styled-components";

export const Container = styled.div`
  background-color: #f0f4f7;
`;
export const Body = styled.div`
  border: 1px solid rgb(0 0 0 / 20%);
  border-radius: 5px;
  background-color: white;
`;
export const Image = styled.img`
  with: 50px;
  height: 50px;
`;
export const TH = styled.th`
  border-bottom: 2px solid #00aeef;
  background-color: #f2f2f2;
`;
export const TR = styled.tr`
  with: 100%;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const TD = styled.td`
  padding: 20px;
`;
export const Btn = styled.button`
  align-items: flex-start;
  background-color: #ff6e00;
  border-color: #ff6e00;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: #ffffff;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 11px 15px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

export const BtnInput = styled.button`
  position: absolute;
  border: 1px solid black;
  z-index: 99999;
`;
export const DivModal = styled.div`
  position: absolute;
  z-index:10000;
  display:flex;
  justify-content:center;
`
export const FooterForm = styled.form`
  padding: 48px;
  @media (max-width: 768px) {
    padding-left: 48px;
    padding-right: 48px;
    padding-bottom: 0px;
    margin: 0px;
  }`
  export const Label = styled.label`
  display: inline-block;
  font-family: Roboto;
  font-weight: 700;
  line-height: 24px;
  margin: 0px 0px 5px;
`;

export const Input = styled.input`
  background-color: #ffffff;
  border-color: #cccccc;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: #959595;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  padding: 6px 15px;
  &:focus {
    outline: none;
    border-color: #66afe9;
  }
`
export const TextArea = styled.textarea`
  background-color: #ffffff;
  border-color: #cccccc;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: #959595;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  padding: 6px 15px;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #66afe9;
  }
`;
export const Error = styled.label`
  color: red;
`;
export const Submit = styled.input`
  align-items: flex-start;
  background-color: #ff6e00;
  border-color: #ff6e00;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  color: #ffffff;
  display: inline-block;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 11px 15px;
  text-align: center;
  &:hover {
    opacity: 0.8;
  }
`;

export const InputImg = styled.div`
width:100px;
height:100px;
border:1px solid black;
`