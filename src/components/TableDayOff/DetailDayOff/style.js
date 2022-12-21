import styled from "styled-components";

export const ContainerStyled = styled.div`
  .w-30{
  width: 40%!important;
  }

  .col__info{
    margin-top: 10px;
    .row__info{
      width: 200px;
     .text__start{
      display: flex;
      align-items: center;
      justify-content: start;
     }
    }
    
  }
  .btn__container{
    margin-top: 10px;
    button{
      margin: 0 10px;
      svg{
        font-size: 30px;
      }
    }
  }



  
  `

export const H3 = styled.h3`
    text-align: start;
    font-size: 20px;
    font-weight: bold;
  `
export const FormDetail = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
`
export const FormDetailcontainer = styled.div`
position: relative;
  .reason__change{
   
  }
`

export const StatusContent = styled.div`
`
export const Span = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  color: #838383;
  padding-left: 16px;
`
export const HeaderH4 = styled.h4`
display: flex;
align-items: center;
  text-align: start;
  height: 30px;
  border-left: 4px solid #8000FF;
  padding-left: 10px;
  font-size: 16px;
  color: #8000FF;
`
export const H4 = styled.h4`
  text-align: start;
  font-size: 16px;
  margin: 10px 0;

`

export const BtnBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  left: -10px;
  `