import styled from "styled-components";

export const SidebarCol = styled.div`
  text-align: left;
  padding-left: 40px;
  background-color: #00aeef;
  @media (max-width: 800px) {
    padding: 0 0 0 35px;
  }
  @media (max-width: 680px) {
    padding: 0 0 0 30px;
  }
  @media (max-width: 576px) {
    padding-left: 25px;
    width: 25%;
  }
  @media (max-width: 425px) {
    padding-left: 18px;
  }
`
export const SidebarInner = styled.div`
  margin-bottom: 30px;
`
export const SidebarCategory = styled.h4`
  font-size: 18px;
  color: #111111;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    color: rgb(247,148,29);
  }
  a {
    color: #111111;
    text-decoration: none;
    &:hover {
      color: rgb(247,148,29);
    }
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (max-width: 576px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`
export const SidebarDesc = styled.div`

  a {
    color: #fff;
    text-decoration: none;
    border-bottom: 2px solid #97AEB0;

    &:hover {
      font-weight: bold;
    }
  }
  @media (max-width: 576px) {
    font-size: 13px;
  }
  @media (max-width: 425px) {
    font-size: 10px;
  }
`