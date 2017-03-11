import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Product } from './handlers';

export default function(Authorize) {
  return (
    <Route path='brands/:brand/:product' component={Product} />
  );
};
