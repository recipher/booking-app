import React from 'react';
import { Link } from 'react-router';
import slugify from '../../../support/slugify';

export default (props) => {
  if (props.product == null) return <span/>;

  return (
    <div>
      <Link to={`/brands/${slugify(props.brand.name)}/${slugify(props.product.name)}`}>
        {props.product.name}
      </Link>
    </div>
  );
};