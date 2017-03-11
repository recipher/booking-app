import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import slugify from '../../../support/slugify';

export default (props) => {
  const { booking: { data: { brand, product, model }, slot }} = props;

  return (
    <div>
      <div>
        <Link to={`/brands/${slugify(brand.name)}`}>{brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(brand.name)}/${slugify(product.name)}`}>{product.name}</Link>&nbsp;
        {model.name} at {moment(slot).format('ddd MMM Do, h:mm:ss a')}
      </div>
    </div>
  );
};
