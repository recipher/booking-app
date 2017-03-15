import React from 'react';
import { Message } from '@recipher/component';
import { Paging, Empty } from '@recipher/table';
import Booking, { Header } from './booking';
import Title from './title';

export default ({ bookings, ...rest }) => {
  return (
    <div>
      <Title meta={bookings.meta} {...rest} />
      <Header />

      {bookings.data.length === 0 && !bookings.fetching && <Message message='No bookings found' />}

      {bookings.data.map((booking, i) => <Booking key={booking.id} booking={booking} {...rest} last={i === bookings.data.length-1} />)}

      <Empty limit={bookings.meta.query.limit} length={bookings.data.length} />

      {bookings.data.length > 0 && <Paging meta={bookings.meta} fetching={bookings.fetching} {...rest} entity='booking' />}
    </div>
  );
};
