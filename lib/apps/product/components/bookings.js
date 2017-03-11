import React from 'react';
import Booking from './booking';

export default (props) => {
  return (
    <div>
      {props.slots.data.map(slot => 
        <Booking key={slot.id} model={props.model} slot={slot} bookings={props.bookings} select={props.select}/>)}
    </div>
  );
};