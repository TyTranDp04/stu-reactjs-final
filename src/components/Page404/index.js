import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Body, Btn, Container, Content, H1 } from './style';


const Layout404 = () => {
    return (
        <React.Fragment>
            <Container className='container-fluid'>
                <div style={{padding:"10px"}} className='text-start'>
                    <Link to="/">
                        <Btn>Back To Home</Btn>
                    </Link>
                </div>
                <Body>
                    <div>
                        <Content>404</Content>
                        <H1>Page Not Found</H1>
                    </div>
                </Body>
            </Container>
        </React.Fragment>
    )
}

export default Layout404