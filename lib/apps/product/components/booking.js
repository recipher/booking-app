import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import moment from 'moment';
import { memberSelector } from '@recipher/member-web';
import { bookingSelector } from '../ducks/bookings';

export const Booking = Radium((props) => {
  const { slot, select, booking, member } = props;

  const styles = {
    base: {
      display: 'inline-block'
    , color: '#666'
    , padding: 10
    , margin: '0 20px 10px -10px'
    , cursor: 'pointer'
    , borderRadius: 4
    , transition: 'all 0.15s ease-in-out'
    , ':hover': {
        color: '#333'
      , boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
      }
    }
  , booked: {
      cursor: 'default'
    , color: '#eee'
    }
  , owned: {
      cursor: 'default'
    , color: '#999'
    }
  };

  const owned = booking && member && booking.member === member.id;

  return (
    <div onClick={_ => select(slot)} style={[ styles.base, booking && styles.booked, owned && styles.owned ]}>
      {moment(slot.slot).format('ddd MMM Do, h:mma')}
    </div>
  );
});

const mapStateToProps = (state, props) => {
  return {
    booking: bookingSelector(state, props)
  , member: memberSelector(state)
  };
};

export default connect(mapStateToProps)(Booking);