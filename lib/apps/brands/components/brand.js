import React from 'react';
import { Link } from 'react-router';
import slugify from '../../../support/slugify';

export default (props) => {
  return (
    <div>
      <Link to={`/brands/${slugify(props.brand.name)}`}>{props.brand.name}</Link>
    </div>
  );
};