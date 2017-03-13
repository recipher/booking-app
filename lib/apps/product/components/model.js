import React from 'react';
import { connect } from 'react-redux';
import { Rule } from '@recipher/component';
import { bookingsSelector } from '../ducks/bookings';
import Bookings from './bookings';

const Title = ({ name }) => {
  const styles = {
    base: {
      fontSize: '1.1em'
    }
  };

  return <div style={styles.base}>{name}</div>;
};

export const Model = (props) => {
  return (
    <div>
      <Rule color='#eee' />

      <Title name={props.model.name} />

      <Bookings {...props} select={slot => props.select(props.model, slot)}/>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    bookings: bookingsSelector(state, props)
  }
};

export default connect(mapStateToProps)(Model);