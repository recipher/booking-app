import assign from 'lodash/object/assign';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { Message, Heading } from '@recipher/component';
import Menu from '../../brands/components/menu';
import Info from './info';
import slugify from '../../../support/slugify';

export default (props) => {
  const { brand, product, member, booking: { model, slot, info }} = props;

  if (model.name == null) return <Message message='No booking' />;

  const names = member && member.name.split(' ')
      , name = { name: names && names[0], surname: names && names.length > 1 && names[1] }
      , checks = { photo: undefined, waiver: undefined, helmet: undefined, over12: undefined }
      , initialValues = assign({}, info, member, name, checks);

  return (
    <div>
      <Menu brand={props.brand.name} product={props.product.name} slot={slot} />

      <Heading>
        Booking for&nbsp;
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>&nbsp;
        {model.name} at {moment(slot.slot).format('ddd MMM Do - h:mma')}
      </Heading>

      <Info {...props} onSubmit={props.saveInfo} initialValues={initialValues} />
    </div>
  );
};