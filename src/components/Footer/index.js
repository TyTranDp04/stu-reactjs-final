import React from 'react'
import { ContentFooter, Row } from './style';

const Year = new Date().getFullYear();
const Footer = ({isOpen}) => {

    return (
        <div className='row' style={{padding:"0px"}}>
            <Row className='col-2' style={{padding:"0px",backgroundColor:"#8000ff",width: isOpen ? "17%" : "8%" }}>
            </Row>
            <ContentFooter className='col-10' style={{padding:"0px", width: isOpen ? "83%" : "92%"}}>
                Copy right by Basic Team @{Year}
            </ContentFooter>
        </div>
    )
}
export default Footer

