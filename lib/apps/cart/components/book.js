import React from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, TextArea, Message } from '@recipher/form';

export const Book = (props) => {
  const { fields, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Button label='Checkout' onClick={handleSubmit} />
      <Link to='/brands'>Continue Shopping</Link>
    </Form>
  );
};

export default reduxForm({ form: 'book', fields: [ ]})(Book);
