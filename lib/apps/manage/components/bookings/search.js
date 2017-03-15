import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input } from '@recipher/form';
import { Search, Spinner } from '@recipher/icons';
import { search } from '../../ducks/bookings';

export class Bookings extends Component {
  render() {
    const { fields, bookings: { fetching }, handleSubmit, search, styles = {}, allowFloat = true } = this.props;
    
    const colour = fields.q.active ? '#999' : '#ccc';

    const icon = fetching 
                 ? <Spinner size={18} rotate={true} colour={colour} /> 
                 : <Search size={18} colour={colour} />;

    return (
      <Form onSubmit={handleSubmit(data => search(data))} style={styles.form}>
        <Input label='Search Bookings' field={fields.q} icon={icon} style={styles.field} allowFloat={allowFloat} />
      </Form>
    );
  }
};

export default reduxForm({ 
  form: 'bookings', fields: [ 'q' ] 
}
, state => ({ bookings: state.manage.bookings })
, { search }
)(Bookings);
