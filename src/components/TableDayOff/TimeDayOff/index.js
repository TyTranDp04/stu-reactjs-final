import React from 'react';
import { Container, H3 } from './style'
import moment from 'moment/moment';
const TimeDayOff = (props) => {
  const { date } = props;
  return (
    <Container>
      <H3>
        {
          moment.utc(date).format('DD/MM/YYYY')
        }
      </H3>
    </Container>
  );
}

export default TimeDayOff;