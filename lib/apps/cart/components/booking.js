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
      <Cell width='40%'>Bike</Cell>
      <Cell width='15%'>Size</Cell>
      <Cell width='35%'>Slot</Cell>
      <Cell width='10%' align='right'><br/></Cell>
    </Row>
  );
};

export const Booking = State('booking')(({ booking, product, brand, id, last, clear, dispatch, $, state }) => {
  const events = Events({ dispatch, $, id })
      , highlight = state[id] ? '#666' : '#ccc';

  return (
    <Row onMouseOver={events.over} onMouseOut={events.out} last={last}>
      <Cell width='35%'>
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>
        <span style={{color:'#db2828', paddingLeft: 10, fontWeight: 800}}>{booking.error}</span>
      </Cell>
      <Cell width='15%'>{booking.model.name}</Cell>
      <Cell width='35%'>
        {moment(booking.slot.slot).format('ddd MMM Do - h:mma')}
      </Cell>
      <Cell width='10%' align='right'>
        <span onClick={_ => clear(booking)}>remove</span>
      </Cell>
    </Row>
  );
});

const mapStateToProps = (state, props) => {
  return {
    product: productSelector(state, props)
  , brand: brandSelector(state, props)
  };
};

export default connect(mapStateToProps)(Booking);
