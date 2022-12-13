import styled from "styled-components";
export const H1 = styled.h1`
   {
    color: DodgerBlue;
    text-align: center;
  }
`;
export const Lable = styled.label`
   {
    color: DodgerBlue;
    text-align: center;
  }
`;
export const P = styled.p`
   {
    text-align: center;
  }
`;
export const Input = styled.input`
   {
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
    &:focus {
      outline: none;
    }
  }
`;
export const Signupbtn = styled.button`
   {
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin: 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
    float: left;
    width: 100%;
    border-radius: 15px;
    border: 0;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
    margin: 20px;
    &:hover {
      opacity: 1;
    }
  }
`;

export const Cancelbtn = styled.button`
   {
    padding: 14px 20px;
    background-color: #f44336;
  }
`;

export const Container = styled.div`
   {
    padding: 16px;
    .lableName{
      font-size: 16px;
      font-weight: bold;
      float:left;
    }
  }
`;
export const Clearfix = styled.div`
  display: flex;
  margin: 20px;
  &:after {
    content: "";
    clear: both;
    display: table;
  }
`;
export const Cancel = styled.div`
background-color: #6e7881;
margin : 20px;
color: white;
padding: 14px 20px;
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
}
.linkcanel{
  text-decoration-line: none;
  color: white;
  width: 100% ;
  display: block;
  height : 100%;

}`;











export const ModalBtn = styled.div`
margin-top:30px;
display: flex;
justify-content: space-between;

`
export const BtnAdd = styled.button`
position: relative;
border: none;
background-color: #0D6EFD;
color: #fff;
padding: 8px;
border-radius: 5px;
&:hover{
  opacity: .8;
}

`
export const BtnCancel = styled.div`
position: relative;
border: none;
background-color: #DC3545;
color: #fff;
padding: 8px;
border-radius: 5px;
&:hover{
  opacity: .8;
  cursor: pointer;
}

`

export const ImgPreview = styled.div`
width: 100%;
height: 100%;
min-height: 100px;
margin-top: 15px;
display: flex;
align-items: center;
font-weight: bold;
color: #cccccc;
position: relative;

`
export const ImgContentButton = styled.button`
  background-color: #fff;
  width: 150px;
  height: 150px;
  border: 1px solid #cccccc;
  &:hover{
    cursor: pointer,
  }
  &:focus{
    transform: scaleZ(.2)
  }
`
export const ImgContent = styled.div`
display:block;
position: relative;
left: 0px;
width: 150px;
height: 150px;
border: 1px solid #cccccc;
`
export const ImgPreviewItem = styled.img`
width: 100%;
height: 100%;
  object-fit: contain;

`
export const BtnImgRemove = styled.button`
  top: 2px;
  position: absolute;
  background-color: #dc3545;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

`
export const IconRemove = styled.i`
  color: #fff;
`
export const NameGroup = styled.div`
display: flex;
width: 100%;
padding: 15px;
margin: 5px 0 22px 0;
border: none;
resize: vertical;
padding: 15px;
border-radius: 15px;
border: 0;
box-shadow: 4px 4px 10px rgb(0 0 0 / 20%);

.Groupname{
  width: 25%;
padding: 15px ;
margin: 5px 15px 22px 0;
border: none;
resize: vertical;
border-radius: 15px;
border: 0;
box-shadow: 4px 4px 10px rgb(0 0 0 / 20%);
&:hover{
  background-color:#4caf50
}
}
`
