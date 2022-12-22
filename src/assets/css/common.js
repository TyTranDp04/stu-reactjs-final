import styled from "styled-components";

export const ContainerFluid = styled.div`
  padding-left: 0;
  padding-right: 0;
  min-height: 100vh;
`
export const Container = styled.div`
  min-height: 80vh;
  padding:0px;
  border-radius: 10px;
  @media (min-width: 1400px) {
    max-width: 100%;
  }
  @media (min-width: 400px) {
    max-width: 100%;
  }
`