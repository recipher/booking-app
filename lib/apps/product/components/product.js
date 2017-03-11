import React from 'react';
import { Link } from 'react-router';
import Models from './models';
import slugify from '../../../support/slugify';

export default (props) => {
  if (props.product == null) return <div/>;

  return (
    <div>
      <Link to={`/brands/${slugify(props.brand.name)}`}>{props.brand.name}</Link>&nbsp;
      <Link to={`/brands/${slugify(props.brand.name)}/${slugify(props.product.name)}`}>
        {props.product.name}
      </Link>

      <Models {...props} />
    </div>
  );
};