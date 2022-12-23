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
    border: 1px solid;
    
    &:focus {
      outline: none;
    }
    &:hover {
      border: 2px solid #8000ff;
    }
  }
`;
export const Signupbtn = styled.button`
   {
    background-color: #8000ff;
    color: white;
    padding: 14px 20px;
    margin: 20px;
    border: none;
    cursor: pointer;
    width: 200px;
    opacity: 0.9;
    float: left;
    border-radius: 15px;
    border: 0px;
    margin: 20px;
    &:hover {
      opacity: 0.8;
      border-radius: 20px;
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
    padding: 30px 0;
    .lableName{
      font-size: 16px;
      font-weight: bold;
      float:left;
      @media (max-width: 576px) {
        font-size: 13px;
      }
      @media (max-width: 425px) {
        font-size: 10px;
      }
    }
    .phoneNumber{
      display: flex;
      .phonedefault{
        width:80px
      }
    }
    .container_top{
      display:flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .container_left{
        margin-right: 50px;
        width: 50%;
        @media (max-width: 767px) {
          margin-right: 20px;
        }
        @media (max-width: 555px) {
          margin-right: 10px;
        }
      }
      .container_right{
        width: 50%;
        .container_avatar{
          margin-bottom: 15px;
        }
      }
    }
  }
`;
export const Clearfix = styled.div`
  display: flex;
  margin: 20px;
  float : right;
  &:after {
    content: "";
    clear: both;
    display: table;
  }
  .swal2-styled.swal2-confirm {
    background-color: #8000ff;  
  }
`;
export const Cancel = styled.div`
background-color: #6e7881;
margin : 20px;
color: white;
padding: 14px 20px;
border: none;
cursor: pointer;
opacity: 0.9;
float: right;
width: 200px;
border-radius: 20px;
border: 0;
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
  opacity: 0.8;
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
height: ;
min-height: 100px;
margin-top: 15px;
display: flex;
justify-content:center;
align-items:center;
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
@media (max-width: 767px) {
  width: 100px;
  height: 100px;
}
@media (max-width: 480px) {
  width: 80px;
  height: 80px;
}
`
export const ImgPreviewItem = styled.img`
width: 100%;
height: 100%;
border: 0.5px solid #0F1C3F;
border-radius: 50%;
object-fit: cover;
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
border: 1px solid;
flex-direction : column;
.Groupname{
  text-align : left;
}

&:hover {
  border: 2px solid #8000ff;
}
`
