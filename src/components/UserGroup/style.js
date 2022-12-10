import styled from "styled-components";

export const Container = styled.div`
  padding-top: 30px;
`
export const User = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  &:hover{
    h4{
      display: block;

    }
  }
`
export const Group = styled.div`

`
export const GroupDetail = styled.div`
  
`
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`
export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
`

export const H3 = styled.h3``


export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin: 5px;
  object-fit: cover;
  border-radius: 25px;
  
`
export const H4 = styled.h4`
  display: none;
  font-size: 14px;
  position: absolute;
  z-index: 10;
  top: 70%;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  padding:: 5px;
`
export const Header = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 20px;

`

export const TdContent = styled.div`
  max-width: 350px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
`
 export const BtnAddGroup = styled.button`
 border-radius: 5px;
 border: none;
 background-color: #00AEEF;
 height: 40px;
 color: #FFFFFF;
 font-weight: bold;
 `
 export const Thead = styled.thead`
 `

export const Tr = styled.tr`
&:hover{
  cursor: pointer;
}
`
export const Th = styled.th``
export const Td  = styled.td`
  height: 100px;
`
export const Tbody = styled.tbody`
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 50px 0 0 20px;
`
export const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`
export const NameTitle = styled.div`
  height: 35px;
  border: 2px solid #ccc;
  width: 10%;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
`
export const Master = styled.div`
display: flex;

justify-content: start;

`

export const MemberContainer = styled.div`
border: 2px solid #ccc;
border-radius: 5px;
margin: 5px 0;
width: 50%;
height: 150px;
display: flex;
`
export const MemberInfo = styled.div`
margin: 3px 5px 0 5px;
background-color: #788896;
width: auto;
height: 30px;
border-radius: 15px;
display: flex;
align-items: center;
justify-content: center;

`
export const BtnDelete = styled.div`
margin-left: 5px;
display: flex;
align-items: center;
border-radius: 4px;
&:hover{
  cursor: pointer;
  svg{
    opacity: .7;
  }
}
`
export const Icon = styled.img`
width: 26px;
height: 26px;
object-fit: cover;
margin: 0 2.2px;
border-radius: 13px;
`
export const Members = styled.div`
display: flex;
justify-content: start;

`

export const NameTextInfo = styled.h5`
  font-size: 16px;
  margin: 0 0 0 3px;
`
export const NameText = styled.span`
 width : 100px;
 text-align : start;
 font-size : 20px;
 font-weight : bold;
  width: 150px;
`
export const BtnDeleteGroup = styled.button`
  border: none;
  border-radius : 5px;
  background-color : #ED5E68;
  height : 40px;
  color: #fff;
  width: 70px;
`
