import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as form } from 'redux-form';
import { reducer as local } from 'redux-react-local';
import { reducer as menu } from '@recipher/navigation';
import { reducer as io } from '@recipher/io';
import { reducer as session, signOnReducer as signon } from '@recipher/session-web';
import { reducer as signup } from '@recipher/signup-web';
import { reducer as user } from '@recipher/user-web';
import { reducer as contact } from '@recipher/contact-web';
import { reducer as member } from '@recipher/member-web';
import { reducer as members } from '@recipher/members-web';

import entities from '@recipher/entities';
import flash from 'frieze';

import brands from './apps/brands/reducer';
import brand from './apps/brand/reducer';
import product from './apps/product/reducer';
import booking from './apps/booking/reducer';
import bookings from './apps/bookings/reducer';
import cart from './apps/cart/reducer';

export default combineReducers({
  routing: routerReducer
, form: form.plugin({ signon })
, local
, flash
, entities: entities([ 'brands', 'products', 'slots' ])
, menu
, io

, ...session
, ...signup

, user
, member
, members
, contact

, brands
, brand
, product
, booking
, bookings
, cart
});