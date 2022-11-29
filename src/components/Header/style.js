import styled from "styled-components";

export const HeaderRow = styled.div`
  background-color: #00aeef;
`
export const HeaderWrapper = styled.div`
`
export const HeaderBg = styled.div`
  background-color: #4B5C6B;
  height: 30px;
`
export const HeaderInner = styled.div`

`
export const HeaderLogo = styled.div`
  text-align: left;
  cursor: pointer;
  padding: 0;

  @media (max-width: 576px) {
    width: 16.66666667%;
  }
`
export const StImg = styled.img`
  max-width: 100%;
  height: auto;
`
export const HeaderLogoff = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 576px) {
    width: 83.33333333%;
  }
`
export const HeaderLogoffButton = styled.button`
  padding: 5px 15px;
  border-radius: 5px;
  border: 1px solid rgb(247, 148, 29);
  background-color: rgb(247, 148, 29);
  color: #fff;
  opacity: 1;

  @media (max-width: 576px) {
    padding: 5px;
    font-size: 13px;
  }

  @media (max-width: 425px) {
    padding: 5px;
    font-size: 10px;
  }
  &:hover {
    opacity: 0.8;
  }
`
export const HeaderAvatar = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid #4B5C6B;
  border-radius: 50%;
  margin: 0 30px 0 20px;
  padding: 7px;
  cursor: pointer;
  background-color: #fff;

  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
    padding: 3px;
    margin: 0 10px 0 10px;
  }

  @media (max-width: 425px) {
    margin: 0 0 0 10px;
  }
  &:hover {
    color: #8000FF;
  }
`
