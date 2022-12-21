import React from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, H3 } from './style';


const ShowNodata = (props) => {
  return (
    <Container>
      <FontAwesomeIcon style={{ color: '#8000FF', marginRight: '5px' }} icon={faMagnifyingGlass} />
      <H3>No data found...!</H3>
    </Container>
  );
}

export default ShowNodata;