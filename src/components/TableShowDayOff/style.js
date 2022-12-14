import styled from "styled-components";

export const Main = styled.main`
  margin-top: 50px;
  font-family: 'Barlow', sans-serif;
  padding: 0 10px;
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
  @media (min-width : 951px) and (max-width: 1250px){
    flex-direction: column;
  }
  @media  (max-width: 445px){
    flex-direction: column;
  }
 
  `
export const BoxNav = styled.div`
justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  @media (min-width : 950px) and (max-width: 1250px) {
    margin-bottom : 30px;  
  }
  @media  (max-width: 951px){
    flex-direction: column;
  }
`
export const ContentSearch = styled.div`
display: flex;

@media (min-width:445px) and (max-width: 522px){
  flex-direction: column;
  margin-bottom : 15px;
}
@media (min-width : 340px) and (max-width: 445px){
  flex-direction: row;
}
@media  (max-width: 340px){
  flex-direction: column;
}
`
export const TittleSearch = styled.h3`
margin: 0px 10px 0px 0px;
text-align: center;
padding-top: 5px;
font-size: 18px;
@media (max-width: 522px){
  margin-bottom : 10px;
  text-align : left;
  font-size: 18px;
  width: 100%;
}
`
export const FormSearch = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    padding-left: 5px;
    border: 2px solid #8000FF;
    height: 40px;
    .react-datepicker-wrapper{
      #SearchDate{
        border: none;
        padding-left:8px;
        outline: none;
        width: 125px;
      }
    }
    .react-datepicker-popper{
      z-index: 10000;
    }
    @media (max-width:340px){
    
    }
  
    
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
  @media  (max-width: 951px){
    margin-bottom : 10px;
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
  top: -2px;
  background-color: #8000ff;
  z-index: 1;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.4);
  color: #fff;
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
border: 5px solid #ccc;
border-width: 1px;
cursor: pointer;
&:hover{
  background-color:#9933FF ;
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
  border-width: 1px;
text-align: center;
font-weight: 400;
margin: 0;
`
export const SelectRequest = styled.input`
padding: .75em;
vertical-align: top;
text-align: center;
border-top: 1px solid var(--border);
`
