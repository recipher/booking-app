import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Message } from '@recipher/component';
import Info from './info';
import slugify from '../../../support/slugify';

export default (props) => {
  const { brand, product, booking: { model, slot, info }} = props;

  if (model.name == null) return <Message type='info' message='No booking' />;

  return (
    <div>
      <div>Booking for&nbsp;
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>&nbsp;
        {model.name} at {moment(slot.slot).format('ddd MMM Do, h:mm:ss a')}
      </div>

      <Info {...props} onSubmit={props.saveInfo} initialValues={info} />
    </div>
  );
};