import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { replace } from 'react-router-redux';
import { Authenticate } from '@recipher/support';

import { Main, NotFound, Denied, Error } from './handlers';
import { SignUp } from '@recipher/signup-web';

import { routes as members } from '@recipher/members-web';
// import { routes as session } from '@recipher/session-web';
import { routes as member } from '@recipher/member-web';
// import { routes as contact } from '@recipher/contact-web';
import { routes as user } from '@recipher/user-web';
// import { routes as signup } from '@recipher/signup-web';

import session from './apps/session/routes';
import signup from './apps/signup/routes';
import contact from './apps/contact/routes';
import content from './apps/content/routes';
import brands from './apps/brands/routes';
import brand from './apps/brand/routes';
import product from './apps/product/routes';
import booking from './apps/booking/routes';
import bookings from './apps/bookings/routes';
import cart from './apps/cart/routes';

import Brands from './apps/brands/handlers/brands';

const IsAuthenticated = Authenticate({
  sessionSelector: state => state.session.user
, redirectAction: replace
, signOnPath: '/cart/signon'
});

export default function(store) {
  return (
    <Route path='/' component={Main}>
      <IndexRoute component={Brands}/>
      
      {session}
      {signup}
      {contact}
      
      {user(IsAuthenticated)}
      {member(IsAuthenticated)}
      {members(IsAuthenticated)}
      {content(IsAuthenticated)}
      {brands(IsAuthenticated)}
      {brand(IsAuthenticated)}
      {product(IsAuthenticated)}
      {booking(IsAuthenticated)}
      {bookings(IsAuthenticated)}
      {cart(IsAuthenticated)}

      <Route path='error' component={Error}/>
      <Route path='denied' component={Denied}/>
      <Route path='*' component={NotFound}/>
    </Route>
  );
};
