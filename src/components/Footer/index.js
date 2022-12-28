import React from 'react';
import { ContentFooter, Row } from './style';

const Year = new Date().getFullYear();
const Footer = ({ isOpen }) => {

  return (
 
      <ContentFooter className='col-12' style={{height:"50px"}} >
        Copy right by Basic Team @{Year}
      </ContentFooter>
  
  )
}
export default Footer

