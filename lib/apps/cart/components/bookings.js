import React from 'react';
import { Message } from '@recipher/component';
import { Empty } from '@recipher/table';
import Booking, { Header } from './booking';

export default ({ bookings, children }) => {
  return (
    <div>
      <Header />

      {bookings.data.length === 0 && !bookings.fetching && <Message message='Your cart is empty' />}

      {bookings.data.map((booking, i) => <Booking key={`${booking.model.id}${booking.slot.id}`} id={`${booking.model.id}${booking.slot.id}`} booking={booking} last={i === bookings.data.length-1} />)}

      <Empty limit={3} length={bookings.data.length} />

      {children}
    </div>
  );
};
