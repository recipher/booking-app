import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Booking } from './handlers';

export default function(Authorize) {
  return (
    <Route path='booking' component={Booking} />
  );
};
