import React from 'react';
import { reduxForm } from 'redux-form';
import Modal from 'react-modal';
import { local } from 'redux-react-local';
import { Form, Input, TextArea, Select, Button, Check, Message } from '@recipher/form';
import { Question } from '@recipher/icons';
import validate from '../validate/info';
import Content from '../../content/components/content';

const PEDALS = [
  { id: 'yes', description: 'Yes' }, { id: 'no', description: 'No' }
];

const BRAKES = [
  { id: 'left', description: 'Left' }, { id: 'right', description: 'Right' }
];

const Dialog = ({ display, onClosed }) => {
  const styles = {
    content: {
      top: '50%'
    , left: '50%'
    , right: 'auto'
    , bottom: 'auto'
    , maxWidth: '80%'
    , maxHeight: 500
    , overflowY: 'scroll'
    , marginRight: '-50%'
    , transform: 'translate(-50%, -50%)'    
    , padding: '10px 20px 20px 20px'
    , borderRadius: 0
    }
  };

  return (
    <Modal id='waiver' style={styles} isOpen={display} closeTimeoutMS={150} shouldCloseOnOverlayClick={true} onRequestClose={onClosed}>
      <Content page='waiver' />
    </Modal>
  );
};

const Waiver =  local({ ident: 'waiver', initial: false
, reducer(state, { me }) { 
    return me ? !state : state;
  }
})(({ dispatch, $, state }) => {
  const styles = {
    base: {
      color:'inherit'
    , outline:'none'
    , fontWeight: 400
    , textDecoration:'underline'
    , padding: '0 4px'
    }
  };

  const toggle = e => {
    if (e && e.preventDefault) e.preventDefault();
    dispatch($({ type: 'toggle' }));
  };

  return (
    <span>
      I have read and understand the <a style={{textDecoration: 'underline'}} onClick={toggle}>terms and conditions</a> of participation
      and I accept them. 
      I realise that riding bikes can be dangerous and I am aware of all my responsibilities 
      and liabilities regarding this event, and the bicycles used
      <Dialog onClosed={toggle} display={state} />
    </span>
  );
});

export const Info = (props) => {
  const { fields, handleSubmit } = props;

  const waiver = <Waiver />;

  return (
    <Form onSubmit={handleSubmit} style={{fontSize: '0.9em', paddingBottom: 20}}>
      <Input label='Rider First Name' field={fields.name} focus={true} />
      <Input label='Rider Last Name' field={fields.surname} focus={true} />

      <Input label='Mobile Number' field={fields.phone} width={220} />

      <Input label='Date of Birth (DDMMYYYY)' field={fields.dob} width={220} />
      <Check label='I confirm that the rider is over the age of 12 on the day of the demo' field={fields.over12} />

      <Input label='Emergency Contact Name' field={fields.emergencyName}  />
      <Input label='Emergency Contact Number' field={fields.emergencyPhone} width={220}  />

      <Input label='Rider Height (cm)' field={fields.height} width={220} />
      <Input label='Rider Weight (kg)' field={fields.weight} width={220} />

      <Select label='Are you bringing your own pedals?' field={fields.pedals} data={PEDALS} width={360} />
      <Select label='On which side do you run your rear brake?' field={fields.brakes} data={BRAKES} width={360} />
      <Check label='I agree to bring my own helmet and understand that I will not be allowed to ride if I do not' field={fields.helmet} />
      <Check label='I am aware that I must bring photo ID (passport or driving license) AND a matching credit/debit card and that these will be retained as a deposit by the organisers for the duration of the demo' field={fields.photo} />

      <TextArea label='Medical Information' field={fields.medical} rows={4} />

      <Check label={waiver} field={fields.waiver} />

      <Button label='Continue' onClick={handleSubmit} />
    </Form>
  );
};

export default reduxForm({ 
  form: 'info'
, fields: [ 'name', 'surname', 'phone', 'dob', 'over12'
          , 'emergencyName', 'emergencyPhone'
          , 'height', 'weight'
          , 'pedals', 'brakes', 'helmet'
          , 'photo', 'medical', 'waiver' ]
, validate 
})(Info);
