import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, TextArea, Message } from '@recipher/form';
import validate from '../validate/card';

export const Pay = (props) => {
  const { fields, handleSubmit, bookings: { paying, error }} = props;

  return (
    <Form onSubmit={handleSubmit} name='pay'>
      <Input label='Card Number' field={fields.number} focus={true} />
      <Input label='MM' field={fields.month} />
      <Input label='YYYY' field={fields.year} />
      <Input label='CVC' field={fields.cvc} />

      <Button label={paying ? 'Paying...' : 'Pay'}
              disabled={paying}
              onClick={handleSubmit} name='pay' />
      <Message>{error}</Message>
    </Form>
  );
};

export default reduxForm({ 
  form: 'pay'
, fields: [ 'number', 'month', 'year', 'cvc' ]
, validate
})(Pay);
