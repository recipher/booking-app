import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Button } from '@recipher/form';

export const Confirm = (props) => {
  const { fields, handleSubmit, confirmation: { sending }} = props;

  return (
    <Form onSubmit={handleSubmit} disabled={sending} style={{clear:'both'}}>
      <Button label={sending ? 'Sending...' : 'Resend Confirmation'} onClick={handleSubmit} disabled={sending} />
    </Form>
  );
};

export default reduxForm({ form: 'confirmation', fields: [ ]})(Confirm);
