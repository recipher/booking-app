import React from 'react';
import { Message } from '@recipher/component';
import Product from './product';

export default (props) => {
  if (props.products.data.length === 0) return <Message type='info' message='No products' />;

  return (
    <div>
      {props.products.data.map(product => <Product key={product.id} product={product} brand={props.brand} />)}
    </div>
  );
};