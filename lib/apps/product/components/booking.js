import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import moment from 'moment';
import { memberSelector } from '@recipher/member-web';
import { bookingSelector } from '../ducks/bookings';
import { allBookingCountSelector } from '../../cart/ducks/bookings';

const LIMIT = 2;

export const Booking = Radium((props) => {
  const { slot, select, booking, member } = props;

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

  const own = booking && member && booking.member === member.id
      , limited = props.bookingCount >= LIMIT
      , bookable = !limited && !booking;

  return (
    <div onClick={_ => bookable && select(slot)} style={[ styles.base, (limited || booking) && styles.booked, own && styles.own ]}>
      {moment(slot.slot).format('ddd MMM Do, h:mma')}
    </div>
  );
});

const mapStateToProps = (state, props) => {
  return {
    booking: bookingSelector(state, props)
  , member: memberSelector(state)
  , bookingCount: allBookingCountSelector(state, props)
  };
};

export default connect(mapStateToProps)(Booking);