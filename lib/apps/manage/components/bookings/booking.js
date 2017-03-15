import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import { connect } from 'react-redux';
import { Email, Spinner } from '@recipher/icons';
import { Row, Cell, State, Events } from '@recipher/table';
import { DateTime } from '../../../../components';

export const Header = _ => {
  return (
    <Row kind='heading'>
      <Cell width='45%'>Bike</Cell>
      <Cell width='10%'>Size</Cell>
      <Cell width='20%'>Slot</Cell>
      <Cell width='25%'>Member</Cell>
    </Row>
  );
};

export default State('booking')(({ booking, last, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id: booking.id })
      , highlight = state[booking.id] ? '#666' : '#ccc';

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} last={last}>
      <Cell width='45%'>
        <strong>{booking.description}</strong>
      </Cell>
      <Cell width='10%'>
        <span style={{fontSize:'0.9em'}}>{booking.data.model.name}</span>
      </Cell>
      <Cell width='20%'><DateTime dt={booking.data.slot} format='ddd h:mma' /></Cell>
      <Cell width='25%'>{booking.data.member.name}</Cell>
    </Row>
  );
});
