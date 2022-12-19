import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .Requested{
    background-color: #F7EA44;
    box-shadow: 0 0 8px #fde20d, inset 0 0 8px #fde20d;
  }
  .Approved{
    background-color: #7EC55F;
    box-shadow: 0 0 8px #0DFC0D, inset 0 0 8px #0DFC0D;
  }
  .Rejected{
    background-color: #ff0000;
    box-shadow: 0 0 8px #ff0000, inset 0 0 8px #ff0000;
  }
  .change{
    background-color: #85CBA6;
    box-shadow: 0 0 8px #24F9B9, inset 0 0 8px #24F9B9;
  }
  .Reverted{
    background-color: #C66DAD;
    box-shadow: 0 0 8px #FF52FC, inset 0 0 8px #FF52FC;
  }
  `
  export const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 6px;
`
export const DotContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`
export const H3 = styled.h3`
  margin: 0 0 0 5px;
  font-size: 16px;
  font-weight: normal;`

  export const H4 = styled.h4`
  margin: 12px 0 0 5px;
  font-size: 12px;
  font-weight: normal;`