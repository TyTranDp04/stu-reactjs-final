import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .Requested{
    background-color: #ffc107;
    box-shadow: 0 0 8px #fde20d, inset 0 0 8px #fde20d;
  }
  .Approved{
    background-color: #31A24C;
    box-shadow: 0 0 8px #0DFC0D, inset 0 0 8px #0DFC0D;
  }
  .Rejected{
    background-color: #ff0000;
    box-shadow: 0 0 8px #f63a3a, inset 0 0 8px #f63a3a;
  }
  .Changed{
    background-color: #8000FF;
    box-shadow: 0 0 8px #f63a3a, inset 0 0 8px #F7941D;
  }
  .Reverted{
    background-color: #00AEEF;
    box-shadow: 0 0 8px #f63a3a, inset 0 0 8px #f63a3a;
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