import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Select, Button, Check, Message } from '@recipher/form';
import { Question } from '@recipher/icons';
import validate from '../validate/info';

export const Info = (props) => {
  const { fields, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit} style={{fontSize: '0.9em'}}>
      <Input label='Rider Name' field={fields.name} focus={true} />
      <Input label='Contact Number' field={fields.phone}  />
      <Input label='Date of Birth' field={fields.dob}  />

      <Input label='Rider Height (cm)' field={fields.height}  />
      <Input label='Rider Weight (kg)' field={fields.weight}  />

      <Input label='Emergency Contact Name' field={fields.emergencyName}  />
      <Input label='Emergency Contact Number' field={fields.emergencyPhone}  />

      <Input label='Medical Information' field={fields.medical}  />

      <Check label='I agree to bring my own helmet and understand that I will not be allowed to ride if I do not' field={fields.helmet} />

      <Check label='I confirm that the rider is over the age of 12 on the day of the demo' field={fields.over12} />

      <Check label='I am aware that I must bring photo ID (passport or driving license) AND a matching credit/debit card and that these will be retained as a deposit by the organisers for the duration of the demo' field={fields.photo} />
      <Check label='I have read and understand the terms and conditions of participation, and I accept them. I realise that riding bikes can be dangerous and I am aware of all my responsibilities and liabilities regarding this event, and the bicycles used' field={fields.waiver} />

      <Button label='Continue' onClick={handleSubmit} />
    </Form>
  );
};

export default reduxForm({ 
  form: 'info'
, fields: [ 'name', 'phone', 'dob', 'over12'
          , 'emergencyName', 'emergencyPhone'
          , 'height', 'weight'
          , 'pedals', 'brakes', 'helmet'
          , 'photo', 'medical', 'waiver' ]
, validate 
})(Info);
