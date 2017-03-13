import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Cart, Pay, Book, SignOn, SignUp } from './handlers';

export default function(Authorize) {
  return (
    <Route path='cart' component={Cart}>
      <IndexRoute component={Book} />
      <Route path='book' component={Book} />
      <Route path='pay' component={Authorize()(Pay)} />
      <Route path='signon' component={SignOn} />
      <Route path='signup' component={SignUp} />
    </Route>
  );
};
