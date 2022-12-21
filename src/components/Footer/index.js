import React from 'react'
import {P } from './style';

const Year = new Date().getFullYear();
const Footer = () =>{

    return (
        <div style={{backgroundColor:"#8000ff"}}>
            <P className='text-center'>Copy right by Basic Team @{Year}</P>
        </div>
    )

}
export default Footer 

