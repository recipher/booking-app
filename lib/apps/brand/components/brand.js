import React from 'react';
import { Link } from 'react-router';
import slugify from '../../../support/slugify';

export default (props) => {
  if (props.brand == null) return <div/>;

  return (
    <div>
      <Link to={`/brands/${slugify(props.brand.name)}`}>{props.brand.name}</Link>

      <div>{props.children}</div>
    </div>
  );
};