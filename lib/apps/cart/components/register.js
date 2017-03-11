import React from 'react';
import { reduxForm } from 'redux-form';
import { Email, Question, User } from '@recipher/icons';
import { Form, Input, Button, Message } from '@recipher/form';
import { validate } from '@recipher/signup-web';
import Navigate from './navigate';

export const Register = (props) => {
  const { fields, signup: { isSigningUp, error }, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} name='register'>
      <Navigate />

      <Input label='Name' field={fields.name} Icon={User} focus={true} />
      <Input label='Email' field={fields.email} Icon={Email} />
      <Input label='Password' type='password' field={fields.password} Icon={Question} />

      <Button label={isSigningUp ? 'Registering...' : 'Register'}
              disabled={isSigningUp}
              onClick={handleSubmit} name='register' />
      <Message>{error}</Message>
    </Form>
  );
};

export default reduxForm({ 
  form: 'cart-register'
, fields: [ 'email', 'name', 'password' ]
, validate: validate.signup
})(Register);