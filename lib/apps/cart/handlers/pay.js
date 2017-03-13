import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { book, priceSelector, feeSelector, chargeSelector } from '../ducks/bookings';
import Pay, { NoPay } from '../components/pay';

const Handler = (props) => {
  return props.charge === 0 
  ? <NoPay {...props} onSubmit={props.book} />
  : <Pay {...props} onSubmit={props.book} />;
};

const mapStateToProps = createStructuredSelector({
  session: state => state.session
, bookings: state => state.cart.bookings
, price: priceSelector
, fee: feeSelector
, charge: chargeSelector
});

export default connect(mapStateToProps, { book })(Handler);
