import React from 'react';
import { Message, Heading } from '@recipher/component';
import { Empty } from '@recipher/table';
import Booking, { Header } from './booking';

export default ({ bookings, children }) => {
  return (
    <div>
      <Heading>Your Bookings</Heading>

      <Header />

      {bookings.data.length === 0 && !bookings.fetching && <Message message='You have no bookings' />}

      {bookings.data.map((booking, i) => <Booking key={booking.id} booking={booking} last={i === bookings.data.length-1} />)}

      <Empty limit={3} length={bookings.data.length} />

      {children}
    </div>
  );
};
