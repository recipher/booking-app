import React from 'react';
import { Message } from '@recipher/component';
import Brand from './brand';

export default (props) => {
  if (props.brands.data.length === 0) return <Message type='info' message='There are no available brands' />;

  return (
    <div>
      {props.brands.data.map(brand => <Brand key={brand.id} brand={brand} />)}
    </div>
  );
};