import React from 'react'

const Year = new Date().getFullYear();
const Footer = () =>{

    return (

        <Footer>
            <p className='text-light text-center text-muted'>Copy right by Basic Team @{Year}</p>
        </Footer>
    )

}
export default Footer 

