import React from 'react';
import { Message, Loader } from '@recipher/component';
import Model from './model';

export default (props) => {
  if (props.models.fetching) return <Loader message='Loading...' />;
  if (props.models.data.length === 0) return <Message type='info' message='No models' />;

  return (
    <div>
      {props.models.data.map(model => <Model key={model.id} model={model} {...props} />)}
    </div>
  );
};