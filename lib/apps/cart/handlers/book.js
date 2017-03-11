import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Book from '../components/book';

const Handler = (props) => {
  return <Book {...props} onSubmit={_ => props.push('/cart/pay')} />;
};

const mapStateToProps = createStructuredSelector({
  bookings: state => state.cart.bookings
, session: state => state.session
});

export default connect(mapStateToProps, { push })(Handler);
