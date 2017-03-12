import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { clear } from '../ducks/bookings';
import Bookings from '../components/bookings';

const mapStateToProps = createStructuredSelector({
  bookings: state => state.cart.bookings
, session: state => state.session
});

export default connect(mapStateToProps, { clear })(Bookings);
