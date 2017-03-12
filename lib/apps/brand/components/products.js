import React from 'react';
import { Message, Loader } from '@recipher/component';
import Product from './product';

export default (props) => {
  if (props.products.fetching) return <Loader message='Fetching bikes...' />;
  if (props.products.data.length === 0) return <Message message='No bikes' />;

  return (
    <div>
      {props.products.data.map(product => <Product key={product.id} product={product} brand={props.brand} />)}
    </div>
  );
};