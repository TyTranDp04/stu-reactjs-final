import React from 'react';
import { ContentFooter, Row } from './style';

const Year = new Date().getFullYear();
const Footer = ({ isOpen }) => {

  return (
    <div className='row' style={{ padding: "0px", margin: "0px" }}>
      <Row className='col-2' style={{ padding: "0px", backgroundColor: "#8000ff", width: isOpen ? "16%" : "7%" }}>
      </Row>
      <ContentFooter className='col-10' style={{ padding: "0px", width: isOpen ? "84%" : "93%" }}>
        Copy right by Basic Team @{Year}
      </ContentFooter>
    </div>
  )
}
export default Footer

