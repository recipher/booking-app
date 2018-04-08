import _ from 'lodash';
import React from 'react';
import { Message, Loader } from '@recipher/component';
import Menu from './menu';
import Warn from './warn';
import Brand from './brand';

export default (props) => {
  const { brands } = props;

  const sorted = _.sortBy(brands.data, 'name');

  return (
    <div>

      <Menu />
      <Warn />

      {brands.fetching && <Loader message='Fetching brands...' />}
      {!brands.fetching && brands.data.length === 0 && <Message message='There are no available brands' />}

      {sorted.map(brand => <Brand key={brand.id} brand={brand} />)}
    </div>
  );
};