import styled from "styled-components";

export const ContainerFluid = styled.div`
  padding-left: 0;
  padding-right: 0;
  min-height: 100vh;
  background-color: #F0F4F7;
  .ant-layout-sider{
    background-color:#8000ff;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title{
    border-bottom: 1px solid #fff;
    font-weight:700;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title:hover{
    background-color: #fff;
    color:#8000ff;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-submenu-title >.ant-menu-title-content {
    flex:none;
  }
  .ant-menu-inline.ant-menu-root .ant-menu-item >.ant-menu-title-content{
    flex:none;
  }
  .ant-layout .ant-layout-sider-trigger{
    background-color:#8000ff;
  }
  .ant-menu-light.ant-menu-root.ant-menu-inline{
    background-color:#8000ff;
  }
  .ant-menu-light.ant-menu-root.ant-menu-inline li{
    color:#fff;
  }
  .ant-menu-light.ant-menu-inline .ant-menu-item{
    border-bottom:1px outset #fff;
    border-right:1px outset #fff;
  }
  .ant-menu-item:not(.ant-menu-item-selected):hover:hover{
    background-color: #fff;
    color:#8000ff;
  }
  .ant-menu-inline-collapsed >.ant-menu-submenu>.ant-menu-submenu-title{
    background-color:#8000ff;
    border-bottom:1px solid #fff;
  }
  .ant-layout .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed{
    background-color:#8000ff;
  }
  .ant-menu-submenu-title:hover{
    background-color:#fff;
    color:#8000ff;
  }
  .ant-menu-vertical .ant-menu-submenu{
    color:#fff;
  }
  .ant-menu-light.ant-menu-submenu>.ant-menu{
    background-color:#8000ff !important;
  }
  .ant-menu-inline-collapsed >.ant-menu-submenu>.ant-menu-submenu-title:hover{
    background-color:#fff;
    color:#8000ff;
  }
  .ant-menu-inline-collapsed >.ant-menu-submenu>.ant-menu-light.ant-menu-inline .ant-menu-item{
    background-color:#8000ff;
  }
  .ant-layout .ant-layout-sider-children{
   @media(max-width:767.5px){
    display: none;
   } 
   .ant-layout .ant-layout-sider-has-trigger{
    @media(max-width:767.5px){
      display: none!important;
   }
   .aside{
    @media(max-width:767.5px){
      display: none!important;
   }
   }
   .ant-layout-sider .ant-layout-sider-dark .ant-layout-sider-has-trigger{
    @media(max-width:767.5px){
      display: none!important;
    }
    .ant-menu-submenu-popup{
      background-color:#8000ff;
    }
   }
  }
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
  .responsiveSidebar{
    @media (max-width:767.5px){
      display: none !important;
    }
  }
`