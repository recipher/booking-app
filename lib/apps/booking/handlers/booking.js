import React from 'react';
import { connect } from 'react-redux';
import { memberSelector } from '@recipher/member-web';
import { productSelector, brandSelector, saveInfo } from '../ducks/booking';
import Booking from '../components/booking';

const mapStateToProps = state => {
  return {
    booking: state.booking.booking
  , session: state.session
  , product: productSelector(state)
  , brand: brandSelector(state)
  , member: memberSelector(state)
  };
};

export default connect(mapStateToProps, { saveInfo })(Booking);
