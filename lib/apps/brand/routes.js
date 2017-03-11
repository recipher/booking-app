import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Brand, Products } from './handlers';

export default function(Authorize) {
  return (
    <Route path='brands/:brand' component={Brand}>
      <IndexRoute component={Products} />
      <Route path='products' component={Products} />
    </Route>
  );
};
