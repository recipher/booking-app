import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Message } from '@recipher/component';
import { Link } from 'react-router';
import { Email, Spinner } from '@recipher/icons';
import { Row, Cell, State, Events } from '@recipher/table';
import { productSelector, brandSelector } from '../ducks/bookings';
import slugify from '../../../support/slugify';

export const Header = _ => {
  return (
    <Row kind='heading'>
      <Cell width='25%'>Bike</Cell>
      <Cell width='15%'>Size</Cell>
      <Cell width='15%'>Rider</Cell>
      <Cell width='35%'>Slot</Cell>
      <Cell width='10%' align='right'><br/></Cell>
    </Row>
  );
};

export default State('booking')(({ booking, id, last, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id })
      , highlight = state[id] ? '#666' : '#ccc';

  const { brand, product, model } = booking.data;

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} last={last}>
      <Cell width='25%'>
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>
      </Cell>
      <Cell width='15%'>{model.name}</Cell>
      <Cell width='15%'>{booking.info.name}</Cell>
      <Cell width='35%'>
        {moment(booking.slot).format('ddd MMM Do, h:mma')}
      </Cell>
      <Cell width='10%' align='right'>cancel</Cell>
    </Row>
  );
});
