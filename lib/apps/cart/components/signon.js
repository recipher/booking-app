import React from 'react';
import { reduxForm } from 'redux-form';
import { Email, Question, Err } from '@recipher/icons';
import { Form, Input, Button, Message } from '@recipher/form';
import { validate } from '@recipher/session-web';
import Menu from './menu';

export const SignOn = (props) => {
  const { fields, session: { isSigningOn, error }, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} name='signon'>
      <Menu />

      <Input label='Email' field={fields.email} Icon={Email} focus={true} />
      <Input label='Password' type='password' field={fields.password} Icon={Question} />

      <Button label={isSigningOn ? 'Signing On...' : 'Sign On'}
              disabled={isSigningOn}
              onClick={handleSubmit} name='signon' />
      <Message>{error}</Message>
    </Form>
  );
};

export default reduxForm({ 
  form: 'cart-signon'
, fields: [ 'email', 'password' ]
, validate: validate.signon
})(SignOn);