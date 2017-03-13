import React from 'react';
import { reduxForm } from 'redux-form';
import { Heading } from '@recipher/component';
import { Form, Input, Select, Button, TextArea, Message } from '@recipher/form';
import validate from '../validate/card';

export const NoPay = reduxForm({ form: 'no-pay', fields: [] })((props) => {
  const { handleSubmit, bookings: { data, paying, error }} = props;

  if (data.length === 0) return <div/>;

  return (
    <Form onSubmit={handleSubmit} name='no-pay'>
      <Button label={paying ? 'Booking...' : 'Book Now'}
              disabled={paying}
              onClick={handleSubmit} name='no-pay' />
      <span>There is no charge</span>
      <Message>{error}</Message>
    </Form>
  );
});

export const Pay = (props) => {
  const { fields, handleSubmit, price, fee, bookings: { data, paying, error }} = props;

  if (data.length === 0) return <div/>;

  return (
    <Form onSubmit={handleSubmit} name='pay'>
      <Heading style={{paddingTop: 15, paddingBottom: 0}}>Enter Payment Information</Heading>

      <p>The total charge is <strong>£{price.toFixed(2)}</strong> plus booking fee of £{fee.toFixed(2)}</p>

      <Input label='Card Number' field={fields.number} width={360} focus={true} />
      
      <Input label='MM' field={fields.month} width={120} />
      <Input label='YYYY' field={fields.year }width={120} />
      <Input label='CVC' field={fields.cvc} width={120} />

      <Button label={paying ? 'Booking...' : 'Book Now'}
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


