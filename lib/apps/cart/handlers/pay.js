import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { book } from '../ducks/bookings';
import Pay from '../components/pay';

const Handler = (props) => {
  return <Pay {...props} onSubmit={props.book} />;
};

const mapStateToProps = createStructuredSelector({
  session: state => state.session
, bookings: state => state.cart.bookings
});

export default connect(mapStateToProps, { book })(Handler);
