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
