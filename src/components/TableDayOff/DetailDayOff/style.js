import styled from "styled-components";

export const ContainerStyled = styled.div`
  .w-30{
  width: 40%!important;
  }
  .w-70{
  width: 60%!important;
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

export const H4 = styled.h4`
  text-align: start;
  font-size: 16px;
  margin: 10px 0;

`

export const BtnBack = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  left: -10px;
  `