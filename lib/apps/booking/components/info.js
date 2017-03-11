import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, TextArea, Message } from '@recipher/form';
import { Question } from '@recipher/icons';
import validate from '../validate/info';

export const Info = (props) => {
  const { fields, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Input label='Name' field={fields.name} focus={true} />
      <TextArea label='Bio' field={fields.bio} minRows={6} />

      <Button label='Save' onClick={handleSubmit} />
    </Form>
  );
};

export default reduxForm({ 
  form: 'info'
, fields: [ 'name', 'bio' ]
, validate })(Info);
