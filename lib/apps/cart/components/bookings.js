import React from 'react';
import { Link } from 'react-router';
import { Message } from '@recipher/component';
import Booking from './booking';

export default (props) => {
  if (props.bookings.data.length === 0) return <Message type='info' message='Your cart is empty' />;

  return (
    <div>
      {props.bookings.data.map(booking => <Booking key={`${booking.model.id}${booking.slot.id}`} booking={booking} />)}
    
      {props.children}
    </div>
  );
};
