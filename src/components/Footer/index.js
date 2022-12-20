import React from 'react'

const Year = new Date().getFullYear();
const Footer = () =>{

    return (
        <p className='text-light text-center text-muted'>Copy right by Basic Team @{Year}</p>
    )

}
export default Footer 

