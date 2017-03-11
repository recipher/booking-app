import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Message } from '@recipher/component';
import { Link } from 'react-router';
import { productSelector, brandSelector } from '../ducks/bookings';
import slugify from '../../../support/slugify';

export const Booking = (props) => {
  const { brand, product, booking: { model, slot, info }} = props;

  if (model.name == null) return <Message message='No booking' />;

  return (
    <div>
      <div>
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>&nbsp;
        {model.name} at {moment(slot.slot).format('ddd MMM Do, h:mm:ss a')}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    product: productSelector(state, props)
  , brand: brandSelector(state, props)
  };
};

export default connect(mapStateToProps)(Booking);
