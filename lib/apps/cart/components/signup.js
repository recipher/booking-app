import React from 'react';
import { reduxForm } from 'redux-form';
import { Email, Question, User } from '@recipher/icons';
import { Form, Input, Button, Message } from '@recipher/form';
import { validate } from '@recipher/signup-web';
import Menu from './menu';

export const Register = (props) => {
  const { fields, signup: { isSigningUp, error }, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} name='signup'>
      <Menu />

      <Input label='Name' field={fields.name} Icon={User} focus={true} />
      <Input label='Email' field={fields.email} Icon={Email} />
      <Input label='Password' type='password' field={fields.password} Icon={Question} />

      <Button label={isSigningUp ? 'Signing Up...' : 'Sign Up'}
              disabled={isSigningUp}
              onClick={handleSubmit} name='signup' />
      <Message>{error}</Message>
    </Form>
  );
};

export default reduxForm({ 
  form: 'cart-signup'
, fields: [ 'email', 'name', 'password' ]
, validate: validate.signup
})(Register);