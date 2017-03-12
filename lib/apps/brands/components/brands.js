import React from 'react';
import { Message, Loader } from '@recipher/component';
import Menu from './menu';
import Brand from './brand';

export default (props) => {
  if (props.brands.fetching) return <Loader message='Fetching brands...' />;
  if (props.brands.data.length === 0) return <Message message='There are no available brands' />;

  return (
    <div>
      <Menu />

      {props.brands.data.map(brand => <Brand key={brand.id} brand={brand} />)}
    </div>
  );
};