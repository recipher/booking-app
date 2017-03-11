import React from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, TextArea, Message } from '@recipher/form';

export const Book = (props) => {
  const { fields, handleSubmit } = props;

  const allowCheckout = props.bookings.data.length > 0;

  return (
    <Form onSubmit={handleSubmit} disabled={!allowCheckout} style={{clear:'both'}}>
      <Button label='Checkout' onClick={handleSubmit} disabled={!allowCheckout} />
      <Link to='/brands'> or continue shopping</Link>
    </Form>
  );
};

export default reduxForm({ form: 'book', fields: [ ]})(Book);
