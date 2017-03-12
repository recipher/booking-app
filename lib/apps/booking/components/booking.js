import assign from 'lodash/object/assign';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Message } from '@recipher/component';
import Menu from '../../brands/components/menu';
import Info from './info';
import slugify from '../../../support/slugify';

export default (props) => {
  const { brand, product, member, booking: { model, slot, info }} = props;

  if (model.name == null) return <Message message='No booking' />;

  const initialValues = assign({}, info, member, { photo: undefined, waiver: undefined, helmet: undefined, over12: undefined });

  return (
    <div>
      <Menu brand={props.brand.name} product={props.product.name} slot={slot} />

      <div>Booking for&nbsp;
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>&nbsp;
        {model.name} at {moment(slot.slot).format('ddd MMM Do, h:mma')}
      </div>

      <Info {...props} onSubmit={props.saveInfo} initialValues={initialValues} />
    </div>
  );
};