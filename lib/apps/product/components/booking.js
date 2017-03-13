import React from 'react';
import find from 'lodash/collection/find';
import { connect } from 'react-redux';
import Radium from 'radium';
import { memberSelector } from '@recipher/member-web';
import { DateTime } from '../../../components';
import { bookingSelector } from '../ducks/bookings';
import { allBookingCountSelector } from '../../cart/ducks/bookings';

const LIMIT = 2;

const Index = ({ index }) => {
  const styles = {
    base: {
      display: 'inline-block'
    , backgroundColor: '#eee'
    , borderRadius: '50%'
    , padding: 3
    , textAlign: 'center'
    , width: 24
    , height: 24
    , marginRight: 10
    }
  };

  return <span style={styles.base}>{index}</span>;
};

export const Booking = Radium((props) => {
  const { slot, select, booking, member, cart } = props;

  const styles = {
    base: {
      display: 'inline-block'
    , color: '#666'
    , padding: 10
    , fontSize: '0.9em'
    , margin: '0 20px 10px -10px'
    , cursor: 'pointer'
    , borderRadius: 4
    , transition: 'all 0.15s ease-in-out'
    , ':hover': {
        color: '#666'
      , boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }
    }
  , booked: {
      cursor: 'default'
    , color: '#eee'
    , ':hover': {
        boxShadow: 'none'
      , color: '#eee'
      }
    }
  , own: {
      cursor: 'default'
    , color: '#eee'
    , boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    , ':hover': {
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      , color: '#eee'
      }
    }
  };

  const inCart = find(cart.data, b => b.slot.index === slot.index)
      , own = (booking && member && booking.member === member.id) || inCart
      , limited = props.bookingCount >= LIMIT
      , bookable = !limited && !booking && !inCart;

  return (
    <div onClick={_ => bookable && select(slot)} style={[ styles.base, (limited || booking) && styles.booked, own && styles.own ]}>
      <Index index={slot.index} />
      <DateTime dt={slot.slot} />
    </div>
  );
});

const mapStateToProps = (state, props) => {
  return {
    cart: state.cart.bookings
  , booking: bookingSelector(state, props)
  , member: memberSelector(state)
  , bookingCount: allBookingCountSelector(state, props)
  };
};

export default connect(mapStateToProps)(Booking);