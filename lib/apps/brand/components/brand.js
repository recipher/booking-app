import React from 'react';
import { Link } from 'react-router';
import { Message, Loader, Heading } from '@recipher/component';
import Menu from '../../brands/components/menu';
import Warn from '../../brands/components/warn';
import slugify from '../../../support/slugify';

export default (props) => {
  if (props.brand == null) return <div/>;

  return (
    <div>
      <Menu brand={props.brand.name} />
      <Warn />

      <Heading>
        <Link to={`/brands/${slugify(props.brand.name)}`}>{props.brand.name}</Link>
      </Heading>

      <div>{props.children}</div>
    </div>
  );
};