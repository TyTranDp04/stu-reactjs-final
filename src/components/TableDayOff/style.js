import styled from "styled-components";

export const Main = styled.main`
  margin-top: 50px;
  font-family: 'Barlow', sans-serif;
`
export const ContainerDefault = styled.div`
  margin: auto;
`
export const ContainerRestore = styled.div`
  margin: auto;
`

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  `
export const BoxNav = styled.div`
  justify-content: space-between;
  display: flex;
    flex-wrap: wrap;
`
export const ButtonAddDayOff = styled.button`
  background-color: #8000FF;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  color: #fff;
  margin-left: 10px;
  &:hover{
    opacity: .8;
  }
`
export const ButtonRestoreDayOff = styled.button`
background-color: #00AEEF;
border-radius: 5px;
border: none;
padding: 5px 10px;
color: #fff;
margin-left: 10px;
&:hover{
  opacity: .8;
}
`
export const ButtonSearchDayOff = styled.button`
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #fff;
  &:hover{
  background-color: #8000FF;
    svg{
      path{
        color: #fff;
      }
    }
  }
`

export const AddRequest = styled.div`
border: 1px solid var(--border-btn);
box-shadow: 1px 3px 10px #e9ecef;
font-size: 1em;
padding: .5em 1em;
`
export const Span = styled.span`
font-weight: 600;
display: flex;
align-items: center;
`
export const FormSearch = styled.form`
    display: flex;
    flex-wrap: wrap;
    border: none;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    padding-left: 5px;

`
export const InputSearch = styled.input`
border: none;
outline: none;
`

export const FormData = styled.form`
margin: 2em 0;
`
export const Table = styled.table`
border-spacing: 0px;
width: 100%;

`
export const TableScroll = styled.div`
 overflow: auto;
 height: 60vh;
`
export const Thead = styled.thead`
  position: sticky;
  top: 0;
  background-color: #F0F4F7;
  z-index: 1;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.4);

`
export const Tbody = styled.tbody`

`

export const TextArea = styled.textarea`
  position: relative;
  top: 12px;
  border-radius: 5px;
  outline: none;
  padding: 5px;
  overflow: hidden;
  height: 36px;
  border: 2px solid #8000FF;
  focus: none;
  
`
export const Tr = styled.tr`
  border-bottom: 5px solid #F0F4F7;
  background-color:#fff ;
  
&:hover{
  background-color:#8000FF ;
  color: #fff;
  textarea{
    color: #fff;
  }
}
}
`
export const TrHead = styled.tr`
th{
  font-weight: bold;
}
`
export const ThContent = styled.div`
display: flex;
height: 50px;
align-Items: center;
justify-content: center;
`
export const Th = styled.th`
text-align: center;
font-weight: 400;
border: none;
margin: 0;
`
export const SelectRequest = styled.input`
padding: .75em;
vertical-align: top;
text-align: center;
border-top: 1px solid var(--border);
`
