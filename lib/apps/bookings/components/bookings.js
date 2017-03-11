import React from 'react';
import { Message } from '@recipher/component';
import Booking from './booking';

export default (props) => {
  if (props.bookings.data.length === 0) return <Message type='info' message='You have no bookings' />;

  return (
    <div>
      {props.bookings.data.map(booking => <Booking key={booking.id} booking={booking} />)}
    </div>
  );
};
