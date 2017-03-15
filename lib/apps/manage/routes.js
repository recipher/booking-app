import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Manage, Bookings } from './handlers';

export default function(Authorize) {
  return (
    <Route path='manage' component={Manage}>
      <IndexRoute component={Bookings} />
      <Route path='bookings' component={Bookings} />        
    </Route>
  );
};
