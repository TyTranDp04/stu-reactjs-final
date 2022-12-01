import styled from "styled-components";

export const LayoutRow = styled.div`
  min-height: 78vh;

  @media(max-width: 992px) {
    min-height: 80vh;
  }
  @media(max-width: 767px) {
    min-height: 82vh;
  }
  @media(max-width: 425px) {
    min-height: 86vh;
  }
`