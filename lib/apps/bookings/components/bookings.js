import React from 'react';
import { Message, Heading } from '@recipher/component';
import { Empty } from '@recipher/table';
import Booking, { Header } from './booking';
import Confirm from './confirm';

export default ({ bookings, member, children, cancel, confirmation, sendConfirmation }) => {
  return (
    <div>
      <Heading>Your Bookings</Heading>

      <Header />

      {bookings.data.length === 0 && !bookings.fetching && <Message message='You have no bookings' />}

      {bookings.data.map((booking, i) => <Booking key={booking.id} booking={booking} cancel={cancel} last={i === bookings.data.length-1} />)}

      <Empty limit={3} length={bookings.data.length} />

      {children}

      {bookings.data.length && <Confirm confirmation={confirmation} onSubmit={_ => sendConfirmation(member)} />}
    </div>
  );
};
