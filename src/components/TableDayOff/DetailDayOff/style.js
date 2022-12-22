import styled from "styled-components";

export const ContainerStyled = styled.div`

  `
export const ContainerRepository = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .detail__title{
    width: 100px;
    span{
      font-size: 16px;
      font-weight: 500;
    }
  }
`
export const BtnContainer = styled.div`
    button{
      font-size: 16px;
      margin: 10px 10px 0 10px;
      svg{
      font-size: 30px;
      }
    }
  
  `
export const CustomCssDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
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
  display: inline-block;
  font-size: 16px;

`

export const BtnBack = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
  left: -10px;
  `