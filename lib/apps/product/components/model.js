import React from 'react';
import { connect } from 'react-redux';
import { bookingsSelector } from '../ducks/bookings';
import Bookings from './bookings';

export const Model = (props) => {
  return (
    <div>
      <span>{props.model.name}</span>

      <Bookings {...props} select={slot => props.select(props.model, slot)}/>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    bookings: bookingsSelector(state, props)
  }
};

export default connect(mapStateToProps)(Model);