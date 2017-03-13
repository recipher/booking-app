import React from 'react';
import { Message, Loader } from '@recipher/component';
import Menu from './menu';
import Brand from './brand';

export default (props) => {
  return (
    <div>
      <Menu />

      {props.brands.fetching && <Loader message='Fetching brands...' />}
      {!props.brands.fetching && props.brands.data.length === 0 && <Message message='There are no available brands' />}

      {props.brands.data.map(brand => <Brand key={brand.id} brand={brand} />)}
    </div>
  );
};