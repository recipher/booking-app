import React from 'react';
import { connect } from 'react-redux';
import { productSelector, brandSelector, saveInfo } from '../ducks/booking';
import Booking from '../components/booking';

const mapStateToProps = state => {
  return {
    booking: state.booking.booking
  , session: state.session
  , product: productSelector(state)
  , brand: brandSelector(state)
  };
};

export default connect(mapStateToProps, { saveInfo })(Booking);
