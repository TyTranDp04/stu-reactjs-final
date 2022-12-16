import styled from "styled-components";

export const Container = styled.div`
padding:0px;
`;
export const Body = styled.div`
  padding:0px;
  padding-left:10px;
  background-color: white;
  height:100vh;
`;

export const Search = styled.input`
  border-radius:5px;
  border:none;
  padding:5px 0px 5px 5px;
  background-color:#fffbf8;
   box-shadow:
        0 -2px 2px 0 rgba(199, 199, 199, 0.55),
        0 1px 1px 0 #fff,
        0 2px 2px 1px #fafafa,
        0 2px 4px 0 #b2b2b2 inset,
        0 -1px 1px 0 #f2f2f2 inset,
        0 15px 15px 0 rgba(41, 41, 41, 0.09) inset;
&:focus{
  outline: none;
  border:1px solid #888888;
}
`
export const H3 = styled.h3`
color: #333333;
font-size: 40px;
line-height: 45px;
font-weight: 700;
`

export const Image = styled.img`
  with: 100%;
  height: 70px;
  border-radius:50%;
  object-fit: cover;
`;
export const TH = styled.th`
  position:sticky;
  top:0px;
  background-color: #8000ff !important;
`;
export const DivBtn = styled.div`
padding:0px;
`
export const TR = styled.tr`
  with: 100%;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;
export const TD = styled.td`
  padding: 20px;
  width: auto;
`;
export const Btn = styled.button`
  align-items: flex-start;
  background-color:#8000ff;
  border-radius: 4px;
  border:none;
  color: #ffffff;
  font-family:Rubik;
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
export const Row = styled.div`
`
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
  padding: 10px;
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
export const Select = styled.select`
background-color: #ffffff;
border-color: #cccccc;
border-radius: 4px;
border-style: solid;
border-width: 1px;
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
export const DivTable = styled.div`
overflow:auto;
max-height:400px;
.testHover:hover{
  background-color: #8000ff;
  opacity: 0.8;
  color:#fff;
}
.bgrHead{
  background-color: #8000ff !important;
  color:#fff;
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
  background-color: #8000ff;
  border:none;
  border-radius: 4px;
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
export const BtnAction = styled.button`
background-color: transparent;
border: none;
margin: 0 4px;
padding: 0px;
svg{
  font-size: 20px;
}
&:hover{
  opacity: .8;
}
`