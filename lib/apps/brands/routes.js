import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { Brands } from './handlers';

export default function(Authorize) {
  return (
    <Route path='brands' component={Brands}/>
  );
};
