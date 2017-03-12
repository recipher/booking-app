import React from 'react';
import { Link } from 'react-router';
import { Message, Loader } from '@recipher/component';
import Menu from '../../brands/components/menu';
import slugify from '../../../support/slugify';

export default (props) => {
  if (props.brand == null) return <div/>;

  return (
    <div>
      <Menu brand={props.brand.name} />

      <Link to={`/brands/${slugify(props.brand.name)}`}>{props.brand.name}</Link>

      <div>{props.children}</div>
    </div>
  );
};