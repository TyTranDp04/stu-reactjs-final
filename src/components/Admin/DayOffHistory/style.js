import styled, { keyframes } from "styled-components";
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
export const DayOffHistoryExportButton = styled.div`
  width: 100%;
`
export const DayOffHistoryExportLoading = styled.div`
  animation: ${rotate} 2s linear infinite;
`
export const DayOffHistoryExportCsv = styled.div`
  display: flex;
  justify-content: center;
`
export const DayOffHistoryWrapperButton = styled.div`
  width: 50%;
  padding: 0 6px;

  @media (max-width: 700px) {
    width: 100%;
    padding: 0;
  }
`

export const DayOffHistoryWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 25px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`

export const DayOffHistoryCol = styled.div`
  background-color: #F0F4F7;

.day-off-history_form {
  margin: auto;
  background-color: #F0F4F7;

  @media (max-width: 500px) {
    padding: 50px 25px 90px;
  }
}

.day-off-history_button a {
  text-decoration: none;
  color: #fff;
}

.day-off-history_title {
  @media (max-width: 555px) {
    font-size: 24px;
  }
  @media (max-width: 405px) {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  width: 75%;
}
`