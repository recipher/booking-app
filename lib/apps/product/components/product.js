import React from 'react';
import { Link } from 'react-router';
import { Heading } from '@recipher/component';
import Menu from '../../brands/components/menu';
import Warn from '../../brands/components/warn';
import Models from './models';
import slugify from '../../../support/slugify';

export default (props) => {
  if (props.product == null) return <div/>;

  return (
    <div>
      <Menu brand={props.brand.name} product={props.product.name} />
      <Warn />

      <Heading>
        <Link to={`/brands/${slugify(props.brand.name)}`}>{props.brand.name}</Link>&nbsp;
        <Link to={`/brands/${slugify(props.brand.name)}/${slugify(props.product.name)}`}>
          {props.product.name}
        </Link>
      </Heading>

      <Models {...props} />
    </div>
  );
};