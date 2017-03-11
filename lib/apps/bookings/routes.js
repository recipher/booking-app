import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Bookings } from './handlers';

export default function(Authorize) {
  return (
    <Route path='bookings' component={Bookings} />
  );
};
